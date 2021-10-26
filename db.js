const mongoose = require("mongoose");
require('dotenv').config();
const mongoUrl = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("mongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;