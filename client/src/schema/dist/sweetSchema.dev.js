"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sweetSchema = void 0;

var _zod = require("zod");

var sweetSchema = _zod.z.object({
  sweetName: _zod.z.string().nonempty({
    meesage: "inserire un valore"
  }).min(3, {
    message: "Il nome del dolce deve contenere almeno 3 caratteri"
  }).max(25, {
    message: "il nome del dolce non deve contenere più di 25 caratteri"
  }),
  ingredientName: _zod.z.string().nonempty({
    meesage: "inserire un valore"
  }).min(3, {
    message: "Il nome dell'ingrediente deve contenere almeno 3 caratteri"
  }).max(25, {
    message: "Il nome dell'ingrediente non deve contenere più di 25 caratteri"
  }),
  measureUnit: _zod.z.string().nonempty({
    meesage: "inserire un valore"
  }).min(2, {
    message: "la sigla dell'unità di misura deve contenere almeno 2 caratteri: esempio(gr, cl, ml)"
  }).max(20, {
    message: "la sigla dell'unità di misura non deve contenere più di 20 caratteri"
  }),
  amount: _zod.z.string().nonempty({
    meesage: "inserire un valore"
  }).min(1, {
    message: "indicare la quantità dell'ingrediente in numeri, minimo 1 numero"
  }).max(20, {
    message: "indicare la quantità dell'ingrediente in numeri, massimo 4 numeri"
  }),
  price: _zod.z.string().nonempty({
    meesage: "inserire un valore"
  }).min(2, {
    message: "il prezzo deve essere di almeno 0.99"
  }).max(5, {
    message: "il prezzo non può superare l'ammontare di 999.99"
  }),
  description: _zod.z.string().nonempty({
    meesage: "inserire un valore"
  }).min(10, {
    message: "la descrizione del prodotto di pasticceria deve essere di almeno 20 caratteri"
  }).max(150, {
    message: "la descrizione del prodotto di pasticceria non può superare i 150 caratteri"
  }),
  category: _zod.z.string().nonempty({
    message: "Inserire almeno un valore"
  })
});

exports.sweetSchema = sweetSchema;