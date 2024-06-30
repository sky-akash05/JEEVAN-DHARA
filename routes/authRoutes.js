// Import the express module
const express = require("express");

// Import controller functions from the authController file
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");

// Import the authentication middleware to protect routes
const authMiddelware = require("../middlewares/authMiddelware");

// Create a new router object
const router = express.Router();

// Define the routes

// REGISTER || POST
// This route handles user registration
router.post("/register", registerController);

// LOGIN || POST
// This route handles user login
router.post("/login", loginController);

// GET CURRENT USER || GET
// This route fetches details of the current logged-in user
// It is protected by the authentication middleware
router.get("/current-user", authMiddelware, currentUserController);

// Export the router object to be used in other parts of the application
module.exports = router;
