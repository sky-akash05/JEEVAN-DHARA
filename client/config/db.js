const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    // Connect to MongoDB using the MONGO_URL environment variable
    await mongoose.connect(process.env.MONGO_URL);

    // Log a success message with the connected MongoDB host using colors
    console.log(
      `Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    // Log an error message if MongoDB connection fails
    console.log(`MongoDB Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
