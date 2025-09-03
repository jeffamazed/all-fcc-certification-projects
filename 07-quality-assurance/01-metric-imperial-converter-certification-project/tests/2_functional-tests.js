const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Convert API: Handling Valid and Invalid Inputs", function () {
    test("Convert a valid input such as 50L: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=50L")
        .end(function (err, res) {
          if (err) return done(err);

          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 50);
          assert.equal(res.body.initUnit, "L");
          assert.approximately(res.body.returnNum, 13.20861, 0.00001);
          assert.equal(res.body.returnUnit, "gal");
          assert.equal(
            res.body.string,
            "50 liters converts to 13.20861 gallons",
          );

          done();
        });
    });

    test("Convert an invalid input such as 100g: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=100g")
        .end(function (err, res) {
          if (err) return done(err);

          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid unit");
          done();
        });
    });

    test("Convert an invalid number such as 2/5.2/3kg: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=2/5.2/3kg")
        .end(function (err, res) {
          if (err) return done(err);

          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number");
          done();
        });
    });

    test("Convert an invalid number AND unit such as 3/2.2/3kilomegagramlicious: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3/2.2/3kilomegagramlicious")
        .end(function (err, res) {
          if (err) return done(err);

          assert.equal(res.status, 200);
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });

    test("Convert with no number such as mi: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=mi")
        .end(function (err, res) {
          if (err) return done(err);

          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "mi");
          assert.approximately(res.body.returnNum, 1.60934, 0.00001);
          assert.equal(res.body.returnUnit, "km");
          assert.equal(
            res.body.string,
            "1 miles converts to 1.60934 kilometers",
          );

          done();
        });
    });
  });
});
