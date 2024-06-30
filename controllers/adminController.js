// Import the userModel from the models directory
const userModel = require("../models/userModel");

// Controller to get the list of donors
const getDonarsListController = async (req, res) => {
  try {
    // Find all users with the role of 'donar' and sort them by creation date in descending order
    const donarData = await userModel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    // Send a successful response with the donor data
    return res.status(200).send({
      success: true,
      Toatlcount: donarData.length, // Total count of donors
      message: "Donar List Fetched Successfully", // Success message
      donarData, // Data of donors
    });
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donar List API", // Error message
      error, // Error details
    });
  }
};

// Controller to get the list of hospitals
const getHospitalListController = async (req, res) => {
  try {
    // Find all users with the role of 'hospital' and sort them by creation date in descending order
    const hospitalData = await userModel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    // Send a successful response with the hospital data
    return res.status(200).send({
      success: true,
      Toatlcount: hospitalData.length, // Total count of hospitals
      message: "HOSPITAL List Fetched Successfully", // Success message
      hospitalData, // Data of hospitals
    });
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital List API", // Error message
      error, // Error details
    });
  }
};

// Controller to get the list of organizations
const getOrgListController = async (req, res) => {
  try {
    // Find all users with the role of 'organisation' and sort them by creation date in descending order
    const orgData = await userModel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    // Send a successful response with the organization data
    return res.status(200).send({
      success: true,
      Toatlcount: orgData.length, // Total count of organizations
      message: "ORG List Fetched Successfully", // Success message
      orgData, // Data of organizations
    });
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In ORG List API", // Error message
      error, // Error details
    });
  }
};

// Controller to delete a donor by ID
const deleteDonarController = async (req, res) => {
  try {
    // Find the donor by ID and delete
    await userModel.findByIdAndDelete(req.params.id);
    // Send a successful response
    return res.status(200).send({
      success: true,
      message: "Record Deleted successfully", // Success message
    });
  } catch (error) {
    // Log the error and send a 500 Internal Server Error response
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting", // Error message
      error, // Error details
    });
  }
};

// Export the controllers
module.exports = {
  getDonarsListController,
  getHospitalListController,
  getOrgListController,
  deleteDonarController,
};
