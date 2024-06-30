// Import the express module
const express = require("express");

// Import the testController function from the testController file
const { testController } = require("../controllers/testController");

// Create a new router object
const router = express.Router();

// Define the routes

// GET /
// This route handles the root path and executes the testController function
router.get("/", testController);

// Export the router object to be used in other parts of the application
module.exports = router;
