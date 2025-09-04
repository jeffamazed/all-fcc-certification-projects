const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", function () {
  this.timeout(5000);

  suite("POST /api/translate => Translation input handling", () => {
    test("Translation with text and locale fields: POST request to /api/translate", (done) => {
      const text =
        "I watched the soccer game from the apartment’s parking lot and realized my favorite color is gray.";
      const translation = `I watched the <span class="highlight">football</span> game from the apartment’s <span class="highlight">car park</span> and <span class="highlight">realised</span> my <span class="highlight">favourite</span> <span class="highlight">colour</span> is <span class="highlight">grey</span>.`;

      chai
        .request(server)
        .post("/api/translate")
        .send({
          text,
          locale: "american-to-british",
        })
        .end((err, res) => {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.isObject(body, "Body should be an object");
          assert.property(body, "text", "Body should have a text property");
          assert.property(
            body,
            "translation",
            "Body should have a translation property",
          );
          assert.equal(body.text, text);
          assert.equal(body.translation, translation);
          done();
        });
    });

    test("Translation with text and invalid locale field: POST request to /api/translate", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "My favorite color is gray.",
          locale: "indonesian-to-american",
        })
        .end((err, res) => {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.isObject(body, "Body should be an object");
          assert.property(body, "error", "Body should have an error property");

          assert.equal(body.error, "Invalid value for locale field");
          done();
        });
    });

    test("Translation with missing text field: POST request to /api/translate", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          locale: "american-to-british",
        })
        .end((err, res) => {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.isObject(body, "Body should be an object");
          assert.property(body, "error", "Body should have an error property");

          assert.equal(body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with missing locale field: POST request to /api/translate", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "Mangoes are my favorite fruit.",
        })
        .end((err, res) => {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.isObject(body, "Body should be an object");
          assert.property(body, "error", "Body should have an error property");

          assert.equal(body.error, "Required field(s) missing");
          done();
        });
    });

    test("Translation with empty text: POST request to /api/translate", (done) => {
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text: "",
          locale: "british-to-american",
        })
        .end((err, res) => {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.isObject(body, "Body should be an object");
          assert.property(body, "error", "Body should have an error property");

          assert.equal(body.error, "No text to translate");
          done();
        });
    });

    test("Translation with text that needs no translation: POST request to /api/translate", (done) => {
      const text = "The cat is sleeping on the chair.";
      chai
        .request(server)
        .post("/api/translate")
        .send({
          text,
          locale: "american-to-british",
        })
        .end((err, res) => {
          if (err) return done(err);
          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.isObject(body, "Body should be an object");
          assert.property(body, "text", "Body should have text property");
          assert.property(
            body,
            "translation",
            "Body should have a translation property",
          );
          assert.equal(body.text, text);
          assert.equal(body.translation, "Everything looks good to me!");

          chai
            .request(server)
            .post("/api/translate")
            .send({
              text,
              locale: "british-to-american",
            })
            .end((err, res) => {
              if (err) return done(err);
              const body = res.body;
              assert.equal(res.status, 200);
              assert.equal(res.type, "application/json");
              assert.isObject(body, "Body should be an object");
              assert.property(body, "text", "Body should have text property");
              assert.property(
                body,
                "translation",
                "Body should have a translation property",
              );
              assert.equal(body.text, text);
              assert.equal(body.translation, "Everything looks good to me!");

              done();
            });
        });
    });
  });
});
