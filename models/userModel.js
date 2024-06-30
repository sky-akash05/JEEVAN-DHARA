// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // Role of the user
    // Can be one of "admin", "organisation", "donar", or "hospital"
    role: {
      type: String,
      required: [true, "role is required"],
      enum: ["admin", "organisation", "donar", "hospital"],
    },
    // Name of the user
    // Required if the role is "user" or "admin"
    name: {
      type: String,
      required: function () {
        if (this.role === "user" || this.role === "admin") {
          return true;
        }
        return false;
      },
    },
    // Name of the organisation
    // Required if the role is "organisation"
    organisationName: {
      type: String,
      required: function () {
        if (this.role === "organisation") {
          return true;
        }
        return false;
      },
    },
    // Name of the hospital
    // Required if the role is "hospital"
    hospitalName: {
      type: String,
      required: function () {
        if (this.role === "hospital") {
          return true;
        }
        return false;
      },
    },
    // Email of the user
    // Required and must be unique
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    // Password of the user
    // Required field
    password: {
      type: String,
      required: [true, "password is required"],
    },
    // Website of the user
    website: {
      type: String,
    },
    // Address of the user
    // Required field
    address: {
      type: String,
      required: [true, "address is required"],
    },
    // Phone number of the user
    // Required field
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
  },
  // Timestamps option to add createdAt and updatedAt fields
  { timestamps: true }
);

// Export the users model
module.exports = mongoose.model("users", userSchema);
/* Explanation
Imports:

mongoose: Used to define the schema and create the model.
Schema Definition:

role: A string field that specifies the user's role. It is required and must be one of the specified enum values ("admin", "organisation", "donar", "hospital").
name: A string field that specifies the user's name. It is conditionally required based on the user's role ("user" or "admin").
organisationName: A string field that specifies the organization's name. It is conditionally required if the user's role is "organisation".
hospitalName: A string field that specifies the hospital's name. It is conditionally required if the user's role is "hospital".
email: A string field that specifies the user's email. It is required and must be unique.
password: A string field that specifies the user's password. It is required.
website: A string field that specifies the user's website.
address: A string field that specifies the user's address. It is required.
phone: A string field that specifies the user's phone number. It is required.
Options:

{ timestamps: true }: Adds createdAt and updatedAt fields to the schema.
Export:

module.exports = mongoose.model("users", userSchema);: Exports the users model to be used in other parts of the application.*/