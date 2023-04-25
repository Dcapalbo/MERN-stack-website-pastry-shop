"use strict";

var mongoose = require("mongoose"); // creating the Mongoose db Schema


var Schema = mongoose.Schema;

var ingredient = require("./ingredient.js"); // sweet Schema


var sweetSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [ingredient.schema],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Sweet", sweetSchema);