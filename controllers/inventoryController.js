const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation: Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }

    // Determine role based on inventoryType (in/out)
    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);

      // Calculate total blood in stock based on previous 'in' records
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      // Calculate total blood used based on previous 'out' records
      const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;

      // Calculate available quantity of requested blood group
      const availableQuanityOfBloodGroup = totalIn - totalOut;

      // Quantity validation: Ensure requested quantity is available
      if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuanityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }

      // Assign hospital ID to the record for 'out' inventoryType
      req.body.hospital = user?._id;
    } else {
      // Assign donor ID to the record for 'in' inventoryType
      req.body.donar = user?._id;
    }

    // Save inventory record
    const inventory = new inventoryModel(req.body);
    await inventory.save();

    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Create Inventory API",
      error,
    });
  }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    // Find all inventory records for a specific organisation
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .populate("donar") // Populate donor details
      .populate("hospital") // Populate hospital details
      .sort({ createdAt: -1 }); // Sort by creation date descending

    return res.status(200).send({
      success: true,
      message: "Get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};

// GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
  try {
    // Find hospital consumer records based on provided filters
    const inventory = await inventoryModel
      .find(req.body.filters)
      .populate("donar") // Populate donor details
      .populate("hospital") // Populate hospital details
      .populate("organisation") // Populate organisation details
      .sort({ createdAt: -1 }); // Sort by creation date descending

    return res.status(200).send({
      success: true,
      message: "Get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Consumer Inventory",
      error,
    });
  }
};

// GET RECENT BLOOD RECORDS (LIMIT 3)
const getRecentInventoryController = async (req, res) => {
  try {
    // Find recent inventory records (limit to 3) for a specific organisation
    const inventory = await inventoryModel
      .find({
        organisation: req.body.userId,
      })
      .limit(3)
      .sort({ createdAt: -1 }); // Sort by creation date descending

    return res.status(200).send({
      success: true,
      message: "Recent Inventory Data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Recent Inventory API",
      error,
    });
  }
};

// GET DONOR RECORDS
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    // Find distinct donors for a specific organisation
    const donorId = await inventoryModel.distinct("donar", {
      organisation,
    });

    // Fetch donor details based on donor IDs
    const donars = await userModel.find({ _id: { $in: donorId } });

    return res.status(200).send({
      success: true,
      message: "Donor Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Donor records",
      error,
    });
  }
};

// GET HOSPITALS DATA
const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;

    // Find distinct hospitals for a specific organisation
    const hospitalId = await inventoryModel.distinct("hospital", {
      organisation,
    });

    // Fetch hospital details based on hospital IDs
    const hospitals = await userModel.find({
      _id: { $in: hospitalId },
    });

    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Hospital API",
      error,
    });
  }
};

// GET ORGANISATION PROFILES (FOR DONORS)
const getOrgnaisationController = async (req, res) => {
  try {
    const donar = req.body.userId;

    // Find distinct organisations for a specific donor
    const orgId = await inventoryModel.distinct("organisation", { donar });

    // Fetch organisation details based on organisation IDs
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });

    return res.status(200).send({
      success: true,
      message: "Organisation Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Organisation API",
      error,
    });
  }
};

// GET ORGANISATION PROFILES (FOR HOSPITALS)
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userId;

    // Find distinct organisations for a specific hospital
    const orgId = await inventoryModel.distinct("organisation", { hospital });

    // Fetch organisation details based on organisation IDs
    const organisations = await userModel.find({
      _id: { $in: orgId },
    });

    return res.status(200).send({
      success: true,
      message: "Hospital Organisation Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital Organisation API",
      error,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
/*Sure, let's break down the inventoryController.js file section by section:

1. createInventoryController Function
Purpose:
Purpose: Handles the creation of new inventory records based on the inventoryType (in or out).
Validation: Checks if the user exists based on the provided email. If not, it throws an error.
Role Determination: Determines whether the user is acting as a donor or a hospital based on inventoryType.
Steps:
Validation: Checks if the user exists.
Role Determination:
If inventoryType is "out", calculates available blood quantity based on previous 'in' and 'out' records.
Validates if the requested quantity of blood is available.
Assigns hospital ID to the record.
If inventoryType is "in", assigns donar ID to the record.
Save Record: Creates a new instance of inventoryModel with the request body and saves it to the database.
Edge Cases:
Handles cases where the requested blood quantity exceeds the available quantity.
Catches and logs any errors during the process.
2. getInventoryController Function
Purpose:
Purpose: Retrieves all inventory records for a specific organisation.
Population: Populates donar and hospital fields with detailed user information.
Sorting: Sorts records based on creation date (createdAt) in descending order.
Steps:
Find Records: Queries inventoryModel to find all records matching the organisation ID provided in the request body.
Population: Populates donar and hospital fields to include detailed user information from userModel.
Sorting: Sorts the retrieved records based on createdAt in descending order.
Edge Cases:
Handles cases where no records are found for the given organisation.
Logs and returns appropriate error messages in case of any errors.
3. getInventoryHospitalController Function
Purpose:
Purpose: Retrieves hospital consumer records based on specified filters.
Population: Populates donar, hospital, and organisation fields with detailed user and organisation information.
Sorting: Sorts records based on creation date (createdAt) in descending order.
Steps:
Find Records: Queries inventoryModel to find records based on the filters provided in the request body.
Population: Populates donar, hospital, and organisation fields to include detailed user and organisation information.
Sorting: Sorts the retrieved records based on createdAt in descending order.
Edge Cases:
Handles cases where no matching records are found based on the provided filters.
Logs and returns appropriate error messages in case of any errors.
4. getRecentInventoryController Function
Purpose:
Purpose: Retrieves the most recent (up to 3) inventory records for a specific organisation.
Sorting: Sorts records based on creation date (createdAt) in descending order.
Steps:
Find Records: Queries inventoryModel to find up to 3 most recent records for the specified organisation ID in the request body.
Sorting: Sorts the retrieved records based on createdAt in descending order.
Edge Cases:
Handles cases where fewer than 3 records are available for the given organisation.
Logs and returns appropriate error messages in case of any errors.
5. getDonarsController Function
Purpose:
Purpose: Retrieves donor records for a specific organisation.
Population: Fetches detailed information for each donor from userModel based on their IDs.
Steps:
Find Distinct Donors: Uses distinct to find unique donor IDs associated with the provided organisation ID.
Fetch Donors: Retrieves detailed donor information from userModel based on the IDs found.
Edge Cases:
Handles cases where no donors are found for the given organisation.
Logs and returns appropriate error messages in case of any errors.
6. getHospitalController Function
Purpose:
Purpose: Retrieves hospital records for a specific organisation.
Population: Fetches detailed information for each hospital from userModel based on their IDs.
Steps:
Find Distinct Hospitals: Uses distinct to find unique hospital IDs associated with the provided organisation ID.
Fetch Hospitals: Retrieves detailed hospital information from userModel based on the IDs found.
Edge Cases:
Handles cases where no hospitals are found for the given organisation.
Logs and returns appropriate error messages in case of any errors.
7. getOrgnaisationController Function
Purpose:
Purpose: Retrieves organisation profiles associated with donors.
Population: Fetches detailed organisation information from userModel based on organisation IDs associated with donors.
Steps:
Find Distinct Organisations: Uses distinct to find unique organisation IDs associated with the provided donor userId.
Fetch Organisations: Retrieves detailed organisation information from userModel based on the IDs found.
Edge Cases:
Handles cases where no organisations are found for the given donor.
Logs and returns appropriate error messages in case of any errors.
8. getOrgnaisationForHospitalController Function
Purpose:
Purpose: Retrieves organisation profiles associated with hospitals.
Population: Fetches detailed organisation information from userModel based on organisation IDs associated with hospitals.
Steps:
Find Distinct Organisations: Uses distinct to find unique organisation IDs associated with the provided hospital userId.
Fetch Organisations: Retrieves detailed organisation information from userModel based on the IDs found.
Edge Cases:
Handles cases where no organisations are found for the given hospital.
Logs and returns appropriate error messages in case of any errors.
Summary
Each function in inventoryController.js serves a specific purpose related to managing and retrieving blood inventory records, donors, hospitals, and associated organisations. The code handles validations, database queries, population of related models, sorting, and error handling
 effectively to ensure smooth operation of the API endpoints related to inventory management. */
