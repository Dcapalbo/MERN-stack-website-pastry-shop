"use strict";

var mongoose = require("mongoose");

var ingredientSchema = new mongoose.Schema({
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    measureUnit: {
      type: String,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  }]
});
var Ingredient = mongoose.model("Ingredient", ingredientSchema);
module.exports = Ingredient;