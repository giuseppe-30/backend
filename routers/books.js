const express = require("express");
const books = express.Router();
const booksModel = require("../BooksModel");
const { findByIdAndUpdate } = require("../UsersModels");

books.post("/books/create", async (req, res) => {
  const newBooks = new booksModel({
    asin: req.body.asin,
    title: req.body.title,
    img: req.body.img,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
  });
  try {
    const book = await newBooks.save();
    res.status(201).send({
      statusCode: 201,
      message: "book save connecton successfully",
      book,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "errore",
    });
  }
});

books.get("/get/books", async (req, res) => {
  try {
    const book = await booksModel.find();
    if (book.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "book not faund",
      });
    }
    res.status(200).send({
      statusCode: 200,
      book,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "errore",
    });
  }
});

books.patch("/book/serch/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      statusCode: 400,
      message: "id è richiesto",
    });
  }
  const booksPrestnt = await booksModel.findById(id);
  if (!booksPrestnt) {
    return res.status(400).send({
      statusCode: 400,
      message: "book non trovato con id richesto",
    });
  }
  try {
    const updateBooks = req.body;
    const options = { new: true };
    const result = await booksModel.findByIdAndUpdate(id, updateBooks, options);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

books.delete("/books/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      statusCode: 400,
      message: "id è richesto",
    });
  }
  try {
    const book = await booksModel.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send({
        statusCode: 404,
        message: "book non trovato con id  richesto",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "book cancellato",
    });
  } catch (error) {
    next(error);
  }
});

books.get("/book", async (req, res) => {
  const { Page, sizePage } = req.query;
  const books = await booksModel
    .find()
    .limit(sizePage)
    .skip((Page - 1) * sizePage);
  const totalBooks = await booksModel.countDocuments();
  const totalPages = Math.ceil(totalBooks / sizePage);
  if (books.length === 0) {
    return (
      res.status(404),
      send({
        statusCode: 404,
        message: "book Not found",
      })
    );
  }
  res.status(200).send({
    statusCode: 200,
    totalPages: totalPages,
    count: totalBooks,
    books,
  });
});

module.exports = books;
