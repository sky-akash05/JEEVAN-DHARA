const userModel = require("../models/userModel"); // Importing the user model for database operations
const bcrypt = require("bcryptjs"); // Importing bcryptjs for password hashing
const jwt = require("jsonwebtoken"); // Importing jsonwebtoken for token generation

// Controller function for user registration
const registerController = async (req, res) => {
  try {
    // Checking if user with the same email already exists
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    // Hashing the password using bcrypt
    const salt = await bcrypt.genSalt(10); // Generating salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hashing the password
    req.body.password = hashedPassword; // Assigning hashed password back to req.body

    // Creating a new user instance with the request body data
    const user = new userModel(req.body);
    await user.save(); // Saving the user to the database

    // Sending a successful response with the registered user data
    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    // Handling errors: logging the error and sending a 500 Internal Server Error response
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// Controller function for user login
const loginController = async (req, res) => {
  try {
    // Finding user by email in the database
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      // If user is not found, sending a 404 Not Found response
      return res.status(404).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Checking if user role matches the role provided in the request body
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Role doesn't match",
      });
    }

    // Comparing provided password with hashed password in the database
    const comparePassword = await bcrypt.compare(req.body.password, user.password);
    if (!comparePassword) {
      // If passwords don't match, sending a 500 Internal Server Error response
      return res.status(500).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generating a JWT token with userId payload and a 1-day expiration
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Sending a successful response with login details and JWT token
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    // Handling errors: logging the error and sending a 500 Internal Server Error response
    res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

// Controller function to get current user details based on userId
const currentUserController = async (req, res) => {
  try {
    // Finding user by userId in the database
    const user = await userModel.findOne({ _id: req.body.userId });

    // Sending a successful response with the current user details
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    // Handling errors: logging the error and sending a 500 Internal Server Error response
    return res.status(500).send({
      success: false,
      message: "Unable to get current user",
      error,
    });
  }
};

/*Explanation:
Imports: Importing necessary modules (userModel for MongoDB operations, bcryptjs for password hashing, jsonwebtoken for token generation).

registerController: Handles user registration process.

Validation: Checks if user already exists based on email.
Password Hashing: Uses bcrypt to hash the password before saving it.
Saving User: Creates a new userModel instance and saves it to the database.
Response: Sends a 201 Created response with the newly registered user's data.
Error Handling: Logs errors and sends a 500 Internal Server Error response if any error occurs.

loginController: Manages user login functionality.

Finding User: Retrieves user data based on the provided email.
Role Check: Verifies if the user's role matches the role provided in the request.
Password Comparison: Compares the hashed password in the database with the provided password.
JWT Token: Generates a JWT token with a payload containing the user's ID and a 1-day expiration.
Response: Sends a 200 OK response with login success message, JWT token, and user data.
Error Handling: Logs errors and sends appropriate error responses (404 Not Found or 500 Internal Server Error).
currentUserController: Retrieves current user details based on the userId.

Finding User: Fetches user data from the database using the provided userId.
Response: Sends a 200 OK response with the fetched user data.
Error Handling: Logs errors and sends a 500 Internal Server Error response if any error occurs.
Exports: Makes the registerController, loginController, and currentUserController functions available for use by other parts of the application.

These controllers manage user registration, login, and retrieval of current user details while ensuring robust error handling and security measures such as password hashing and JWT token generation. */

module.exports = {
  registerController,
  loginController,
  currentUserController,
};
