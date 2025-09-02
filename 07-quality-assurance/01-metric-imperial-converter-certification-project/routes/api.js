"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    // access query
    const input = req.query.input;

    const result = convertHandler.convert(input);

    res.status(200).json(result);
  });
};
