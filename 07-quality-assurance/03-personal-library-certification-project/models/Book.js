const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 1,
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

BookSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// to include virtuals and remove __v
BookSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  },
});
BookSchema.set("toObject", { virtuals: true });

const Book = model("Book", BookSchema);

module.exports = Book;
