const { validationResult } = require("express-validator");
const Sweet = require("../model/sweet");
const cron = require("node-cron");
const {
  deleteFile,
  calculateSweetPrices,
  getContentType,
} = require("../util/functions");
const path = require("path");
const fs = require("fs");

// Running a cron schedule every day at midnight to control what sweets have finished their life cycle
cron.schedule("0 0 * * *", async () => {
  try {
    // Get all sweets older than 4 days
    const date = new Date();
    date.setDate(date.getDate() - 4);
    const sweetsToDelete = await Sweet.find({ createdAt: { $lt: date } });

    // Delete the matching sweets
    for (const sweet of sweetsToDelete) {
      await sweet.remove();
    }

    console.log(`Deleted ${sweetsToDelete.length} sweets`);
  } catch (err) {
    console.error(err);
  }
});

// GET => Getting all sweets and calculate the discount of them all
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({ price: -1 });

    const sweetPricesFiltered = calculateSweetPrices(sweets);
    res.status(200).send(sweetPricesFiltered);
  } catch (err) {
    res.status(404).json({ message: "sweets was not found" });
  }
};
// POST => Adding a Sweet
exports.addSweet = async (req, res) => {
  // destructuring the body
  const {
    sweetName,
    sweetQuantity,
    ingredients,
    price,
    description,
    category,
    slug,
  } = req.body;

  // taking the image from the multer middleware
  const image = req.file;

  const errors = validationResult(req);
  // if there are errors
  // Send a response with the status and a json
  if (!errors.isEmpty()) {
    res.status(422).json({
      sweet: {
        sweetName,
        sweetQuantity,
        ingredients,
        price,
        description,
        category,
        slug,
      },
      message: "Validation errors are present",
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  // saving the data inside the db
  try {
    const existingSweet = await Sweet.findOne({ sweetName });
    // if the sweet exist already send an error
    if (existingSweet) {
      return res.status(400).json({ message: "The sweet exist already" });
    }

    const contentType = getContentType(path.extname(image.originalname));
    // save the sweet
    const sweet = await Sweet.create({
      sweetName,
      sweetQuantity,
      ingredients,
      price,
      description,
      category,
      slug,
      imageUrl: {
        data: fs.readFileSync("images/" + image.filename),
        contentType: contentType,
      },
    });
    // delete the file from the storage
    deleteFile("images/" + image.filename);
    return res
      .status(201)
      .send({ meesage: "the sweet has been created", sweet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};

// PUT => Editing a sweet
exports.editSweet = async (req, res) => {
  // destructuring the body
  const {
    sweetName,
    sweetQuantity,
    ingredients,
    price,
    description,
    category,
    slug,
    _id,
  } = req.body;
  // if there isn't the id send and error
  if (!_id) {
    res.status(404).json({
      message:
        "Was not possible to update the specific sweet, because the id is missing",
    });
  }
  // taking the image from the multer middleware
  const image = req.file;

  const contentType = getContentType(path.extname(image.originalname));
  const imageUrl = {
    data: fs.readFileSync(image.path),
    contentType: contentType,
  };

  // create a new object for the db update
  const update = {
    sweetName,
    sweetQuantity,
    ingredients,
    price,
    description,
    category,
    slug,
    imageUrl,
  };

  const errors = validationResult(req);
  // if there are errors
  // Send a response with the status and a json
  if (!errors.isEmpty()) {
    res.status(422).json({
      sweet: {
        sweetName,
        sweetQuantity,
        ingredients,
        price,
        description,
        category,
        slug,
      },
      message: "Validation errors are present",
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array(),
    });
  }
  // update the sweet
  try {
    const updatedSweet = await Sweet.findByIdAndUpdate(_id, update, {
      new: true,
    });
    // delete the file from the local folder
    deleteFile("images/" + image.filename);
    res.status(200).json(updatedSweet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Was not possible to update the specific sweet." });
  }
};

exports.editSweetQuantity = async (req, res) => {
  // destructuring the body
  const { _id, newQuantity } = req.body.dataQuantity;

  try {
    // if there are errors
    // Send a response with the status and a json
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // find the sweet inside the db
    const sweet = await Sweet.findById(_id);
    // if there isn't send an error
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }
    // handling the quantity, positive or negative
    let updateQuantity = sweet.sweetQuantity;
    if (newQuantity > 0) {
      updateQuantity += newQuantity;
    } else if (newQuantity < 0) {
      updateQuantity -= Math.abs(newQuantity);
    }

    // Ensure that updateQuantity is not less than 0
    updateQuantity = updateQuantity < 0 ? 0 : updateQuantity;

    // update the quantity of the specific sweet
    const updatedSweet = await Sweet.findByIdAndUpdate(
      _id,
      { sweetQuantity: updateQuantity },
      { new: true }
    );

    res.status(200).send(updatedSweet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//DELETE => Delete a single sweet using the prod id and user id
exports.deleteSweet = async (req, res) => {
  // destructuring the body
  const { _id } = req.body;
  try {
    // take the specific id from the db
    const deletedSweet = await Sweet.findByIdAndRemove(_id);
    // if there isn't send an error
    if (!deletedSweet) {
      return res.status(404).json({
        message: "Sweet not found",
      });
    }
    return res.status(200).json({
      message: "The sweet has been deleted",
    });
  } catch (error) {
    console.error("Something went wrong while deleting a sweet:", error);
    return res.status(500).send(error);
  }
};
