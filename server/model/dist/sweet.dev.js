"use strict";

var mongoose = require("mongoose"); // creating the Mongoose db Schema


var Schema = mongoose.Schema;

var ingredient = require("./ingredient.js"); // sweet Schema


var sweetSchema = new Schema({
  sweetName: {
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
  category: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  imageUrl: {
    data: Buffer,
    contentType: String
  }
});
module.exports = mongoose.model("Sweet", sweetSchema);