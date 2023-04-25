const { readImageData, getContentType } = require("../util/functions");
const Sweet = require("../model/sweet");
const mongoose = require("mongoose");
require("dotenv").config();

// Define the sweets to seed
const sweets = [
  {
    sweetName: "The Shawshank Redemption",
    ingredients: [
      {
        ingredientName: "water",
        measureUnit: "100 ml",
      },
      {
        ingredientName: "coffe",
        measureUnit: "50 gr",
      },
      {
        ingredientName: "meat",
        measureUnit: "100 gr",
      },
    ],
    production: "Castle Rock Entertainment",
    screenwriter: "Frank Darabont",
    directorOfPhotography: "Roger Deakins",
    synopsis:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    duration: 142,
    year: 1994,
    type: "Drama",
    slug: "the-shawshank-redemption",
    imageUrl: {
      data: readImageData("../images/image_1.jpg"),
      contentType: getContentType(".jpg"),
    },
  },
  {
    title: "The Godfather",
    director: "Francis Ford Coppola",
    production: "Paramount Pictures",
    screenwriter: "Mario Puzo, Francis Ford Coppola",
    directorOfPhotography: "Gordon Willis",
    synopsis:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    duration: 175,
    year: 1972,
    type: "Crime",
    slug: "the-godfather",
    imageUrl: {
      data: readImageData("../images/image_2.jpg"),
      contentType: getContentType(".jpg"),
    },
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    production: "Warner Bros. Pictures",
    screenwriter: "Jonathan Nolan, Christopher Nolan",
    directorOfPhotography: "Wally Pfister",
    synopsis:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    duration: 152,
    year: 2008,
    type: "action",
    slug: "the-dark-knight",
    imageUrl: {
      data: readImageData("../images/image_1.jpg"),
      contentType: getContentType(".jpg"),
    },
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    production: "Paramount Pictures",
    screenwriter: "Eric Roth",
    directorOfPhotography: "Don Burgess",
    synopsis:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    duration: 142,
    year: 1994,
    type: "drama",
    slug: "forrest-gump",
    imageUrl: {
      data: readImageData("../images/image_2.jpg"),
      contentType: getContentType(".jpg"),
    },
  },
];

// Define the seeder function
const seedFilms = async () => {
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
