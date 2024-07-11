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

    const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.APP_SECRET_KEY, {
      expiresIn: "1day",
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
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.password
    ) {
      return res
        .status(400)
        .send({ message: "All required fields must be filled" });
    }

    const { firstname, lastname, email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res
        .status(409)
        .send({ message: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({
      firstname,
      lastname,
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

// Function to get user data
const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Function to update user data
const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      bio,
      website,
      twitter,
      linkedIn,
      instagram,
    } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser && existingUser._id.toString() !== id) {
        return res
          .status(409)
          .send({ message: "User with this email already exists" });
      }
      user.email = email;
    }
    if (bio) user.bio = bio;
    if (website) user.website = website;
    if (twitter) user.twitter = twitter;
    if (linkedIn) user.linkedIn = linkedIn;
    if (instagram) user.instagram = instagram;

    const updatedUser = await user.save();
    res.send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Middleware to verify JWT token for protected routes
const verifyJWT = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized user!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET_KEY);

    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
  verifyJWT,
  getUserData,
  updateUserData,
};
