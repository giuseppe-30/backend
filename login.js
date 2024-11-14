const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./UsersModels");
const login = express.Router();

login.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        statusCode: 404,
        message: "user Not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).send({
        statusCode: 401,
        message: "password o email not valid",
      });
    }

    const token = jwt.sign(
      {
        name: user.name,
        surname: user.username,
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60m",
      }
    );
    res
      .header("Auth", token)
      .status(200)
      .send({
        statusCode: 200,
        message: "you are logged",
        token: token,
        user: {
          name: user.name,
          surname: user.username,
          email: user.email,
          _id: user._id,
        },
      });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: error.message,
    });
  }
});
