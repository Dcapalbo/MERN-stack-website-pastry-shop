"use strict";

require("dotenv").config();

var path = require("path");

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var session = require("express-session");

var MongoDBStore = require("connect-mongodb-session")(session);

var sweetRoutes = require("./routes/sweets");

var usersRoutes = require("./routes/users");

var multer = require("multer");

var cors = require("cors");

var app = express();
var PORT = process.env.PORT || 5000;
var mongoDbUri = "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASSWORD).concat(process.env.MONGO_CLUSTER, ".mongodb.net/").concat(process.env.MONGO_DEFAULT_DATABASE); // Database Connection

mongoose.connect(mongoDbUri).then(function () {
  console.log("Database connected successfully");
  app.listen(PORT, function () {
    return console.log("Server running on Port: ".concat(PORT));
  });
})["catch"](function (err) {
  console.log("Connection error name: ", err.name);
}); // Middleware

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.urlencoded({
  extended: false
})); // Multer Configuration

var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "images");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({
  storage: storage,
  fileFilter: fileFilter
}).single("file"));
app.use("/images", express["static"](path.join(__dirname, "images")));
app.use(cors()); // Routes

app.use(sweetRoutes);
app.use(usersRoutes);