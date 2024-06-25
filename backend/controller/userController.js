const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Function to handle user sign-in
const signIn = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if a user with the given email exists in the database
    const user = await userModel.findOne({ email: email });
    if (!user) {
      // If no user is found, send a 401 Unauthorized response with an error message
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // If the passwords do not match, send a 401 Unauthorized response with an error message
      return res.status(401).send({ message: "Invalid email or password" });
    }

    // Create a payload with the user's ID for the JWT
    const payLoad = { userId: user._id };

    // Sign a new JWT with the payload and secret key, setting an expiration time
    const token = jwt.sign(payLoad, process.env.APP_SECRET_KEY, {
      expiresIn: "1hr",
    });

    // Send a success response with the generated token
    res.status(200).send({
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response with the error message
    res.status(500).send({ message: error.message });
  }
};

// Function to handle user sign-up
const signUp = async (req, res) => {
  try {
    // Check if all required fields are provided in the request body
    if (!req.body.fullname || !req.body.email || !req.body.password) {
      return res
        .status(400) // Bad Request status code
        .send({ message: "All required fields must be filled" });
    }

    // Extract fullname, email, and password from the request body
    const { fullname, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      // If the email already exists, send a 409 Conflict status with an error message
      return res
        .status(409) // Conflict status code
        .send({ message: "User with this email already exists" });
    }

    // Generate a salt for hashing the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the provided details and hashed password
    const user = new userModel({
      fullname,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const userRegData = await user.save();
    // Send a success response with the registration data
    res.status(201).send({
      message: "Registration successful",
      userRegData,
    });
  } catch (error) {
    // If an error occurs, send a 500 Internal Server Error response with the error message
    res.status(500).send({ message: error.message });
  }
};

// Middleware to verify JWT token for protected routes
const verifyJWT = async (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If there's no token in the request, return an Unauthorized status
  if (!token) {
    return res.status(401).send({ message: "Unauthorized user!" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

    // Add the decoded user ID to the request object for use in subsequent middleware or route handlers
    req.user = { id: decoded.userId };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error during verification, send a server error response
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
  verifyJWT,
};
