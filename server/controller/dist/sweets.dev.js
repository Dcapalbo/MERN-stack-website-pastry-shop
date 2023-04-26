"use strict";

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var _require2 = require("../util/functions"),
    deleteFile = _require2.deleteFile;

var Sweet = require("../model/sweet");

var fs = require("fs"); // GET => Getting all sweets


exports.getSweets = function _callee(req, res) {
  var sweets;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Sweet.find().sort({
            year: -1
          }));

        case 3:
          sweets = _context.sent;
          res.status(200).send(sweets);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: "sweets was not found"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // POST => Adding a Sweet


exports.addSweet = function _callee2(req, res) {
  var _req$body, sweetName, ingredientName, measureUnit, price, description, image, errors, existingSweet, sweet;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, sweetName = _req$body.sweetName, ingredientName = _req$body.ingredientName, measureUnit = _req$body.measureUnit, price = _req$body.price, description = _req$body.description;
          image = req.file;
          errors = validationResult(req); // if there are errors
          // Send a response with the status and a json

          if (!errors.isEmpty()) {
            res.status(422).json({
              film: {
                sweetName: sweetName,
                ingredientName: ingredientName,
                measureUnit: measureUnit,
                price: price,
                description: description
              },
              message: "Validation errors are present",
              errorMessage: errors.array()[0].msg,
              validationErrors: errors.array()
            });
          } // saving the data inside the db


          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Sweet.findOne({
            sweetName: sweetName
          }));

        case 7:
          existingSweet = _context2.sent;

          if (!existingSweet) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "The sweet exist already"
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(Sweet.create({
            sweetName: sweetName,
            ingredientName: ingredientName,
            measureUnit: measureUnit,
            price: price,
            description: description,
            imageUrl: {
              data: fs.readFileSync("images/" + image.filename),
              contentType: "image/png"
            }
          }));

        case 12:
          sweet = _context2.sent;
          deleteFile("images/" + image.filename);
          return _context2.abrupt("return", res.status(201).send(sweet));

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](4);
          return _context2.abrupt("return", res.status(500).json({
            message: "Something went wrong."
          }));

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 17]]);
}; // PUT => Editing a sweet


exports.editSweet = function _callee3(req, res) {
  var _req$body2, sweetName, ingredientName, measureUnit, price, description, _id, image, imageUrl, update, errors, updatedSweet;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, sweetName = _req$body2.sweetName, ingredientName = _req$body2.ingredientName, measureUnit = _req$body2.measureUnit, price = _req$body2.price, description = _req$body2.description, _id = _req$body2._id;

          if (!_id) {
            res.status(404).json({
              message: "Was not possible to update the specific sweet, because the id is missing"
            });
          }

          image = req.file;
          imageUrl = {
            data: fs.readFileSync("images/" + image.filename),
            contentType: image.mimetype
          };
          update = {
            sweetName: sweetName,
            ingredientName: ingredientName,
            measureUnit: measureUnit,
            price: price,
            description: description,
            imageUrl: imageUrl
          };
          console.log(req.body);
          errors = validationResult(req); // if there are errors
          // Send a response with the status and a json

          if (!errors.isEmpty()) {
            res.status(422).json({
              film: {
                sweetName: sweetName,
                ingredientName: ingredientName,
                measureUnit: measureUnit,
                price: price,
                description: description
              },
              message: "Validation errors are present",
              errorMessage: errors.array()[0].msg,
              validationErrors: errors.array()
            });
          }

          _context3.prev = 8;
          _context3.next = 11;
          return regeneratorRuntime.awrap(Sweet.findByIdAndUpdate(_id, update, {
            "new": true
          }));

        case 11:
          updatedSweet = _context3.sent;
          deleteFile("images/" + image.filename);
          res.status(200).json(updatedSweet);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](8);
          res.status(500).json({
            message: "Was not possible to update the specific sweet."
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[8, 16]]);
}; //DELETE => Delete a single sweet using the prod id and user id


exports.deleteSweet = function _callee4(req, res) {
  var sweetId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          sweetId = req.body._id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Sweet.findByIdAndRemove(sweetId));

        case 4:
          res.status(200).json({
            message: "The sweet has been deleted"
          });
          console.log("The sweet has been deleted");
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(500).send(_context4.t0.message);
          console.log("Something went wrong while deleting a sweet: ", _context4.t0.message);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
};