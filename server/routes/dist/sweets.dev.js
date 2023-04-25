"use strict";

var _require = require("../controller/sweets"),
    getSweets = _require.getSweets,
    addSweet = _require.addSweet,
    editSweet = _require.editSweet,
    deleteSweet = _require.deleteSweet;

var _require2 = require("express-validator"),
    check = _require2.check;

var express = require("express");

var router = express.Router(); //sweets => GET all Sweets

router.get("/get-sweets", getSweets); //add-sweet => POST

router.post("/add-sweet", [check("sweetName").isString().isLength({
  min: 3,
  max: 25
}).trim(), check("ingredientName").isString().isLength({
  min: 3,
  max: 25
}).trim(), check("measureUnit").isString().isLength({
  min: 1,
  max: 20
}).trim(), check("price").isNumeric().isLength({
  min: 3,
  max: 5
}).trim(), check("description").isString().isLength({
  min: 20,
  max: 150
}).trim()], addSweet); //update-sweet => PUT

router.put("/update-sweet", [check("sweetName").isString().isLength({
  min: 3,
  max: 25
}).trim(), check("ingredientName").isString().isLength({
  min: 3,
  max: 25
}).trim(), check("measureUnit").isString().isLength({
  min: 1,
  max: 20
}).trim(), check("price").isNumeric().isLength({
  min: 3,
  max: 5
}).trim(), check("description").isString().isLength({
  min: 20,
  max: 150
}).trim()], editSweet); //delete-sweet => DELETE

router["delete"]("/delete-film", deleteSweet);
module.exports = router;