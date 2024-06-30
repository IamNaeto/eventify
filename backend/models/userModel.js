const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  bio: String,
  website: String,
  twitter: String,
  linkedIn: String,
  instagram: String,
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
