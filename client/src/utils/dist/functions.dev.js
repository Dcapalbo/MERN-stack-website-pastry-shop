"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slugCreation = exports.decodeToken = void 0;

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