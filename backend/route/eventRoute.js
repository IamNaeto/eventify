// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const {
  createEvents,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController.js");

const { verifyJWT } = require("../controller/userController.js");

// Get all events for the authenticated user
router.get("/", verifyJWT, getEvents);

// Get a single event by ID for the authenticated user
router.get("/:id", verifyJWT, getEvent);

// Create a new event for the authenticated user
router.post("/create", verifyJWT, createEvents);

// Update an event by ID for the authenticated user
router.put("/update/:id", verifyJWT, updateEvent);

// Delete an event by ID for the authenticated user
router.delete("/delete/:id", verifyJWT, deleteEvent);

module.exports = router;
