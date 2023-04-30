const mongoose = require("mongoose");
// creating the Mongoose db Schema
const Schema = mongoose.Schema;
// sweet Schema
const sweetSchema = new Schema({
  sweetName: {
    type: String,
    required: true,
  },
  sweetQuantity: {
    type: Number,
    required: true,
  },
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
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  imageUrl: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sweet", sweetSchema);
