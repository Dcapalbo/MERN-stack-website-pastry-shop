"use strict";

var filmsController = require("../controller/films");

var _require = require("express-validator"),
    check = _require.check;

var express = require("express");

var router = express.Router(); //films => GET ALL

router.get("/get-films", filmsController.getFilms); //add-film => POST

router.post("/add-film", [check("title").isString().isLength({
  min: 3,
  max: 30
}).trim(), check("director").isString().isLength({
  min: 6,
  max: 30
}).trim(), check("production").isString().isLength({
  min: 6,
  max: 50
}).trim(), check("screenwriter").isString().isLength({
  min: 6,
  max: 150
}).trim(), check("directorOfPhotography").isString().isLength({
  min: 6,
  max: 30
}).trim(), check("synopsis").isString().isLength({
  min: 10,
  max: 300
}).trim(), check("duration").isFloat().isLength({
  min: 1,
  max: 3
}), check("year").isFloat().isLength({
  min: 4,
  max: 4
}), check("type").isString().trim()], filmsController.addFilm); //update-film => PUT

router.put("/update-film", [check("title").isString().isLength({
  min: 3,
  max: 30
}).trim(), check("director").isString().isLength({
  min: 6,
  max: 30
}).trim(), check("production").isString().isLength({
  min: 6,
  max: 50
}).trim(), check("screenwriter").isString().isLength({
  min: 6,
  max: 150
}).trim(), check("directorOfPhotography").isString().isLength({
  min: 6,
  max: 30
}).trim(), check("synopsis").isString().isLength({
  min: 10,
  max: 300
}).trim(), check("duration").isFloat().isLength({
  min: 1,
  max: 3
}), check("year").isFloat().isLength({
  min: 4,
  max: 4
}), check("type").isString().trim()], filmsController.editFilm); //delete-film => DELETE

router["delete"]("/delete-film", filmsController.deleteFilm);
module.exports = router;