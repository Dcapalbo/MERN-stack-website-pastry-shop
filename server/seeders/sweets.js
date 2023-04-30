const { readImageData, getContentType } = require("../util/functions");
const Sweet = require("../model/sweet");
const mongoose = require("mongoose");
require("dotenv").config();

// Define the sweets to seed
const sweets = [
  {
    sweetName: "Torta di mele",
    sweetQuantity: 7,
    ingredients: [
      { ingredientName: "Mele", measureUnit: "gr", amount: 500 },
      { ingredientName: "Cannella", measureUnit: "gr", amount: 10 },
      { ingredientName: "Crosta di tora", measureUnit: "gr", amount: 200 },
    ],
    price: 11,
    description: "Una torta di mele classica con un pizzico di cannella",
    category: "torte",
    slug: "torta-di-mele",
    imageUrl: {
      data: readImageData("../images/cake.jpeg"),
      contentType: getContentType(".jpeg"),
    },
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    sweetName: "Biscotti alla nocciola",
    sweetQuantity: 7,
    ingredients: [
      { ingredientName: "Farina", measureUnit: "gr", amount: 200 },
      { ingredientName: "Zucchero di canna", measureUnit: "gr", amount: 100 },
      { ingredientName: "Burro", measureUnit: "gr", amount: 100 },
      { ingredientName: "Nocciole tritate", measureUnit: "gr", amount: 100 },
      { ingredientName: "Uova", measureUnit: "gr", amount: 50 },
      { ingredientName: "Cioccolato tritato", measureUnit: "gr", amount: 30 },
    ],
    price: 8,
    description: "Biscotti alla nocciola con pezzetti di cioccolato",
    category: "biscotti",
    slug: "biscotti-alla-nocciola",
    imageUrl: {
      data: readImageData("../images/biscuit.jpeg"),
      contentType: getContentType(".jpeg"),
    },
    createdAt: new Date(),
  },
  {
    sweetName: "Torta ai mirtilli",
    sweetQuantity: 15,
    ingredients: [
      { ingredientName: "Farina", measureUnit: "gr", amount: 150 },
      { ingredientName: "Zucchero", measureUnit: "gr", amount: 100 },
      { ingredientName: "Mirtilli", measureUnit: "gr", amount: 200 },
    ],
    price: 12,
    description: "Torta ai mirtilli senza glutine",
    category: "Senza glutine",
    slug: "torta-ai-mirtilli",
    imageUrl: {
      data: readImageData("../images/senza_glutine.jpeg"),
      contentType: getContentType(".jpeg"),
    },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    sweetName: "Crostata alla frutta",
    sweetQuantity: 22,
    ingredients: [
      { ingredientName: "Floro", measureUnit: "gr", amount: 150 },
      { ingredientName: "Zucchero", measureUnit: "gr", amount: 100 },
      { ingredientName: "Mirtilli", measureUnit: "gr", amount: 200 },
      { ingredientName: "Frutti di bosco", measureUnit: "gr", amount: 150 },
      { ingredientName: "Fragole", measureUnit: "gr", amount: 100 },
    ],
    price: 12,
    description: "Crostata alla frutta, con frutti di bosco e fragole",
    category: "crostate",
    slug: "crostata-alla-frutta",
    imageUrl: {
      data: readImageData("../images/tart.jpeg"),
      contentType: getContentType(".jpeg"),
    },
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
  {
    sweetName: "Torta senza lattosio",
    sweetQuantity: 7,
    ingredients: [
      { ingredientName: "Farina", measureUnit: "gr", amount: 200 },
      { ingredientName: "Fecola di patate", measureUnit: "gr", amount: 100 },
      { ingredientName: "Uova", measureUnit: "gr", amount: 200 },
      {
        ingredientName: "Olio di semi di girasole",
        measureUnit: "gr",
        amount: 100,
      },
      {
        ingredientName: "lievito per dolci",
        measureUnit: "gr",
        amount: 30,
      },
    ],
    price: 24,
    description:
      "Una torta senza lattosio per chi non vuole negarsi i piaceri del dessert",
    category: "senza lattosio",
    slug: "torta-senza-lattosio",
    imageUrl: {
      data: readImageData("../images/senza_lattosio.jpeg"),
      contentType: getContentType(".jpeg"),
    },
    createdAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
  },
];

// Define the seeder function
const seedSweets = async () => {
  try {
    // Connect to the database
    mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Drop the existing sweets collection
    await Sweet.collection.drop();

    // Insert the films into the database
    await Sweet.insertMany(sweets);
    // Log success message
    console.log("Sweets seeded successfully!");
  } catch (err) {
    // Log error message
    console.error(err.message);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the seeder function
seedSweets();
