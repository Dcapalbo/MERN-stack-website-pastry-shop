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
    check("measureUnit").isString().isLength({ min: 1, max: 20 }).trim(),
    check("amount").isNumeric().isLength({ min: 1, max: 20 }).trim(),
    check("price").isNumeric().isLength({ min: 2, max: 5 }).trim(),
    check("description").isString().isLength({ min: 20, max: 150 }).trim(),
    check("category").isString().isLength({ min: 1 }).trim(),
  ],
  addSweet
);
//update-sweet => PUT
router.put(
  "/update-sweet",
  [
    check("sweetName").isString().isLength({ min: 3, max: 25 }).trim(),
    check("ingredientName").isString().isLength({ min: 3, max: 25 }).trim(),
    check("measureUnit").isString().isLength({ min: 1, max: 20 }).trim(),
    check("amount").isNumeric().isLength({ min: 1, max: 20 }).trim(),
    check("price").isNumeric().isLength({ min: 2, max: 5 }).trim(),
    check("description").isString().isLength({ min: 20, max: 150 }).trim(),
    check("category").isString().isLength({ min: 1 }).trim(),
  ],
  editSweet
);
//delete-sweet => DELETE
router.delete("/delete-sweet", deleteSweet);

module.exports = router;
