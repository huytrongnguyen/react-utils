"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var routes = exports.routes = {};

var route = function route(path) {
  return function (target) {
    routes[path] = target;
  };
};

exports.default = route;