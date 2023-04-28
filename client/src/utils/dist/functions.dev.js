"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSweetPrices = exports.slugCreation = exports.decodeToken = void 0;

var decodeToken = function decodeToken(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(window.atob(base64).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
  return JSON.parse(jsonPayload);
};

exports.decodeToken = decodeToken;

var slugCreation = function slugCreation(string) {
  return string.toLowerCase().replaceAll(" ", "-");
};

exports.slugCreation = slugCreation;

var calculateSweetPrices = function calculateSweetPrices(sweets) {
  var currentDate = new Date();
  var sweetPrices = sweets.map(function (sweet) {
    var daysElapsed = Math.floor((currentDate - sweet.dateAdded) / (24 * 60 * 60 * 1000));
    var discountedPrice;

    if (daysElapsed === 0) {
      discountedPrice = sweet.price;
    } else if (daysElapsed === 1) {
      discountedPrice = sweet.price * 0.8;
    } else if (daysElapsed === 2) {
      discountedPrice = sweet.price * 0.2;
    } else {
      discountedPrice = 0;
    }

    return {
      name: sweet.name,
      price: sweet.price,
      discountedPrice: discountedPrice
    };
  });
  console.log("some error happens, no sweets found");
  return sweetPrices;
};

exports.calculateSweetPrices = calculateSweetPrices;