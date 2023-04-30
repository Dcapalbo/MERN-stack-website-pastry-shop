"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSchema = void 0;

var _zod = require("zod");

var loginSchema = _zod.z.object({
  email: _zod.z.string().email({
    message: "l'email non è ben formattata inserire la @ e nella seconda parte la dicitura che posticipa il punto"
  }).min(10, {
    message: "l'email deve essere almeno di 10 caratteri"
  }).max(40, {
    message: "l'email non deve esuperare i 40 caratteri"
  }),
  password: _zod.z.string().min(10, {
    message: "La password deve contenere almeno 10 caratteri"
  }).max(30, {
    message: "La password non può contenere più di 30 caratteri"
  }),
  confirmPassword: _zod.z.string().min(10, {
    message: "La conferma della password deve contenere almeno 10 caratteri"
  }).max(30, {
    message: "La conferma della password non può contenere più di 30 caratteri"
  }).refine(function (data) {
    return data.password === data.confirmPassword;
  }, {
    message: "Le password non sono uguali",
    path: ["confirmPassword"]
  })
});

exports.loginSchema = loginSchema;