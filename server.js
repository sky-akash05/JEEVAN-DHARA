// Imports: The code imports necessary libraries and modules such as express for creating the server, dotenv for environment variables, colors for console text styling, morgan for logging HTTP requests, and cors for enabling Cross-Origin Resource Sharing.
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Environment Configuration: The dotenv.config() line loads the environment variables from a .env file into process.env.
dotenv.config();

// Database Connection: connectDB() is called to establish a connection to the MongoDB database.
connectDB();

// Express Application: An Express application instance is created and assigned to app.
const app = express();

// Middlewares:
// express.json(): Middleware to parse incoming JSON requests.
app.use(express.json());
// cors(): Middleware to enable CORS, allowing requests from different origins.
app.use(cors());
// morgan("dev"): Middleware for logging HTTP requests in the development environment.
app.use(morgan("dev"));

// Routes:
// The routes are defined for various functionalities of the application. Each route points to a specific module that handles the related requests:
// /api/v1/test: Routes for testing purposes.
app.use("/api/v1/test", require("./routes/testRoutes"));
// /api/v1/auth: Routes for authentication.
app.use("/api/v1/auth", require("./routes/authRoutes"));
// /api/v1/inventory: Routes for inventory management.
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
// /api/v1/analytics: Routes for analytics.
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
// /api/v1/admin: Routes for admin operations.
app.use("/api/v1/admin", require("./routes/adminRoutes"));

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port Configuration: The PORT constant is defined, which takes the value from the environment variable PORT or defaults to 8080.
const PORT = process.env.PORT || 8080;

// Server Listening: The server is set to listen on the specified port, and a message is logged to the console indicating that the server is running, along with the mode (development or production) and port number. The message is styled using the colors library.
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`
      .bgBlue.white
  );
});

/************************** package.json************************** */
/*Here's a detailed explanation of the use of each dependency listed in your package.json file:

json
Copy code
{
  "name": "mern-blood-bank-app",
  "version": "1.0.0",
  "description": "mern blood bank app",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "nodemon server.js",
    "client": "npm start --prefix ./client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "author": "techinfoyt",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "colors": "^1.4.0",
    "concurrently": "^8.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^7.1.0",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.22"
  }
}
Dependencies
bcryptjs:

Version: ^2.4.3
Use: Used to hash passwords before saving them to the database and to compare hashed passwords for authentication.
colors:

Version: ^1.4.0
Use: Used to add color and styling to the console output, making it easier to read and debug.
concurrently:

Version: ^8.0.1
Use: Allows running multiple commands concurrently, typically used for running both the server and client development servers at the same time.
cors:

Version: ^2.8.5
Use: Middleware to enable Cross-Origin Resource Sharing (CORS), allowing the server to accept requests from different origins.
dotenv:

Version: ^16.0.3
Use: Loads environment variables from a .env file into process.env, making it easy to manage configuration variables.
express:

Version: ^4.18.2
Use: A fast, unopinionated, minimalist web framework for Node.js used to create the server and handle routing and middleware.
jsonwebtoken:

Version: ^9.0.0
Use: Used to create and verify JSON Web Tokens (JWT) for authentication and authorization purposes.
mongoose:

Version: ^7.1.0
Use: An Object Data Modeling (ODM) library for MongoDB and Node.js, used to manage data relationships, schema validation, and business logic hooks.
morgan:

Version: ^1.10.0
Use: HTTP request logger middleware for Node.js, used for logging requests to the console for debugging and monitoring.
nodemon:

Version: ^2.0.22
Use: A tool that automatically restarts the Node.js server whenever file changes in the directory are detected, improving the development workflow.
Scripts
test: A placeholder script for running tests.
server: Runs the server with nodemon, which will restart the server on file changes.
client: Starts the client development server using the npm start command within the client directory.
dev: Uses concurrently to run both the server and client scripts at the same time, facilitating full-stack development.
Explanation
These dependencies and scripts provide a robust foundation for developing and running a full-stack MERN (MongoDB, Express, React, Node.js) application. The dependencies help with crucial functionalities such as password hashing (bcryptjs), environment variable management (dotenv), server-side request handling (express), database interaction (mongoose), and more. The scripts streamline the development process by enabling simultaneous server and client development and automatic server restarts on code changes.*/
