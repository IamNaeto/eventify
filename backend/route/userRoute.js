const express = require("express");
const router = express.Router();
const {
  signIn,
  signUp,
  getUserData,
  updateUserData,
  verifyJWT,
} = require("../controller/userController.js");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile/:id", verifyJWT, getUserData);
router.put("/profile/:id", verifyJWT, updateUserData);

module.exports = router;
