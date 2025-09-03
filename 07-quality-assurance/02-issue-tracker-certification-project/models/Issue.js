const { Schema, model } = require("mongoose");

const IssueSchema = new Schema(
  {
    issue_title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    issue_text: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    created_by: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    assigned_to: {
      type: String,
      trim: true,
      default: "",
    },
    status_text: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

const Issue = model("Issue", IssueSchema);

module.exports = Issue;
