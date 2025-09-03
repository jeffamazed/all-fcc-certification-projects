/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");
const mongoose = require("mongoose");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (err, res) {
        if (err) return done(err);

        assert.equal(res.status, 200);
        assert.equal(res.type, "application/json");
        assert.isArray(res.body, "response should be an array");
        assert.property(
          res.body[0],
          "commentcount",
          "Books in array should contain commentcount",
        );
        assert.property(
          res.body[0],
          "title",
          "Books in array should contain title",
        );
        assert.property(
          res.body[0],
          "_id",
          "Books in array should contain _id",
        );
        done();
      });
  });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function () {
    suite(
      "POST /api/books with title => create book object/expect book object",
      function () {
        test("Test POST /api/books with title", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({
              title: "my test book",
            })
            .end(function (err, res) {
              if (err) return done(err);

              const body = res.body;
              assert.equal(res.status, 201);
              assert.equal(res.type, "application/json");
              assert.isObject(body, "Body should be an object");
              assert.property(body, "title", "Body should contain a title");
              assert.property(
                body,
                "comments",
                "Body should contain an array of comments",
              );
              assert.property(body, "_id", "Body should contain an _id");
              assert.property(
                body,
                "commentcount",
                "Body should contain a commentcount",
              );

              assert.equal(body.title, "my test book");
              assert.isArray(body.comments, "Comments should be an array");
              assert.isNumber(
                body.commentcount,
                "Commentcount should be a number",
              );
              done();
            });
        });

        test("Test POST /api/books with no title given", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({})
            .end(function (err, res) {
              if (err) return done(err);

              assert.equal(res.status, 200);
              assert.equal(res.type, "text/html");
              assert.equal(res.text, "missing required field title");
              done();
            });
        });
      },
    );

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function (err, res) {
            if (err) return done(err);

            const body = res.body;
            assert.equal(res.status, 200);
            assert.equal(res.type, "application/json");

            assert.isArray(body, "Body should be an array");
            assert.property(body[0], "_id", "First book has to contain an _id");
            assert.property(
              body[0],
              "title",
              "First book has to contain a title",
            );
            assert.property(
              body[0],
              "comments",
              "First book has to contain comments",
            );
            assert.isArray(body[0].comments, "Comments has to be an array");
            assert.property(
              body[0],
              "commentcount",
              "First book has to contain commentcount",
            );
            assert.isNumber(
              body[0].commentcount,
              "Commentcount has to be a number",
            );
            done();
          });
      });
    });

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai
          .request(server)
          .post("/api/books/")
          .send({ title: "temp title 2" })
          .end(function (err, postRes) {
            if (err) return done(err);

            const randomBookId = new mongoose.Types.ObjectId().toString();

            chai
              .request(server)
              .get(`/api/books/${randomBookId}`)
              .end(function (err, res) {
                if (err) return done(err);

                assert.equal(res.status, 200);
                assert.equal(res.type, "text/html");
                assert.equal(res.text, "no book exists");

                done();
              });
          });
      });

      test("Test GET /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .post("/api/books/")
          .send({ title: "temp title" })
          .end(function (err, postRes) {
            if (err) return done(err);

            const postResBody = postRes.body;
            const bookId = postResBody._id;
            const title = postResBody.title;
            const comments = postResBody.comments;
            const commentcount = postResBody.commentcount;

            chai
              .request(server)
              .get(`/api/books/${bookId}`)
              .end(function (err, res) {
                if (err) return done(err);

                const body = res.body;
                assert.equal(res.status, 200);
                assert.equal(res.type, "application/json");
                assert.isObject(body, "Body should be an object");
                assert.equal(body._id, bookId);
                assert.equal(body.title, title);
                assert.deepEqual(body.comments, comments);
                assert.isArray(body.comments, "Comments should be an array");
                assert.isNumber(
                  body.commentcount,
                  "Commentcount should be a number",
                );
                assert.equal(body.commentcount, commentcount);

                done();
              });
          });
      });
    });

    suite(
      "POST /api/books/[id] => add comment/expect book object with id",
      function () {
        test("Test POST /api/books/[id] with comment", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({ title: "temp title 3" })
            .end(function (err, postRes) {
              if (err) return done(err);

              const postResBody = postRes.body;
              const bookId = postResBody._id;
              const title = postResBody.title;
              const comment = "test comment";

              chai
                .request(server)
                .post(`/api/books/${bookId}`)
                .send({ comment })
                .end(function (err, res) {
                  if (err) return done(err);

                  const body = res.body;
                  assert.equal(res.status, 200);
                  assert.equal(res.type, "application/json");
                  assert.isObject(body, "Body should be an object");
                  assert.equal(body._id, bookId);
                  assert.equal(body.title, title);
                  assert.isArray(body.comments, "Comments should be an array");
                  assert.deepEqual(body.comments, [comment]);
                  assert.isNumber(
                    body.commentcount,
                    "Commentcount should be a number",
                  );
                  assert.equal(body.commentcount, 1);

                  done();
                });
            });
        });

        test("Test POST /api/books/[id] without comment field", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({ title: "temp title 4" })
            .end(function (err, postRes) {
              if (err) return done(err);

              const postResBody = postRes.body;
              const bookId = postResBody._id;

              chai
                .request(server)
                .post(`/api/books/${bookId}`)
                .send({})
                .end(function (err, res) {
                  if (err) return done(err);

                  const body = res.body;
                  assert.equal(res.status, 200);
                  assert.equal(res.type, "text/html");
                  assert.equal(res.text, "missing required field comment");

                  done();
                });
            });
        });

        test("Test POST /api/books/[id] with comment, id not in db", function (done) {
          chai
            .request(server)
            .post("/api/books")
            .send({ title: "temp title 5" })
            .end(function (err, postRes) {
              if (err) return done(err);

              const randomBookId = new mongoose.Types.ObjectId().toString();

              chai
                .request(server)
                .post(`/api/books/${randomBookId}`)
                .send({
                  comment: "test comment",
                })
                .end(function (err, res) {
                  if (err) return done(err);

                  const body = res.body;
                  assert.equal(res.status, 200);
                  assert.equal(res.type, "text/html");
                  assert.equal(res.text, "no book exists");

                  done();
                });
            });
        });
      },
    );

    suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "temp title 6" })
          .end(function (err, postRes) {
            if (err) return done(err);

            const postResBody = postRes.body;
            const bookId = postResBody._id;

            chai
              .request(server)
              .delete(`/api/books/${bookId}`)

              .end(function (err, res) {
                if (err) return done(err);

                const body = res.body;
                assert.equal(res.status, 200);
                assert.equal(res.type, "text/html");
                assert.equal(res.text, "delete successful");

                done();
              });
          });
      });

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "temp title 7" })
          .end(function (err, postRes) {
            if (err) return done(err);

            const randomBookId = new mongoose.Types.ObjectId().toString();

            chai
              .request(server)
              .delete(`/api/books/${randomBookId}`)
              .end(function (err, res) {
                if (err) return done(err);

                const body = res.body;
                assert.equal(res.status, 200);
                assert.equal(res.type, "text/html");
                assert.equal(res.text, "no book exists");

                done();
              });
          });
      });
    });
  });
});
