const express = require("express");
const comment = express.Router();
const commentiModel = require("../CommentiModel");

comment.post("/commento/book", async (req, res) => {
  const newCommrnto = commentiModel({
    author: req.body.author,
    rate: req.body.rate,
    comment: req.body.comment,
  });
  try {
    const comment = await newCommrnto.save();
    res.status(201).send({
      statusCode: 201,
      message: "comment save connecton successfully",
      comment,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "errore",
    });
  }
});

comment.get("/comment", async (req, res) => {
  try {
    const comments = await commentiModel.find();
    if (comments.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Comment not faund",
      });
    }
    res.status(200).send({
      statusCode: 200,
      comments,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "oops",
    });
  }
});

module.exports = comment;
