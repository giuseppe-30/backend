const mongoose = require("mongoose");
const AllowedGender = ["M", "F", "L", "G", "B", "T", "Not specified"];
const userSchema = new mongoose.Schema(
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
    dob: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    username: {
      type: String,
      minLength: 5,
      required: true,
    },
    gender: {
      type: String,
      enum: AllowedGender,
      required: false,
      default: "Not specified",
    },
    address: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);
module.exports = mongoose.model("userModel", userSchema, "user");
