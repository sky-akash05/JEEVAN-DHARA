const testController = (req, res) => {
  // Send a response with status code 200 (OK)
  // and a JSON object containing a welcome message and success status.
  res.status(200).send({
    message: "Welcome user", // A friendly welcome message
    success: true, // Indicates successful response
  });
};

module.exports = { testController };
