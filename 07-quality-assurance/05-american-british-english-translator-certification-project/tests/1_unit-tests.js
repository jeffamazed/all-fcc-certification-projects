const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const myTranslator = new Translator();

suite("Unit Tests", () => {
  suite("American to British English", function () {
    test(`Translate "Mangoes are my favorite fruit."`, function () {
      assert.typeOf(
        myTranslator.toBritish("Mangoes are my favorite fruit.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("Mangoes are my favorite fruit.", false),
      );
      assert.equal(
        myTranslator.toBritish("Mangoes are my favorite fruit.", false),
        "Mangoes are my favourite fruit.",
      );
    });

    test(`Translate "I ate yogurt for breakfast."`, function () {
      assert.typeOf(
        myTranslator.toBritish("I ate yogurt for breakfast.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("I ate yogurt for breakfast.", false),
      );
      assert.equal(
        myTranslator.toBritish("I ate yogurt for breakfast.", false),
        "I ate yoghurt for breakfast.",
      );
    });

    test(`Translate "We had a party at my friend's condo."`, function () {
      assert.typeOf(
        myTranslator.toBritish("We had a party at my friend's condo.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("We had a party at my friend's condo.", false),
      );
      assert.equal(
        myTranslator.toBritish("We had a party at my friend's condo.", false),
        "We had a party at my friend's flat.",
      );
    });

    test(`Translate "Can you toss this in the trashcan for me?"`, function () {
      assert.typeOf(
        myTranslator.toBritish(
          "Can you toss this in the trashcan for me?",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish(
          "Can you toss this in the trashcan for me?",
          false,
        ),
      );
      assert.equal(
        myTranslator.toBritish(
          "Can you toss this in the trashcan for me?",
          false,
        ),
        "Can you toss this in the bin for me?",
      );
    });

    test(`Translate "The parking lot was full."`, function () {
      assert.typeOf(
        myTranslator.toBritish("The parking lot was full.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("The parking lot was full.", false),
      );
      assert.equal(
        myTranslator.toBritish("The parking lot was full.", false),
        "The car park was full.",
      );
    });

    test(`Translate "Like a high tech Rube Goldberg machine."`, function () {
      assert.typeOf(
        myTranslator.toBritish(
          "Like a high tech Rube Goldberg machine.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish(
          "Like a high tech Rube Goldberg machine.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toBritish(
          "Like a high tech Rube Goldberg machine.",
          false,
        ),
        "Like a high tech Heath Robinson device.",
      );
    });

    test(`Translate "To play hooky means to skip class or work."`, function () {
      assert.typeOf(
        myTranslator.toBritish(
          "To play hooky means to skip class or work.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish(
          "To play hooky means to skip class or work.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toBritish(
          "To play hooky means to skip class or work.",
          false,
        ),
        "To bunk off means to skip class or work.",
      );
    });

    test(`Translate "No Mr. Bond, I expect you to die."`, function () {
      assert.typeOf(
        myTranslator.toBritish("No Mr. Bond, I expect you to die.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("No Mr. Bond, I expect you to die.", false),
      );
      assert.equal(
        myTranslator.toBritish("No Mr. Bond, I expect you to die.", false),
        "No Mr Bond, I expect you to die.",
      );
    });

    test(`ranslate "Dr. Grosh will see you now."`, function () {
      assert.typeOf(
        myTranslator.toBritish("Dr. Grosh will see you now.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("Dr. Grosh will see you now.", false),
      );
      assert.equal(
        myTranslator.toBritish("Dr. Grosh will see you now.", false),
        "Dr Grosh will see you now.",
      );
    });

    test(`Translate "Lunch is at 12:15 today."`, function () {
      assert.typeOf(
        myTranslator.toBritish("Lunch is at 12:15 today.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("Lunch is at 12:15 today.", false),
      );
      assert.equal(
        myTranslator.toBritish("Lunch is at 12:15 today.", false),
        "Lunch is at 12.15 today.",
      );
    });
  });

  suite("British to American English", function () {
    test(`Translate "We watched the footie match for a while."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "We watched the footie match for a while.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "We watched the footie match for a while.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "We watched the footie match for a while.",
          false,
        ),
        "We watched the soccer match for a while.",
      );
    });

    test(`Translate "Paracetamol takes up to an hour to work."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "Paracetamol takes up to an hour to work.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "Paracetamol takes up to an hour to work.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "Paracetamol takes up to an hour to work.",
          false,
        ),
        "Tylenol takes up to an hour to work.",
      );
    });

    test(`Translate "First, caramelise the onions."`, function () {
      assert.typeOf(
        myTranslator.toAmerican("First, caramelise the onions.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican("First, caramelise the onions.", false),
      );
      assert.equal(
        myTranslator.toAmerican("First, caramelise the onions.", false),
        "First, caramelize the onions.",
      );
    });

    test(`Translate "I spent the bank holiday at the funfair."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "I spent the bank holiday at the funfair.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "I spent the bank holiday at the funfair.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "I spent the bank holiday at the funfair.",
          false,
        ),
        "I spent the public holiday at the carnival.",
      );
    });

    test(`Translate "I had a bicky then went to the chippy."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "I had a bicky then went to the chippy.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "I had a bicky then went to the chippy.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "I had a bicky then went to the chippy.",
          false,
        ),
        "I had a cookie then went to the fish-and-chip shop.",
      );
    });

    test(`Translate "I've just got bits and bobs in my bum bag."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "I've just got bits and bobs in my bum bag.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "I've just got bits and bobs in my bum bag.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "I've just got bits and bobs in my bum bag.",
          false,
        ),
        "I've just got odds and ends in my fanny pack.",
      );
    });

    test(`Translate "The car boot sale at Boxted Airfield was called off."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "The car boot sale at Boxted Airfield was called off.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "The car boot sale at Boxted Airfield was called off.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "The car boot sale at Boxted Airfield was called off.",
          false,
        ),
        "The swap meet at Boxted Airfield was called off.",
      );
    });

    test(`Translate "Have you met Mrs Kalyani?"`, function () {
      assert.typeOf(
        myTranslator.toAmerican("Have you met Mrs Kalyani?", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican("Have you met Mrs Kalyani?", false),
      );
      assert.equal(
        myTranslator.toAmerican("Have you met Mrs Kalyani?", false),
        "Have you met Mrs. Kalyani?",
      );
    });

    test(`Translate "Prof Joyner of King's College, London."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "Prof Joyner of King's College, London.",
          false,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "Prof Joyner of King's College, London.",
          false,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "Prof Joyner of King's College, London.",
          false,
        ),
        "Prof. Joyner of King's College, London.",
      );
    });

    test(`Translate "Tea time is usually around 4 or 4.30."`, function () {
      assert.typeOf(
        myTranslator.toAmerican("Tea time is usually around 4 or 4.30.", false),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican("Tea time is usually around 4 or 4.30.", false),
      );
      assert.equal(
        myTranslator.toAmerican("Tea time is usually around 4 or 4.30.", false),
        "Tea time is usually around 4 or 4:30.",
      );
    });
  });

  suite("Highlight translation", function () {
    test(`Highlight translation in "Mangoes are my favorite fruit."`, function () {
      assert.typeOf(
        myTranslator.toBritish("Mangoes are my favorite fruit.", true),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("Mangoes are my favorite fruit.", true),
      );
      assert.equal(
        myTranslator.toBritish("Mangoes are my favorite fruit.", true),
        `Mangoes are my <span class="highlight">favourite</span> fruit.`,
      );
    });

    test(`Highlight translation in "I ate yogurt for breakfast."`, function () {
      assert.typeOf(
        myTranslator.toBritish("I ate yogurt for breakfast.", true),
        "string",
      );
      assert.isDefined(
        myTranslator.toBritish("I ate yogurt for breakfast.", true),
      );
      assert.equal(
        myTranslator.toBritish("I ate yogurt for breakfast.", true),
        `I ate <span class="highlight">yoghurt</span> for breakfast.`,
      );
    });

    test(`Highlight translation in "We watched the footie match for a while."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "We watched the footie match for a while.",
          true,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "We watched the footie match for a while.",
          true,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "We watched the footie match for a while.",
          true,
        ),
        `We watched the <span class="highlight">soccer</span> match for a while.`,
      );
    });

    test(`Highlight translation in "Paracetamol takes up to an hour to work."`, function () {
      assert.typeOf(
        myTranslator.toAmerican(
          "Paracetamol takes up to an hour to work.",
          true,
        ),
        "string",
      );
      assert.isDefined(
        myTranslator.toAmerican(
          "Paracetamol takes up to an hour to work.",
          true,
        ),
      );
      assert.equal(
        myTranslator.toAmerican(
          "Paracetamol takes up to an hour to work.",
          true,
        ),
        `<span class="highlight">Tylenol</span> takes up to an hour to work.`,
      );
    });
  });
});
