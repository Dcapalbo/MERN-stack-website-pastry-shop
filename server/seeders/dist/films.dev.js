"use strict";

var _require = require("../util/functions"),
    readImageData = _require.readImageData,
    getContentType = _require.getContentType;

var Sweet = require("../model/sweet");

var mongoose = require("mongoose");

require("dotenv").config(); // Define the sweets to seed


var sweets = [{
  sweetName: "The Shawshank Redemption",
  ingredients: [{
    ingredientName: "water",
    measureUnit: "100 ml"
  }, {
    ingredientName: "coffe",
    measureUnit: "50 gr"
  }, {
    ingredientName: "meat",
    measureUnit: "100 gr"
  }],
  production: "Castle Rock Entertainment",
  screenwriter: "Frank Darabont",
  directorOfPhotography: "Roger Deakins",
  synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  duration: 142,
  year: 1994,
  type: "Drama",
  slug: "the-shawshank-redemption",
  imageUrl: {
    data: readImageData("../images/image_1.jpg"),
    contentType: getContentType(".jpg")
  }
}, {
  title: "The Godfather",
  director: "Francis Ford Coppola",
  production: "Paramount Pictures",
  screenwriter: "Mario Puzo, Francis Ford Coppola",
  directorOfPhotography: "Gordon Willis",
  synopsis: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
  duration: 175,
  year: 1972,
  type: "Crime",
  slug: "the-godfather",
  imageUrl: {
    data: readImageData("../images/image_2.jpg"),
    contentType: getContentType(".jpg")
  }
}, {
  title: "The Dark Knight",
  director: "Christopher Nolan",
  production: "Warner Bros. Pictures",
  screenwriter: "Jonathan Nolan, Christopher Nolan",
  directorOfPhotography: "Wally Pfister",
  synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  duration: 152,
  year: 2008,
  type: "action",
  slug: "the-dark-knight",
  imageUrl: {
    data: readImageData("../images/image_1.jpg"),
    contentType: getContentType(".jpg")
  }
}, {
  title: "Forrest Gump",
  director: "Robert Zemeckis",
  production: "Paramount Pictures",
  screenwriter: "Eric Roth",
  directorOfPhotography: "Don Burgess",
  synopsis: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
  duration: 142,
  year: 1994,
  type: "drama",
  slug: "forrest-gump",
  imageUrl: {
    data: readImageData("../images/image_2.jpg"),
    contentType: getContentType(".jpg")
  }
}]; // Define the seeder function

var seedFilms = function seedFilms() {
  return regeneratorRuntime.async(function seedFilms$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Connect to the database
          mongoose.connect("mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASSWORD).concat(process.env.MONGO_CLUSTER, ".mongodb.net/").concat(process.env.MONGO_DEFAULT_DATABASE), {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }); // Drop the existing sweets collection

          _context.next = 4;
          return regeneratorRuntime.awrap(Sweet.collection.drop());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Sweet.insertMany(sweets));

        case 6:
          // Log success message
          console.log("Sweets seeded successfully!");
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          // Log error message
          console.error(_context.t0.message);

        case 12:
          _context.prev = 12;
          // Close the database connection
          mongoose.connection.close();
          return _context.finish(12);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9, 12, 15]]);
}; // Call the seeder function


seedSweets();