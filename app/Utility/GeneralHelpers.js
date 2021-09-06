"use strict";

const _ = require("lodash");

// General helpers

class GeneralHelpers {
  static genRand5() {
    return Math.floor(Math.random() * 90000) + 10000;
  }
}

module.exports = GeneralHelpers;
