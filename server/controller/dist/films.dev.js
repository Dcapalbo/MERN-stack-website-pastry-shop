"use strict";

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var _require2 = require("../util/functions"),
    deleteFile = _require2.deleteFile;

var Film = require("../model/film");

var fs = require("fs"); // GET => Getting all films


exports.getFilms = function _callee(req, res) {
  var films;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Film.find().sort({
            year: -1
          }));

        case 3:
          films = _context.sent;
          res.status(200).send(films);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.status(404).json({
            message: "Films was not found"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // POST => Adding a Film


exports.addFilm = function _callee2(req, res) {
  var _req$body, title, director, production, screenwriter, directorOfPhotography, synopsis, duration, year, slug, type, file, image, errors, existingFilm, film;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, director = _req$body.director, production = _req$body.production, screenwriter = _req$body.screenwriter, directorOfPhotography = _req$body.directorOfPhotography, synopsis = _req$body.synopsis, duration = _req$body.duration, year = _req$body.year, slug = _req$body.slug, type = _req$body.type, file = _req$body.file;
          image = req.file;
          errors = validationResult(req); // if there are errors
          // Send a response with the status and a json

          if (!errors.isEmpty()) {
            res.status(422).json({
              film: {
                title: title,
                director: director,
                production: production,
                screenwriter: screenwriter,
                directorOfPhotography: directorOfPhotography,
                synopsis: synopsis,
                duration: duration,
                year: year,
                slug: slug,
                type: type,
                userId: userId
              },
              message: "Validation errors are present",
              errorMessage: errors.array()[0].msg,
              validationErrors: errors.array()
            });
          } // saving the data inside the db


          _context2.prev = 4;
          _context2.next = 7;
          return regeneratorRuntime.awrap(Film.findOne({
            title: title
          }));

        case 7:
          existingFilm = _context2.sent;

          if (!existingFilm) {
            _context2.next = 10;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "The film exist already"
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(Film.create({
            title: title,
            director: director,
            production: production,
            screenwriter: screenwriter,
            directorOfPhotography: directorOfPhotography,
            synopsis: synopsis,
            duration: duration,
            year: year,
            slug: slug,
            type: type,
            imageUrl: {
              data: fs.readFileSync("images/" + image.filename),
              contentType: "image/png"
            }
          }));

        case 12:
          film = _context2.sent;
          deleteFile("images/" + image.filename);
          return _context2.abrupt("return", res.status(201).send(film));

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
}; // PUT => Editing a product


exports.editFilm = function _callee3(req, res) {
  var _req$body2, title, director, production, screenwriter, directorOfPhotography, synopsis, duration, year, slug, type, _id, image, imageUrl, update, errors, updatedFilm;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, title = _req$body2.title, director = _req$body2.director, production = _req$body2.production, screenwriter = _req$body2.screenwriter, directorOfPhotography = _req$body2.directorOfPhotography, synopsis = _req$body2.synopsis, duration = _req$body2.duration, year = _req$body2.year, slug = _req$body2.slug, type = _req$body2.type, _id = _req$body2._id;

          if (!_id) {
            res.status(404).json({
              message: "Was not possible to update the specific film, because the id is missing"
            });
          }

          image = req.file;
          imageUrl = {
            data: fs.readFileSync("images/" + image.filename),
            contentType: image.mimetype
          };
          update = {
            title: title,
            director: director,
            production: production,
            screenwriter: screenwriter,
            directorOfPhotography: directorOfPhotography,
            synopsis: synopsis,
            duration: duration,
            year: year,
            slug: slug,
            type: type,
            imageUrl: imageUrl
          };
          console.log(req.body);
          errors = validationResult(req); // if there are errors
          // Send a response with the status and a json

          if (!errors.isEmpty()) {
            res.status(422).json({
              film: {
                title: title,
                director: director,
                production: production,
                screenwriter: screenwriter,
                directorOfPhotography: directorOfPhotography,
                synopsis: synopsis,
                duration: duration,
                year: year,
                slug: slug,
                type: type
              },
              message: "Validation errors are present",
              errorMessage: errors.array()[0].msg,
              validationErrors: errors.array()
            });
          }

          _context3.prev = 8;
          _context3.next = 11;
          return regeneratorRuntime.awrap(Film.findByIdAndUpdate(_id, update, {
            "new": true
          }));

        case 11:
          updatedFilm = _context3.sent;
          deleteFile("images/" + image.filename);
          res.status(200).json(updatedFilm);
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](8);
          res.status(500).json({
            message: "Was not possible to update the specific film."
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[8, 16]]);
}; //DELETE => Delete a single product using the prod id and user id


exports.deleteFilm = function _callee4(req, res) {
  var filmId;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          filmId = req.body._id;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Film.findByIdAndRemove(filmId));

        case 4:
          res.status(200).json({
            message: "The film has been deleted"
          });
          console.log("The film has been deleted");
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](1);
          res.status(500).send(_context4.t0.message);
          console.log("Something went wrong while deleting a film: ", _context4.t0.message);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 8]]);
};