const mongoose = require("mongoose");

const booksModel = new mongoose.Schema(
  {
    asin: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      minLength: 2,
      trim: true,
    },
    description: {
      type: String,

      trim: true,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);
module.exports = mongoose.model("BooksModel", booksModel, "book");
