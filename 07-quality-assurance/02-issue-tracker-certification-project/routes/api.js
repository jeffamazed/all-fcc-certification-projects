"use strict";
const Issue = require("../models/Issue");

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(async function (req, res) {
      try {
        const project = req.params.project;

        let filter = { project };

        // loop through all query
        for (let key in req.query) {
          if (key === "open") {
            filter.open = req.query.open === "true";
          } else {
            filter[key] = req.query[key];
          }
        }

        const issues = await Issue.find(filter).select("-__v");

        res.status(200).json(issues);
      } catch (err) {
        console.error("get route error", err);
        res.status(500).json({ error: "Internal server error" });
      }
    })

    .post(async function (req, res) {
      try {
        const project = req.params.project;
        const {
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
        } = req.body;

        if (
          !issue_title?.trim() ||
          !issue_text?.trim() ||
          !created_by?.trim()
        ) {
          return res.status(200).json({ error: "required field(s) missing" });
        }

        const newIssue = await Issue.create({
          issue_title,
          issue_text,
          created_by,
          assigned_to,
          status_text,
          project,
        });

        res.status(201).json(newIssue);
      } catch (err) {
        console.error("post route error", err);
        res.status(500).json({ error: "Internal server error" });
      }
    })

    .put(async function (req, res) {
      try {
        const { _id, open, ...fieldsToUpdate } = req.body;

        if (!_id) {
          return res.status(200).json({ error: "missing _id" });
        }
        if (Object.keys(fieldsToUpdate).length === 0 && open === undefined) {
          return res
            .status(200)
            .json({ error: "no update field(s) sent", _id });
        }

        const updatedIssue = await Issue.findByIdAndUpdate(
          _id,
          { open: open === "true", ...fieldsToUpdate },
          {
            new: true,
          },
        );
        if (!updatedIssue) {
          return res.status(200).json({ error: "could not update", _id });
        }

        res.json({ result: "successfully updated", _id });
      } catch (err) {
        console.error("error in put", err);
        res.status(500).json({ error: "Internal server error" });
      }
    })

    .delete(async function (req, res) {
      try {
        const { _id } = req.body;

        if (!_id) {
          return res.status(200).json({ error: "missing _id" });
        }

        const deletedIssue = await Issue.findByIdAndDelete(_id);
        if (!deletedIssue) {
          return res.status(200).json({ error: "could not delete", _id });
        }

        res.status(200).json({ result: "successfully deleted", _id });
      } catch (err) {
        console.error("error in delete", err);
        res.status(500).json({ error: "Internal server error" });
      }
    });
};
