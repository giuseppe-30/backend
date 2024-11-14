const mongoose = require("mongoose");
require("dotenv").config();

const init = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    const DB = mongoose;
    console.log("connecton database successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = init;
