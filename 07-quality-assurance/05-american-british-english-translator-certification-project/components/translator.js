const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  constructor() {
    this.americanOnly = americanOnly;
    this.americanSpelling = americanToBritishSpelling;
    this.americanTitles = americanToBritishTitles;
    this.britishOnly = britishOnly;

    // invert spellings/titles for the other way
    this.britishToAmericanSpelling = Object.fromEntries(
      Object.entries(this.americanSpelling).map(([us, uk]) => [uk, us]),
    );
    this.britishToAmericanTitles = Object.fromEntries(
      Object.entries(this.americanTitles).map(([us, uk]) => [uk, us]),
    );
  }

  sanitize(dirtyInput) {
    return dirtyInput.trim().split(/\s+/).join(" ");
  }

  preserveCase(word, replacement) {
    if (word === word.toUpperCase()) return replacement.toUpperCase();
    if (word[0] === word[0].toUpperCase()) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
  }

  replaceAll(input, dict, isHighlighted) {
    let output = input;

    // sort keys by length so multi-word/longer phrases are replaced first
    const entries = Object.entries(dict).sort(
      (a, b) => b[0].length - a[0].length,
    );

    for (const [k, v] of entries) {
      const keyLower = k.toLowerCase();
      let search = output.toLowerCase();
      let pos = search.indexOf(keyLower);

      while (pos !== -1) {
        const match = output.substr(pos, k.length);

        // check word boundaries: left and right must be non-letter (or start/end)
        const before = pos === 0 ? " " : output[pos - 1];
        const after =
          pos + k.length >= output.length ? " " : output[pos + k.length];
        if (/[a-z]/i.test(before) || /[a-z]/i.test(after)) {
          // skip if embedded in a larger word
          pos = search.indexOf(keyLower, pos + 1);
          continue;
        }

        let rep = this.preserveCase(match, v);
        if (isHighlighted) {
          rep = `<span class="highlight">${rep}</span>`;
        }

        output = output.slice(0, pos) + rep + output.slice(pos + k.length);
        search = output.toLowerCase();
        pos = search.indexOf(keyLower, pos + rep.length);
      }
    }

    return output;
  }

  handleTime(input, from, to, isHighlighted) {
    const regex = new RegExp(`\\b(\\d{1,2})\\${from}(\\d{2})\\b`, "g");
    return input.replace(regex, (m, h, m2) => {
      let rep = `${h}${to}${m2}`;
      if (isHighlighted) rep = `<span class="highlight">${rep}</span>`;
      return rep;
    });
  }

  toBritish(input, isHighlighted = true) {
    let out = this.sanitize(input);
    out = this.handleTime(out, ":", ".", isHighlighted);
    out = this.replaceAll(out, this.americanOnly, isHighlighted);
    out = this.replaceAll(out, this.americanSpelling, isHighlighted);
    out = this.replaceAll(out, this.americanTitles, isHighlighted);
    return out === input ? "Everything looks good to me!" : out;
  }

  toAmerican(input, isHighlighted = true) {
    let out = this.sanitize(input);
    out = this.handleTime(out, ".", ":", isHighlighted);
    out = this.replaceAll(out, this.britishOnly, isHighlighted);
    out = this.replaceAll(out, this.britishToAmericanSpelling, isHighlighted);
    out = this.replaceAll(out, this.britishToAmericanTitles, isHighlighted);
    return out === input ? "Everything looks good to me!" : out;
  }
}

module.exports = Translator;
