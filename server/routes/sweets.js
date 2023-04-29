const {
  getSweets,
  addSweet,
  editSweet,
  deleteSweet,
} = require("../controller/sweets");
const { check } = require("express-validator");
const express = require("express");
const router = express.Router();

//sweets => GET all Sweets
router.get("/get-sweets", getSweets);
//add-sweet => POST
router.post(
  "/add-sweet",
  [
    check("sweetName").isString().isLength({ min: 3, max: 25 }).trim(),
    check("ingredientName").isString().isLength({ min: 3, max: 25 }).trim(),
    check("measureUnit").isString().isLength({ min: 2, max: 2 }).trim(),
    check("amount").isNumeric().isLength({ min: 1, max: 4 }).trim(),
    check("price").isNumeric().isLength({ min: 2, max: 5 }).trim(),
    check("description").isString().isLength({ min: 10, max: 250 }).trim(),
    check("category").isString().notEmpty().trim(),
    check("createdAt").isDate().notEmpty().trim(),
  ],
  addSweet
);
//update-sweet => PUT
router.put(
  "/update-sweet",
  [
    check("sweetName").isString().isLength({ min: 3, max: 25 }).trim(),
    check("ingredientName").isString().isLength({ min: 3, max: 25 }).trim(),
    check("measureUnit").isString().isLength({ min: 2, max: 2 }).trim(),
    check("amount").isNumeric().isLength({ min: 1, max: 4 }).trim(),
    check("price").isNumeric().isLength({ min: 2, max: 5 }).trim(),
    check("description").isString().isLength({ min: 10, max: 250 }).trim(),
    check("category").isString().notEmpty().trim(),
    check("createdAt").isDate().notEmpty().trim(),
  ],
  editSweet
);
//delete-sweet => DELETE
router.delete("/delete-sweet", deleteSweet);

module.exports = router;
