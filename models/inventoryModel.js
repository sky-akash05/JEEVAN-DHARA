// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Define the inventory schema
const inventorySchema = new mongoose.Schema(
  {
    // Inventory Type
    // Can be either "in" or "out"
    inventoryType: {
      type: String,
      required: [true, "inventory type required"],
      enum: ["in", "out"],
    },
    // Blood Group
    // Must be one of the specified blood groups
    bloodGroup: {
      type: String,
      required: [true, "blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    // Quantity of blood
    quantity: {
      type: Number,
      required: [true, "blood quantity is required"],
    },
    // Donor's Email
    email: {
      type: String,
      required: [true, "Donor Email is required"],
    },
    // Organisation reference
    // References the users collection
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "organisation is required"],
    },
    // Hospital reference
    // References the users collection
    // Required only if inventoryType is "out"
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "out";
      },
    },
    // Donor reference
    // References the users collection
    // Required only if inventoryType is "in"
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inventoryType === "in";
      },
    },
  },
  // Timestamps option to add createdAt and updatedAt fields
  { timestamps: true }
);

// Export the Inventory model
module.exports = mongoose.model("Inventory", inventorySchema);
/*Explanation
Imports:

mongoose: Used to define the schema and create the model.
Schema Definition:

inventoryType: A string field that specifies whether the inventory type is "in" or "out". It is required and must be one of the specified enum values.
bloodGroup: A string field that specifies the blood group. It is required and must be one of the specified enum values.
quantity: A number field that specifies the quantity of blood. It is required.
email: A string field that specifies the donor's email. It is required.
organisation: A reference to the users collection, representing the organization associated with the inventory. It is required.
hospital: A reference to the users collection, representing the hospital associated with the inventory. It is required only if the inventoryType is "out".
donar: A reference to the users collection, representing the donor associated with the inventory. It is required only if the inventoryType is "in".
Options:

{ timestamps: true }: Adds createdAt and updatedAt fields to the schema.
Export:

module.exports = mongoose.model("Inventory", inventorySchema);: Exports the Inventory model to be used in other parts of the application. */