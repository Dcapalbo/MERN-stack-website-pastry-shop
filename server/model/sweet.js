const mongoose = require("mongoose");
// creating the Mongoose db Schema
const Schema = mongoose.Schema;
const ingredient = require("./ingredient.js");
// sweet Schema
const sweetSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [ingredient.schema],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Sweet", sweetSchema);
