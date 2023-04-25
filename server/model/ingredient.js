const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      measureUnit: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
  ],
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
