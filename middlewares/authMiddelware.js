// Import the jsonwebtoken library to handle JWT operations
const JWT = require("jsonwebtoken");

// Export the middleware function
module.exports = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    // Extract the token from the Authorization header
    // The Authorization header is expected to be in the format: "Bearer <token>"
    // Example: "Bearer abc123token"
    const token = req.headers["authorization"].split(" ")[1];

    // Verify the token
    // The JWT.verify method takes the token, a secret key, and a callback function
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      // If there is an error during verification (e.g., token is invalid or expired)
      if (err) {
        // Send a 401 Unauthorized response with a message indicating authentication failure
        return res.status(401).send({
          success: false,
          message: "Auth Failed",
        });
      } else {
        // If the token is valid, the decoded payload (which includes the userId) is available
        // Add the decoded userId to the request body for further use in subsequent middleware or route handlers
        req.body.userId = decode.userId;
        // Call the next middleware or route handler in the stack
        next();
      }
    });
  } catch (error) {
    // Log the error to the console
    console.log(error);
    // Send a 401 Unauthorized response in case of an error
    return res.status(401).send({
      success: false,
      error, // Include the error details in the response
      message: "Auth Failed",
    });
  }
};
