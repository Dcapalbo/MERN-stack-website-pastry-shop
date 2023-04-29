"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sweetSchema = void 0;

var _zod = require("zod");

var sweetSchema = _zod.z.object({
  sweetName: _zod.z.string().nonempty({
    meesage: "inserire il nome del dolce"
  }).min(3, {
    message: "Il nome del dolce deve contenere almeno 3 caratteri"
  }).max(25, {
    message: "il nome del dolce non deve contenere più di 25 caratteri"
  }),
  sweetQuantity: _zod.z.number()["int"]().nonempty({
    message: "Inserire la quantità del dolce"
  }).min(1, {
    message: "La quantità del dolce deve essere di almeno 1 unità"
  }).max(99, {
    message: "Non si possono aggiungere più di 99 unità"
  }),
  ingredientName: _zod.z.string().nonempty({
    meesage: "inserire il nome dell'ingrediente"
  }).min(3, {
    message: "Il nome dell'ingrediente deve contenere almeno 3 caratteri"
  }).max(25, {
    message: "Il nome dell'ingrediente non deve contenere più di 25 caratteri"
  }),
  measureUnit: _zod.z.string().nonempty({
    meesage: "inserire l'unità di misura dell'ingrediente"
  }).min(2, {
    message: "la sigla dell'unità di misura deve contenere almeno 2 caratteri: esempio(gr, cl, ml)"
  }).max(2, {
    message: "la sigla dell'unità di misura non deve contenere più di 2 caratteri"
  }),
  amount: _zod.z.number().nonempty({
    meesage: "inserire la quantità dell'ingrediente"
  }).min(1, {
    message: "indicare la quantità dell'ingrediente in numeri, minimo 1 numero"
  }).max(4, {
    message: "indicare la quantità dell'ingrediente in numeri, massimo 5 numeri"
  }),
  price: _zod.z.number().nonempty({
    meesage: "inserire il prezzo"
  }).min(2, {
    message: "il prezzo deve essere di almeno due cifre"
  }).max(5, {
    message: "il prezzo deve essere composto da massimo 5 cifre"
  }),
  description: _zod.z.string().nonempty({
    meesage: "inserire la descrizione"
  }).min(10, {
    message: "la descrizione del prodotto di pasticceria deve essere di almeno 20 caratteri"
  }).max(250, {
    message: "la descrizione del prodotto di pasticceria non può superare i 150 caratteri"
  }),
  category: _zod.z.string().nonempty({
    message: "Inserire almeno un valore"
  })
});

exports.sweetSchema = sweetSchema;