const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Database");
  } catch (err) {
    console.log("DB connection cannot be established. Exiting");
    console.log("Error: ***********************************************");
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
