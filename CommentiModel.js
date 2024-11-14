const mongoose = require("mongoose");

const commentModel = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },

  {
    timeseries: true,
    strict: true,
  }
);
module.exports = mongoose.model("commentiModel", commentModel, "commenti");
