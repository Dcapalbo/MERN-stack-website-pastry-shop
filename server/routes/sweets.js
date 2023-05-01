const { check, body } = require("express-validator");
const {
  getSweets,
  addSweet,
  editSweet,
  deleteSweet,
  editSweetQuantity,
} = require("../controller/sweets");
const express = require("express");
const router = express.Router();

//sweets => GET all Sweets
router.get("/get-sweets", getSweets);
//add-sweet => POST
router.post(
  "/add-sweet",
  [
    check("sweetName")
      .isString()
      .isLength({ min: 3, max: 40 })
      .withMessage("Il nome del dolce deve contenere tra i 3 e i 40 caratteri")
      .trim(),
    check("sweetQuantity")
      .isNumeric()
      .isLength({ min: 1, max: 99 })
      .withMessage("La quantità del dolce deve essere tra 1 e 99 ")
      .trim(),
    check("ingredients")
      .isArray({ min: 1 })
      .withMessage(
        "L'elenco degli ingredienti deve contenere almeno un ingrediente"
      )
      .custom((ingredients) => {
        ingredients.forEach((ingredient, index) => {
          const { ingredientName, measureUnit, amount } = ingredient;

          if (
            !ingredientName ||
            (ingredientName.trim().length < 3 &&
              ingredientName.trim().length > 20)
          ) {
            throw new Error(
              `Il nome dell'ingrediente ${
                index + 1
              } deve contenere almeno 3 caratteri e non più di 20`
            );
          }

          if (!measureUnit || measureUnit.trim().length !== 2) {
            throw new Error(
              `La sigla dell'unità di misura dell'ingrediente ${
                index + 1
              } deve essere di due caratteri: esempio (gr, cl, ml)`
            );
          }

          if (!["gr", "cl", "ml"].includes(measureUnit.trim())) {
            throw new Error(
              `La sigla dell'unità di misura dell'ingrediente ${
                index + 1
              } deve essere 'gr', 'cl', o 'ml'`
            );
          }

          if (!amount || amount <= 0) {
            throw new Error(
              `La quantità dell'ingrediente ${
                index + 1
              } deve essere superiore allo 0`
            );
          }

          if (amount > 1000) {
            throw new Error(
              `La quantità dell'ingrediente ${
                index + 1
              } deve essere inferiore o uguale a 1000`
            );
          }
        });

        return true;
      }),
    check("price")
      .isNumeric()
      .isLength({ min: 1, max: 999 })
      .withMessage(
        "Il prezzo non può essere inferiore a 1 euro né superiore a 999"
      )
      .trim(),
    check("description")
      .isString()
      .isLength({ min: 10, max: 250 })
      .withMessage(
        "La descrizione deve non può essere inferiore di 10 caratteri né superiore di 250"
      )
      .trim(),
    check("category")
      .isString()
      .notEmpty()
      .withMessage("la categoria non deve essere vuota")
      .trim(),
  ],
  addSweet
);
//update-sweet => PUT
router.put(
  "/update-sweet",
  [
    check("sweetName")
      .isString()
      .isLength({ min: 3, max: 40 })
      .withMessage("Il nome del dolce deve contenere tra i 3 e i 40 caratteri")
      .trim(),
    check("sweetQuantity")
      .isNumeric()
      .isLength({ min: 1, max: 99 })
      .withMessage("La quantità del dolce deve essere tra 1 e 99 ")
      .trim(),
    check("ingredients")
      .isArray({ min: 1 })
      .withMessage(
        "L'elenco degli ingredienti deve contenere almeno un ingrediente"
      )
      .custom((ingredients) => {
        ingredients.forEach((ingredient, index) => {
          const { ingredientName, measureUnit, amount } = ingredient;

          if (
            !ingredientName ||
            (ingredientName.trim().length < 3 &&
              ingredientName.trim().length > 20)
          ) {
            throw new Error(
              `Il nome dell'ingrediente ${
                index + 1
              } deve contenere almeno 3 caratteri e non più di 20`
            );
          }

          if (!measureUnit || measureUnit.trim().length !== 2) {
            throw new Error(
              `La sigla dell'unità di misura dell'ingrediente ${
                index + 1
              } deve essere di due caratteri: esempio (gr, cl, ml)`
            );
          }

          if (!["gr", "cl", "ml"].includes(measureUnit.trim())) {
            throw new Error(
              `La sigla dell'unità di misura dell'ingrediente ${
                index + 1
              } deve essere 'gr', 'cl', o 'ml'`
            );
          }

          if (!amount || amount <= 0) {
            throw new Error(
              `La quantità dell'ingrediente ${
                index + 1
              } deve essere superiore allo 0`
            );
          }

          if (amount > 1000) {
            throw new Error(
              `La quantità dell'ingrediente ${
                index + 1
              } deve essere inferiore o uguale a 1000`
            );
          }
        });

        return true;
      }),
    check("price")
      .isNumeric()
      .isLength({ min: 1, max: 999 })
      .withMessage(
        "Il prezzo non può essere inferiore a 1 euro né superiore a 999"
      )
      .trim(),
    check("description")
      .isString()
      .isLength({ min: 10, max: 250 })
      .withMessage(
        "La descrizione deve non può essere inferiore di 10 caratteri né superiore di 250"
      )
      .trim(),
    check("category")
      .isString()
      .notEmpty()
      .withMessage("la categoria non deve essere vuota")
      .trim(),
  ],
  editSweet
);

//update-sweet-quantity => PUT
router.put(
  "/edit-sweet-quantity",
  [
    body("_id").isMongoId().withMessage("id invalido"),
    body("newQuantity")
      .isNumeric()
      .withMessage("La quantità deve essere un numero")
      .isInt({ min: 0, max: 99 })
      .withMessage("La quantità deve essere compresa tra 0 e 99"),
  ],
  editSweetQuantity
);
router.delete(
  "/delete-sweet",
  [body("_id").exists().withMessage("l'id del dolce è richiesto")],
  deleteSweet
);

module.exports = router;
