"use strict";

var _require = require("../util/functions"),
    readImageData = _require.readImageData,
    getContentType = _require.getContentType;

var Contact = require("../model/contact");

var mongoose = require("mongoose");

require("dotenv").config(); // Define the contacts to seed


var contacts = [{
  name: "John",
  surname: "Doe",
  role: "Developer",
  bio: "Testing my bio",
  email: "johndoe@example.com",
  phoneNumber: 1234567890,
  slug: "john-doe",
  imageUrl: {
    data: readImageData("../images/image_1.jpg"),
    contentType: getContentType(".jpg")
  }
}, {
  name: "Jane",
  surname: "Doe",
  role: "Designer",
  bio: "Seeding my biography",
  email: "janedoe@example.com",
  phoneNumber: 3426453231,
  slug: "jane-doe",
  imageUrl: {
    data: readImageData("../images/image_2.jpg"),
    contentType: getContentType(".jpg")
  }
}]; // Define the seeder function

var seedContacts = function seedContacts() {
  return regeneratorRuntime.async(function seedContacts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // Connect to the database
          mongoose.connect("mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASSWORD, "@pastry-website.zakjvcl.mongodb.net/").concat(process.env.MONGO_DEFAULT_DATABASE), {
            useNewUrlParser: true,
            useUnifiedTopology: true
          }); // Drop the existing contacts collection

          _context.next = 4;
          return regeneratorRuntime.awrap(Contact.collection.drop());

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(Contact.insertMany(contacts));

        case 6:
          // Log success message
          console.log("Contacts seeded successfully!");
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


seedContacts();