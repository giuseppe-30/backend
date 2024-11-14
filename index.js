const express = require("express");
const usersRoutes = require("./routers/users");
const booksRoutes = require("./routers/books");
const comment = require("./routers/CommentBooks");
const author = require("./authors");
const googleRoutes = require("./routers/google");

const cors = require("cors");
const init = require("./db");
const PORT = 4040;
require("dotenv").config();
const server = express();
const login = require("./login");

server.use(express.json());
server.use(cors());
server.use("/", usersRoutes);
server.use("/", booksRoutes);
server.use("/", comment);
server.use("/", author);
server.use("/", login);
server.use("/", googleRoutes);
init();
server.listen(PORT, () => console.log(`server of PORT${PORT}`));
