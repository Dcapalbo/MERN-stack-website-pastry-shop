"use strict";

var mongoose = require("mongoose");

var User = require("../model/user");

require("dotenv").config(); // Define the users to seed


var users = [{
  name: "Domenico",
  email: "capalbodomenico@gmail.com",
  password: "Domenico03"
}, {
  name: "Tiziano",
  email: "janedoe@example.com",
  password: "TiziScott"
}]; // Define the seeder function

var seedUsers = function seedUsers() {
  return regeneratorRuntime.async(function seedUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Connect to the database
          mongoose.connect("mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASSWORD).concat(process.env.MONGO_CLUSTER, ".mongodb.net/").concat(process.env.MONGO_DEFAULT_DATABASE), {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }); // Drop the existing users collection

          _context.next = 4;
          return regeneratorRuntime.awrap(User.collection.drop());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(User.insertMany(users));

        case 6:
          // Log success message
          console.log("Users seeded successfully!");
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


seedUsers();