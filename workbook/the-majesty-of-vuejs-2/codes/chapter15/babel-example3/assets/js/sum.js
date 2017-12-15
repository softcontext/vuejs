'use strict';

var _client = require('./client');

var pizza = 100;
var beer = 50;

var sum = function sum(a, b) {
  return a + b + '$';
};
console.log(_client.name + ', you have to pay ' + sum(pizza, beer));