const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  ingredients: [
    {
      ingredientName: {
        type: String,
        required: true,
      },
      measureUnit: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
