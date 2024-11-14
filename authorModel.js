const mongoose = require("mongoose");
const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    bookIds: {
      type: [Number],
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);
module.exports = mongoose.model("authorModel", authorSchema, "author");
