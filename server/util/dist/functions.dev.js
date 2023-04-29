"use strict";

var path = require("path");

var fs = require("fs");

function deleteFile(filePath) {
  fs.unlink(filePath, function (err) {
    if (err) {
      throw err;
    }
  });
}

function readImageData(filePath) {
  var absolutePath = path.join(__dirname, filePath);
  var imageData = fs.readFileSync(absolutePath);
  return imageData;
}

function getContentType(fileExtension) {
  switch (fileExtension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";

    case ".png":
      return "image/png";

    case ".gif":
      return "image/gif";
    // Add more supported file extensions as needed

    default:
      return null;
  }
}

function calculateSweetPrices(sweets) {
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
}

module.exports = {
  deleteFile: deleteFile,
  readImageData: readImageData,
  getContentType: getContentType,
  calculateSweetPrices: calculateSweetPrices
};