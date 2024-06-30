const inventoryModel = require("../models/inventoryModel"); // Importing the inventory model for database operations
const mongoose = require("mongoose");

// Controller function to fetch blood group data
const bloodGroupDetailsContoller = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"]; // Array of blood groups to iterate over
    const bloodGroupData = []; // Array to store aggregated data for each blood group
    const organisation = new mongoose.Types.ObjectId(req.body.userId); // Extract organization ID from request body

    // Iterate over each blood group in parallel
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Aggregate query to calculate total quantity of blood received (inventoryType: "in")
        const totalIn = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "in", // Filtering for incoming blood
              organisation, // Matching based on organization ID
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }, // Summing up the quantity field
            },
          },
        ]);

        // Aggregate query to calculate total quantity of blood issued (inventoryType: "out")
        const totalOut = await inventoryModel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventoryType: "out", // Filtering for outgoing blood
              organisation, // Matching based on organization ID
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" }, // Summing up the quantity field
            },
          },
        ]);

        // Calculating available blood units as the difference between total in and total out
        const availableBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        // Pushing aggregated data for the current blood group into bloodGroupData array
        bloodGroupData.push({
          bloodGroup, // Blood group type (e.g., "O+", "O-", etc.)
          totalIn: totalIn[0]?.total || 0, // Total units received for the blood group
          totalOut: totalOut[0]?.total || 0, // Total units issued for the blood group
          availableBlood, // Available units (total in - total out) for the blood group
        });
      })
    );

    // Sending a successful response with aggregated blood group data
    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetch Successfully",
      bloodGroupData, // Array containing detailed information for each blood group
    });
  } catch (error) {
    // Handling errors: logging the error and sending a 500 Internal Server Error response
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error, // Detailed error information
    });
  }
};

module.exports = { bloodGroupDetailsContoller }; // Exporting the bloodGroupDetailsContoller function
