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
  min: 2,
  max: 20
}).trim(), check("amount").isNumeric().isLength({
  min: 1,
  max: 5
}).trim(), check("price").isNumeric().isLength({
  min: 2,
  max: 5
}).trim(), check("description").isString().isLength({
  min: 10,
  max: 150
}).trim(), check("category").isString().notEmpty().trim()], addSweet); //update-sweet => PUT

router.put("/update-sweet", [check("sweetName").isString().isLength({
  min: 3,
  max: 25
}).trim(), check("ingredientName").isString().isLength({
  min: 3,
  max: 25
}).trim(), check("measureUnit").isString().isLength({
  min: 2,
  max: 20
}).trim(), check("amount").isNumeric().isLength({
  min: 1,
  max: 5
}).trim(), check("price").isNumeric().isLength({
  min: 2,
  max: 5
}).trim(), check("description").isString().isLength({
  min: 10,
  max: 150
}).trim(), check("category").isString().notEmpty().trim()], editSweet); //delete-sweet => DELETE

router["delete"]("/delete-sweet", deleteSweet);
module.exports = router;