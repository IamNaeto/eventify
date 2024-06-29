const express = require("express");
const router = express.Router();
const {
  createEvents,
  getEvents,
  getEvent,
  getAllEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  cancelRegistration,
  getAttendees,
} = require("../controller/eventController.js");

const { verifyJWT } = require("../controller/userController.js");

// Get all events for all users
router.get("/allEvents", getAllEvents);

// Get a single event from all users event
router.get("/singleEvent/:id", getSingleEvent);

// Register for an event
router.post("/register/:id", verifyJWT, registerForEvent);

// Cancel registration for an event
router.delete("/register/:id", verifyJWT, cancelRegistration);

// Get attendees for an event
router.get("/attendees/:id", verifyJWT, getAttendees);

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
