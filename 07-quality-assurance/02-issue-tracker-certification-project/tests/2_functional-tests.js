const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("API Testing on /api/issues", function () {
    test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .post("/api/issues/testproject")
        .send({
          issue_title: "test title",
          issue_text: "test text",
          created_by: "jeffamazed",
          assigned_to: "ponda",
          status_text: "test status",
        })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 201);
          assert.equal(res.type, "application/json");
          assert.equal(body.issue_title, "test title");
          assert.equal(body.issue_text, "test text");
          assert.equal(body.created_by, "jeffamazed");
          assert.equal(body.assigned_to, "ponda");
          assert.equal(body.status_text, "test status");

          assert.exists(body.created_on, "created_on exists");
          assert.exists(body.updated_on, "updated_on exists");

          assert.match(
            new Date(body.created_on).toISOString(),
            /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
          );
          assert.match(
            new Date(body.updated_on).toISOString(),
            /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
          );
          done();
        });
    });

    test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .post("/api/issues/testproject2")
        .send({
          issue_title: "test title",
          issue_text: "test text",
          created_by: "jeffamazed",
        })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 201);
          assert.equal(res.type, "application/json");
          assert.equal(body.issue_title, "test title");
          assert.equal(body.issue_text, "test text");
          assert.equal(body.created_by, "jeffamazed");
          assert.equal(body.assigned_to, "");
          assert.equal(body.status_text, "");

          assert.exists(body.created_on, "created_on exists");
          assert.exists(body.updated_on, "updated_on exists");

          assert.match(
            new Date(body.created_on).toISOString(),
            /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
          );
          assert.match(
            new Date(body.updated_on).toISOString(),
            /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,
          );
          done();
        });
    });

    test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .post("/api/issues/testproject3")
        .send({})
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.equal(body.error, "required field(s) missing");

          done();
        });
    });

    test("View issues on a project: GET request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .get("/api/issues/testproject")
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.exists(body, "body with an array of issues exists");

          assert.isArray(body, "body should be an array");

          body.forEach((issue) => {
            assert.isObject(issue, "each issue should be an object");
          });
          done();
        });
    });

    test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .get("/api/issues/testproject?open=true")
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.exists(body, "body with an array of issues exists");

          assert.isArray(body, "body should be an array");

          body.forEach((issue) => {
            assert.isObject(issue, "each issue should be an object");
            assert.equal(issue.open, true);
          });

          done();
        });
    });

    test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .get("/api/issues/testproject?open=true&assigned_to=ponda")
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(res.type, "application/json");
          assert.exists(body, "body with an array of issues exists");

          assert.isArray(body, "body should be an array");

          body.forEach((issue) => {
            assert.isObject(issue, "each issue should be an object");
            assert.equal(issue.open, true);
            assert.equal(issue.assigned_to, "ponda");
          });

          done();
        });
    });

    test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .put("/api/issues/testproject")
        .send({
          _id: "68b7b019694ecc35c4c51312",
          issue_title: "updated issue title",
        })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(body.result, "successfully updated");
          assert.equal(body._id, "68b7b019694ecc35c4c51312");

          done();
        });
    });

    test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .put("/api/issues/testproject")
        .send({
          _id: "68b7b1181d9231ce80e03e4b",
          issue_title: "updated issue title",
          issue_text: "updated issue text",
          created_by: "johndoe",
        })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(body.result, "successfully updated");
          assert.equal(body._id, "68b7b1181d9231ce80e03e4b");

          done();
        });
    });

    test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .put("/api/issues/testproject")
        .send({
          issue_title: "updated issue title",
        })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(body.error, "missing _id");

          done();
        });
    });

    test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .put("/api/issues/testproject")
        .send({
          _id: "68b7b17d84d98e1a1cc9156b",
        })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(body.error, "no update field(s) sent");
          assert.equal(body._id, "68b7b17d84d98e1a1cc9156b");

          done();
        });
    });

    test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .put("/api/issues/testproject")
        .send({
          _id: "68b7b234888defff5ef68a8a",
          issue_title: "updated issue title",
        })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(body.error, "could not update");
          assert.equal(body._id, "68b7b234888defff5ef68a8a");

          done();
        });
    });

    test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .post("/api/issues/testproject")
        .send({
          issue_title: "temp issue",
          issue_text: "for deletion purporses",
          created_by: "tester",
        })
        .end(function (err, postRes) {
          if (err) return done(err);

          const idToDelete = postRes.body._id;

          chai
            .request(server)
            .delete("/api/issues/testproject")
            .send({ _id: idToDelete })
            .end(function (err, res) {
              if (err) return done(err);

              const body = res.body;
              assert.equal(res.status, 200);
              assert.equal(body.result, "successfully deleted");
              assert.equal(body._id, idToDelete);

              done();
            });
        });
    });

    test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .delete("/api/issues/testproject")
        .send({ _id: "68b7b2400476ab40bdf68905" })
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;
          assert.equal(res.status, 200);
          assert.equal(body.error, "could not delete");
          assert.equal(body._id, "68b7b2400476ab40bdf68905");

          done();
        });
    });

    test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
      chai
        .request(server)
        .delete("/api/issues/testproject")
        .send({})
        .end(function (err, res) {
          if (err) return done(err);

          const body = res.body;

          assert.equal(res.status, 200);
          assert.equal(body.error, "missing _id");

          done();
        });
    });
  });
});
