const { validationResult } = require("express-validator");
const { deleteFile } = require("../util/functions");
const Sweet = require("../model/sweet");
const fs = require("fs");

// GET => Getting all films
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find().sort({
      year: -1,
    });
    res.status(200).send(sweets);
  } catch {
    res.status(404).json({ message: "sweets was not found" });
  }
};
// POST => Adding a Sweet
exports.addSweet = async (req, res) => {
  const { sweetName, ingredientName, measureUnit, price, description } =
    req.body;
  const image = req.file;

  const errors = validationResult(req);
  // if there are errors
  // Send a response with the status and a json
  if (!errors.isEmpty()) {
    res.status(422).json({
      film: {
        sweetName,
        ingredientName,
        measureUnit,
        price,
        description,
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

    const sweet = await Sweet.create({
      sweetName,
      ingredientName,
      measureUnit,
      price,
      description,
      imageUrl: {
        data: fs.readFileSync("images/" + image.filename),
        contentType: "image/png",
      },
    });

    deleteFile("images/" + image.filename);
    return res.status(201).send(sweet);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// PUT => Editing a sweet
exports.editSweet = async (req, res) => {
  const { sweetName, ingredientName, measureUnit, price, description, _id } =
    req.body;

  if (!_id) {
    res.status(404).json({
      message:
        "Was not possible to update the specific sweet, because the id is missing",
    });
  }

  const image = req.file;
  const imageUrl = {
    data: fs.readFileSync("images/" + image.filename),
    contentType: image.mimetype,
  };

  const update = {
    sweetName,
    ingredientName,
    measureUnit,
    price,
    description,
    imageUrl,
  };

  console.log(req.body);

  const errors = validationResult(req);
  // if there are errors
  // Send a response with the status and a json
  if (!errors.isEmpty()) {
    res.status(422).json({
      film: {
        sweetName,
        ingredientName,
        measureUnit,
        price,
        description,
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
    res.status(500).send(error.message);
    console.log("Something went wrong while deleting a sweet: ", error.message);
  }
};
