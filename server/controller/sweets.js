const { validationResult } = require("express-validator");
const Sweet = require("../model/sweet");
const {
  deleteFile,
  calculateSweetPrices,
  getContentType,
} = require("../util/functions");
const path = require("path");
const fs = require("fs");

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
  const {
    sweetName,
    sweetQuantity,
    ingredientName,
    measureUnit,
    amount,
    price,
    description,
    category,
    slug,
  } = req.body;

  const image = req.file;

  const errors = validationResult(req);
  // if there are errors
  // Send a response with the status and a json
  if (!errors.isEmpty()) {
    res.status(422).json({
      sweet: {
        sweetName,
        sweetQuantity,
        ingredientName,
        measureUnit,
        amount,
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
    if (existingSweet) {
      return res.status(400).json({ message: "The sweet exist already" });
    }

    const contentType = getContentType(path.extname(image.originalname));

    const sweet = await Sweet.create({
      sweetName,
      sweetQuantity,
      ingredientName,
      measureUnit,
      amount,
      price,
      description,
      category,
      slug,
      imageUrl: {
        data: fs.readFileSync("images/" + image.filename),
        contentType: contentType,
      },
    });

    deleteFile("images/" + image.filename);
    console.log("my sweet has been created?", sweet);
    return res.status(201).send(sweet);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong.", error });
  }
};

// PUT => Editing a sweet
exports.editSweet = async (req, res) => {
  const {
    sweetName,
    sweetQuantity,
    ingredientName,
    measureUnit,
    amount,
    price,
    description,
    category,
    slug,
    _id,
  } = req.body;

  if (!_id) {
    res.status(404).json({
      message:
        "Was not possible to update the specific sweet, because the id is missing",
    });
  }

  const image = req.file;

  const contentType = getContentType(path.extname(image.originalname));
  const imageUrl = {
    data: fs.readFileSync(image.path),
    contentType: contentType,
  };

  const update = {
    sweetName,
    sweetQuantity,
    ingredientName,
    measureUnit,
    amount,
    price,
    description,
    category,
    slug,
    imageUrl,
  };

  console.log(req.body);

  const errors = validationResult(req);
  // if there are errors
  // Send a response with the status and a json
  if (!errors.isEmpty()) {
    res.status(422).json({
      sweet: {
        sweetName,
        sweetQuantity,
        ingredientName,
        measureUnit,
        amount,
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
  try {
    const updatedSweet = await Sweet.findByIdAndUpdate(_id, update, {
      new: true,
    });
    deleteFile("images/" + image.filename);
    res.status(200).json(updatedSweet);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Was not possible to update the specific sweet." });
  }
};

//DELETE => Delete a single sweet using the prod id and user id
exports.deleteSweet = async (req, res) => {
  const sweetId = req.body._id;
  try {
    await Sweet.findByIdAndRemove(sweetId);
    res.status(200).json({
      message: "The sweet has been deleted",
    });
    console.log("The sweet has been deleted");
  } catch (error) {
    res.status(500).send(error);
    console.log("Something went wrong while deleting a sweet: ", error);
  }
};
