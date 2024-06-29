const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Function to handle user sign-in
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const payLoad = { userId: user._id };

    const token = jwt.sign(payLoad, process.env.APP_SECRET_KEY, {
      expiresIn: "1hr",
    });

    res.status(200).send({
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Function to handle user sign-up
const signUp = async (req, res) => {
  try {
    if (!req.body.fullname || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .send({ message: "All required fields must be filled" });
    }

    const { fullname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      fullname,
      email,
      password: hashedPassword,
    });

    const userRegData = await user.save();
    res.status(201).send({
      message: "User created successfully",
      user: userRegData,
    });
  } catch (error) {
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
