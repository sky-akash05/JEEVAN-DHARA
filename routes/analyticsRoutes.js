// Import the express module
const express = require("express");

// Import the authentication middleware to protect routes
const authMiddelware = require("../middlewares/authMiddelware");

// Import the controller function from the analyticsController file
const {
  bloodGroupDetailsContoller,
} = require("../controllers/analyticsController");

// Create a new router object
const router = express.Router();

// Define the routes

// GET BLOOD DATA
// This route fetches blood group data
// It is protected by the authentication middleware
router.get("/bloodGroups-data", authMiddelware, bloodGroupDetailsContoller);

// Export the router object to be used in other parts of the application
module.exports = router;
