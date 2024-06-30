// Import the user model to interact with the users collection in MongoDB
const userModel = require("../models/userModel");

// Export the middleware function
module.exports = async (req, res, next) => {
  try {
    // Find the user by the userId from the request body
    const user = await userModel.findById(req.body.userId);
    
    // Check if the user's role is not "admin"
    if (user?.role !== "admin") {
      // If not an admin, send a 401 Unauthorized response
      return res.status(401).send({
        success: false,
        message: "Auth Failed",
      });
    } else {
      // If an admin, proceed to the next middleware or route handler
      next();
    }
  } catch (error) {
    // Log the error to the console
    console.log(error);
    
    // Send a 401 Unauthorized response in case of an error
    return res.status(401).send({
      success: false,
      message: "Auth Failed, ADMIN API",
      error,  // Fix the typo: changed 'errro' to 'error'
    });
  }
};
