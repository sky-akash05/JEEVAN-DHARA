// Import the express module
const express = require("express");

// Import the authentication middleware to protect routes
const authMiddelware = require("../middlewares/authMiddelware");

// Import controllers from the adminController file
const {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
} = require("../controllers/adminController");

// Import the admin middleware to ensure admin privileges
const adminMiddleware = require("../middlewares/adminMiddleware");

// Create a new router object
const router = express.Router();

// Define the routes

// GET || DONAR LIST
// This route returns a list of donors
// It is protected by authentication and admin middlewares
router.get(
  "/donar-list",
  authMiddelware,
  adminMiddleware,
  getDonarsListController
);

// GET || HOSPITAL LIST
// This route returns a list of hospitals
// It is protected by authentication and admin middlewares
router.get(
  "/hospital-list",
  authMiddelware,
  adminMiddleware,
  getHospitalListController
);

// GET || ORG LIST
// This route returns a list of organizations
// It is protected by authentication and admin middlewares
router.get("/org-list", authMiddelware, adminMiddleware, getOrgListController);

// DELETE DONAR || DELETE
// This route deletes a donor by ID
// It is protected by authentication and admin middlewares
router.delete(
  "/delete-donar/:id",
  authMiddelware,
  adminMiddleware,
  deleteDonarController
);

// Export the router object to be used in other parts of the application
module.exports = router;

/*Explanation
Imports:

express: Used to create the router object for defining routes.
authMiddelware: Middleware to ensure the user is authenticated.
adminController: Contains the controller functions for handling admin-related operations.
adminMiddleware: Middleware to ensure the user has admin privileges.
Router Object:

router: An instance of express.Router() used to define route handlers.
Routes:

GET /donar-list: Returns a list of donors, protected by authentication and admin middlewares.
GET /hospital-list: Returns a list of hospitals, protected by authentication and admin middlewares.
GET /org-list: Returns a list of organizations, protected by authentication and admin middlewares.
DELETE /delete-donar/
: Deletes a donor by ID, protected by authentication and admin middlewares.
Export:

The router object is exported for use in other parts of the application, 
typically in the server setup file where it will be connected to the main app */
