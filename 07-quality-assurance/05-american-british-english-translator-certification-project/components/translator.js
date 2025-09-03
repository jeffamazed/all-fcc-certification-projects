const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor() {
    this.britishToAmericanSpelling = Object.fromEntries(
      Object.entries(americanToBritishSpelling).map(([us, uk]) => [uk, us]),
    );

    this.britishToAmericanTitles = Object.fromEntries(
      Object.entries(americanToBritishTitles).map(([us, uk]) => [uk, us]),
    );
  }

  toBritish(input) {
    const originalWords = this.sanitize(input);
    const sanitizedInput = this.sanitize(input).map((w) => w.toLowerCase());
    const timeRegex = /^(\d{1,2}\:(\d{2}))$/;

    const result = sanitizedInput.map((w, i) => {
      let translated = w;
      let isTranslated = false;

      if (timeRegex.test(w)) {
        translated = w.replace(":", ".");
        isTranslated = true;
      } else if (americanOnly[w]) {
        translated = americanOnly[w];
        isTranslated = true;
      } else if (americanToBritishSpelling[w]) {
        translated = americanToBritishSpelling[w];
        isTranslated = true;
      } else if (americanToBritishTitles[w]) {
        translated = americanToBritishTitles[w];
        isTranslated = true;
      }

      // preserve case
      if (originalWords[i] === originalWords[i].toUpperCase()) {
        translated = translated.toUpperCase();
      } else if (originalWords[i][0] === originalWords[i][0].toUpperCase()) {
        translated = this.capitalize(translated);
      }

      if (isTranslated) {
        translated = `<span class="highlight">${translated}</span>`;
      }

      return translated;
    });

    const allMatch =
      sanitizedInput.length === result.length &&
      sanitizedInput.every((val, i) => val === result[i].toLowerCase());

    if (allMatch) return "Everything looks good to me!";

    return result.join(" ");
  }

  toAmerican(input) {
    const originalWords = this.sanitize(input);
    const sanitizedInput = this.sanitize(input).map((w) => w.toLowerCase());
    const timeRegex = /^(\d{1,2}\.(\d{2}))$/;

    const result = sanitizedInput.map((w, i) => {
      let translated = w;
      let isTranslated = false;

      if (timeRegex.test(w)) {
        translated = w.replace(".", ":");
        isTranslated = true;
      } else if (britishOnly[w]) {
        translated = britishOnly[w];
        isTranslated = true;
      } else if (this.britishToAmericanSpelling[w]) {
        translated = this.britishToAmericanSpelling[w];
        isTranslated = true;
      } else if (this.britishToAmericanTitles[w]) {
        translated = this.britishToAmericanTitles[w];
        isTranslated = true;
      }

      // preserve case
      if (originalWords[i] === originalWords[i].toUpperCase()) {
        translated = translated.toUpperCase();
      } else if (originalWords[i][0] === originalWords[i][0].toUpperCase()) {
        translated = this.capitalize(translated);
      }

      if (isTranslated) {
        translated = `<span class="highlight">${translated}</span>`;
      }

      return translated;
    });

    const allMatch =
      sanitizedInput.length === result.length &&
      sanitizedInput.every((val, i) => val === result[i].toLowerCase());

    if (allMatch) return "Everything looks good to me!";

    return result.join(" ");
  }

  sanitize(dirtyInput) {
    return dirtyInput.split(/\s+/);
  }

  capitalize(input) {
    return `${input.slice(0, 1).toUpperCase()}${input.slice(1)}`;
  }
}

module.exports = Translator;
