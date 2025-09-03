"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
  const translator = new Translator();
  const mode = ["american-to-british", "british-to-american"];

  app.route("/api/translate").post((req, res) => {
    const { text, locale } = req.body;

    if (text === undefined || locale === undefined) {
      return res.status(200).json({ error: "Required field(s) missing" });
    }

    if (!text?.trim()) {
      return res.status(200).json({ error: "No text to translate" });
    }

    if (!mode.includes(locale)) {
      return res.status(200).json({ error: "Invalid value for locale field" });
    }

    const translation =
      locale?.trim() === mode[0]
        ? translator.toBritish(text)
        : translator.toAmerican(text);

    res.status(200).json({ text, translation });
  });
};
