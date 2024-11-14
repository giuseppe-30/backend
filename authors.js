const express = require("express");
const authors = express.Router();
const authorModel = require("./authorModel");
const fileUploadMiddleware = require("./middlewares/multer");

authors.get("/author", async (req, res) => {
  try {
    const authorResult = await authorModel.find();
    if (authorResult.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "author not faund",
      });
    }
    res.status(200).send({
      statusCode: 200,
      authors: authorResult,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "oops",
    });
  }
});

authors.post("/authors/create", async (req, res) => {
  console.log(req.body);

  try {
    const newAuthor = await authorModel.create(req.body);

    res.status(201);
    res.send({
      statusCode: 201,
      message: "user save connecton  successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "oops",
    });
  }
});

authors.patch(
  "/author/update/:id",
  fileUploadMiddleware,
  async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        statusCode: 400,
        message: "id è richesto",
      });
    }

    const userPresent = await authorModel.findById(id);
    if (!userPresent) {
      return res.status(400).send({
        statusCode: 400,
        message: "user non trovato  con id richesto",
      });
    }
    try {
      const updateAuthor = req.body;
      const options = { new: true };
      const result = await authorModel.findByIdAndUpdate(
        id,
        { ...updateAuthor, avatar: req.file.path },
        options
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

authors.delete("/users/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      statusCode: 400,
      message: "id è richesto",
    });
  }
  try {
    const user = await authorModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "user non trovato con id  richesto",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "user cancellato",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authors;
