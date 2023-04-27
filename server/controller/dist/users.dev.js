"use strict";

var _require = require("express-validator"),
    validationResult = _require.validationResult;

var nodemailer = require("nodemailer");

var User = require("../model/user");

var jwt = require("jsonwebtoken");

var bcrypt = require("bcryptjs"); // POST => create User


exports.createUser = function _callee(req, res) {
  var _req$body, name, email, password, errors, existingUser, hashedPassword, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // Validate request body using express-validator

          errors = validationResult(req);

          if (errors.isEmpty()) {
            _context.next = 6;
            break;
          }

          console.log("POST adding users errors: ", errors.array());
          return _context.abrupt("return", res.status(422).json({
            user: {
              name: name,
              email: email,
              password: password
            },
            message: "Validation errors are present",
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 8:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "The user has already been registered"
          }));

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

        case 13:
          hashedPassword = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(User.create({
            name: name,
            email: email,
            password: hashedPassword
          }));

        case 16:
          user = _context.sent;
          // Return success response with created user
          res.status(201).json({
            message: "The user has been created",
            user: user
          });
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          // Handle errors
          console.error("Error creating user: ", _context.t0);
          res.status(500).json({
            message: "Internal server error"
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
}; // POST => Login in the User


exports.loginUser = function _callee2(req, res) {
  var _req$body2, email, password, existingUser, isPasswordValid, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context2.sent;

          if (existingUser) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(404).json({
            message: "The User doesn't exist"
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, existingUser.password));

        case 9:
          isPasswordValid = _context2.sent;

          if (isPasswordValid) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Invalid credentials"
          }));

        case 12:
          token = jwt.sign({
            email: existingUser.email,
            userId: existingUser._id
          }, process.env.JWT_SECRET, {
            expiresIn: "6h"
          });
          return _context2.abrupt("return", res.status(200).json({
            message: "Login successful",
            result: existingUser,
            token: token,
            userId: existingUser._id
          }));

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0.message);
          res.status(500).json({
            message: "Something went wrong"
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 16]]);
}; //POST => forgot password


exports.forgotPassword = function _callee3(req, res) {
  var email, existingUser, token, transporter, automaticEmailData;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context3.sent;

          if (existingUser) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            message: "The user with this email does not exist"
          }));

        case 7:
          token = jwt.sign({
            _id: existingUser._id
          }, process.env.JWT_SECRET, {
            expiresIn: "5m"
          });
          transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.SMTP_EMAIL,
              pass: process.env.SMTP_PASSWORD
            }
          });
          automaticEmailData = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: "Laura&Maria pasticceria link per il reset della password",
            html: "\n            <h2>Questo link ha validit\xE0 di 5 minuti, per favore clicca sul link qui sotto per completare il reset della tua nuova password,</h2>\n            <a href=\"".concat(process.env.CLIENT_LOCAL_URL, "/reset-password?token=").concat(token, "\">").concat(token, "</a>\n        ")
          };
          _context3.next = 12;
          return regeneratorRuntime.awrap(User.updateOne({
            resetLink: token
          }));

        case 12:
          transporter.sendMail(automaticEmailData, function (err, info) {
            if (err) {
              console.log("Here my reset password error: ", err);
              return;
            }

            return res.status(201).json({
              message: "The link for the password reset has been sent: " + info.response
            });
          });
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          return _context3.abrupt("return", res.status(403).json({
            message: "Was not possible to reset the password"
          }));

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15]]);
}; // PUT => reset password


exports.resetPassword = function _callee5(req, res) {
  var _req$body3, resetLink, password, existingResetLink;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _req$body3 = req.body, resetLink = _req$body3.resetLink, password = _req$body3.password;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            resetLink: resetLink
          }));

        case 4:
          existingResetLink = _context5.sent;

          if (existingResetLink) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            message: "The reset link does not exist"
          }));

        case 7:
          jwt.verify(resetLink, process.env.JWT_SECRET, function _callee4(err) {
            var hashedPassword, updatedUser;
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    if (!err) {
                      _context4.next = 2;
                      break;
                    }

                    return _context4.abrupt("return", res.status(401).json({
                      message: "incorrect or expired token"
                    }));

                  case 2:
                    _context4.next = 4;
                    return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

                  case 4:
                    hashedPassword = _context4.sent;
                    _context4.next = 7;
                    return regeneratorRuntime.awrap(User.findOneAndUpdate({
                      resetLink: resetLink
                    }, {
                      password: hashedPassword,
                      resetLink: ""
                    }, {
                      "new": true
                    } // Return the updated document instead of the original
                    ));

                  case 7:
                    updatedUser = _context4.sent;
                    return _context4.abrupt("return", res.status(201).json({
                      message: "The password has been reset",
                      user: updatedUser
                    }));

                  case 9:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", res.status(409).json({
            message: "Unable to reset password"
          }));

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 10]]);
};