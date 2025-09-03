/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";
const Book = require("../models/Book");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (req, res) {
      try {
        const books = await Book.find({});

        res.status(200).json(books);
      } catch (err) {
        console.error("error in get", err);
        res.status(500).send("Internal server error");
      }
    })

    .post(async function (req, res) {
      try {
        const title = req.body?.title?.trim();

        if (!title) {
          return res.status(200).send("missing required field title");
        }

        const newBook = await Book.create({
          title,
        });

        res.status(201).json(newBook);
      } catch (err) {
        console.error("error in post", err);
        res.status(500).send("Internal server error");
      }
    })

    .delete(async function (req, res) {
      try {
        await Book.deleteMany({});

        res.status(200).send("complete delete successful");
      } catch (err) {
        console.error("error in delete all books", err);
        res.status(500).send("Internal server error");
      }
    });

  app
    .route("/api/books/:id")
    .get(async function (req, res) {
      try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);
        if (!book) {
          return res.status(200).send("no book exists");
        }

        res.status(200).json(book);
      } catch (err) {
        console.err("error in get single book", err);
        res.status(500).send("Internal server error");
      }
    })

    .post(async function (req, res) {
      try {
        const bookId = req.params.id;
        const comment = req.body?.comment?.trim();

        if (!comment) {
          return res.status(200).send("missing required field comment");
        }

        const updatedBook = await Book.findByIdAndUpdate(
          bookId,
          { $push: { comments: comment } },
          { new: true },
        );

        if (!updatedBook) {
          return res.status(200).send("no book exists");
        }

        res.status(200).json(updatedBook);
      } catch (err) {
        console.error("error in post comment", err);
        res.status(500).send("Internal server error");
      }
    })

    .delete(async function (req, res) {
      try {
        const bookId = req.params.id;

        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
          return res.status(200).send("no book exists");
        }

        res.status(200).send("delete successful");
      } catch (err) {
        console.error("error in delete book", err);
        res.status(500).send("Internal server error");
      }
    });
};
