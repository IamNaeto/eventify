const express = require("express");
const router = express.Router();
const {
  createEvents,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controller/eventController.js");

// get method
router.get("/", getEvents);
router.get("/:id", getEvent);

// post method
router.post("/create", createEvents);

// put method
router.put("/update/:id", updateEvent);

// delete method
router.delete("/delete/:id", deleteEvent);

module.exports = router;
