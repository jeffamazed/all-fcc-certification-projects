const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);

  suite("POST /api/solve", function () {
    test("Solve a puzzle with valid puzzle string: POST request to /api/solve", function (done) {
      const validPuzzle =
        "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
      const validSolution =
        "135762984946381257728459613694517832812936745357824196473298561581673429269145378";

      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: validPuzzle })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.solution, validSolution);

          done();
        });
    });

    test("Solve a puzzle with missing puzzle string: POST request to /api/solve", function (done) {
      chai
        .request(server)
        .post("/api/solve")
        .send({})
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Required field missing");

          done();
        });
    });

    test("Solve a puzzle with invalid characters: POST request to /api/solve", function (done) {
      const invalidPuzzle =
        "82..4..6...16..89...98315.749.157........c...b53..4...96.415..81..7632..3...28.5a";

      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: invalidPuzzle })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Invalid characters in puzzle");

          done();
        });
    });

    test("Solve a puzzle with incorrect length: POST request to /api/solve", function (done) {
      const incorrectLengtPuzzle =
        ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.645.";

      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: incorrectLengtPuzzle })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Expected puzzle to be 81 characters long");

          done();
        });
    });

    test("Solve a puzzle that cannot be solved: POST request to /api/solve", function (done) {
      const unsolvablePuzzle =
        "535.7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";

      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: unsolvablePuzzle })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Puzzle cannot be solved");

          done();
        });
    });
  });

  suite("POST /api/check", function () {
    test("Check a puzzle placement with all fields: POST request to /api/check", function (done) {
      const puzzle =
        "82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51";
      const coordinate = "A3";
      const value = "5";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.valid, true);

          done();
        });
    });

    test("Check a puzzle placement with single placement conflict: POST request to /api/check", function (done) {
      const puzzle =
        ".7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6";
      const coordinate = "A1";
      const value = "1";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.valid, false);
          assert.equal(body.conflict[0], "column");

          done();
        });
    });

    test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", function (done) {
      const puzzle =
        "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1";
      const coordinate = "A1";
      const value = "4";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.valid, false);
          assert.equal(body.conflict[0], "column");
          assert.equal(body.conflict[1], "region");

          done();
        });
    });

    test("Check a puzzle placement with all placement conflicts: POST request to /api/check", function (done) {
      const puzzle =
        "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
      const coordinate = "B4";
      const value = "5";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.valid, false);
          assert.equal(body.conflict[0], "row");
          assert.equal(body.conflict[1], "column");
          assert.equal(body.conflict[2], "region");

          done();
        });
    });

    test("Check a puzzle placement with missing required fields: POST request to /api/check", function (done) {
      const puzzle =
        "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
      const coordinate = "B4";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Required field(s) missing");

          done();
        });
    });

    test("Check a puzzle placement with invalid characters: POST request to /api/check", function (done) {
      const puzzle =
        "5..91372.3...8.5.9.9a25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3";
      const coordinate = "B4";
      const value = "2";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Invalid characters in puzzle");

          done();
        });
    });

    test("Check a puzzle placement with incorrect length: POST request to /api/check", function (done) {
      const puzzle =
        "1.5..2.84..63.12.7.2..5.....9..1..3..8.2.3674.3.7.2..9.47...8..1..16....926914.37..";
      const coordinate = "B2";
      const value = "2";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Expected puzzle to be 81 characters long");

          done();
        });
    });

    test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", function (done) {
      const puzzle =
        "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";
      const coordinate = "Z2";
      const value = "2";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Invalid coordinate");

          done();
        });
    });

    test("Check a puzzle placement with invalid placement value: POST request to /api/check", function (done) {
      const puzzle =
        "..3.2.6..9..3.5..1..18.64..81.29..7.......8..67.82..26.95..8..2.3..9..5.1.3..";
      const coordinate = "A1";
      const value = "10";

      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle, coordinate, value })
        .end(function (err, res) {
          if (err) done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "Invalid value");

          done();
        });
    });
  });
});
