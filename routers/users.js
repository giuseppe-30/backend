const express = require("express");
const users = express.Router();
const userModel = require("../UsersModels");

users.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) {
      return res.status(404).send({
        statusCode: 404,
        message: "Users not faund",
      });
    }
    res.status(200).send({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "oops",
    });
  }
});

users.post("/users/create", async (req, res) => {
  console.log(req.body);
  const newUsers = new userModel({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    dob: new Date(req.body.dob),
    password: req.body.password,
    username: req.body.username,
    gender: req.body.gender,
    address: req.body.address,
  });
  try {
    const user = await newUsers.save();
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

users.patch("/users/update/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      statusCode: 400,
      message: "id è richesto",
    });
  }

  const userPresent = await userModel.findById(id);
  if (!userPresent) {
    return res.status(400).send({
      statusCode: 400,
      message: "user non trovato  con id richesto",
    });
  }
  try {
    const updateUser = req.body;
    const options = { new: true };
    const result = await userModel.findByIdAndUpdate(id, updateUser, options);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

users.delete("/users/delete/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({
      statusCode: 400,
      message: "id è richesto",
    });
  }
  try {
    const user = await userModel.findByIdAndDelete(id);
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

module.exports = users;
