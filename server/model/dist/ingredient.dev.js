"use strict";

var mongoose = require("mongoose");

var ingredientSchema = new mongoose.Schema({
  ingredients: [{
    ingredientName: {
      type: String,
      required: true
    },
    measureUnit: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }]
});
var Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;