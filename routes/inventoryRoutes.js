// Import the express module
const express = require("express");

// Import middleware for authentication
const authMiddelware = require("../middlewares/authMiddelware");

// Import controller functions from the inventoryController file
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

// Create a new router object
const router = express.Router();

// Define the routes

// ADD INVENTORY || POST
// This route adds new inventory records
// It is protected by the authentication middleware
router.post("/create-inventory", authMiddelware, createInventoryController);

// GET ALL BLOOD RECORDS
// This route fetches all inventory records
// It is protected by the authentication middleware
router.get("/get-inventory", authMiddelware, getInventoryController);

// GET RECENT BLOOD RECORDS
// This route fetches recent inventory records
// It is protected by the authentication middleware
router.get(
  "/get-recent-inventory",
  authMiddelware,
  getRecentInventoryController
);

// GET HOSPITAL BLOOD RECORDS
// This route fetches inventory records for a specific hospital
// It is protected by the authentication middleware
router.post(
  "/get-inventory-hospital",
  authMiddelware,
  getInventoryHospitalController
);

// GET DONAR RECORDS
// This route fetches donor records
// It is protected by the authentication middleware
router.get("/get-donars", authMiddelware, getDonarsController);

// GET HOSPITAL RECORDS
// This route fetches hospital records
// It is protected by the authentication middleware
router.get("/get-hospitals", authMiddelware, getHospitalController);

// GET ORGANISATION RECORDS
// This route fetches organization records
// It is protected by the authentication middleware
router.get("/get-orgnaisation", authMiddelware, getOrgnaisationController);

// GET ORGANISATION RECORDS FOR HOSPITAL
// This route fetches organization records associated with hospitals
// It is protected by the authentication middleware
router.get(
  "/get-orgnaisation-for-hospital",
  authMiddelware,
  getOrgnaisationForHospitalController
);

// Export the router object to be used in other parts of the application
module.exports = router;

/*Explanation
Imports:

express: Used to create the router object for defining routes.
authMiddelware: Middleware to ensure the user is authenticated before accessing protected routes.
Various controller functions (createInventoryController, getInventoryController, etc.) imported from inventoryController to handle specific functionalities related to inventory management.
Router Object:

router: An instance of express.Router() used to define route handlers.
Routes:

Each route (/create-inventory, /get-inventory, etc.) is defined using router.post() or router.get() methods, specifying the HTTP method and path.
Each route is protected by authMiddelware, ensuring that only authenticated users can access these endpoints.
Export:

module.exports = router;:
Exports the router object so that it can be imported and used in other parts of the application, typically in the main server file (server.js) where it will be connected to the Express application instance. */