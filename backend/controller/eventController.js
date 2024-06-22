const eventSchema = require("../models/eventModel");

// Helps to create an event
const createEvents = async (req, res) => {
  try {
    const {
      event_name,
      event_host_name,
      event_description,
      event_start_date,
      event_start_time,
      event_end_date,
      event_end_time,
      event_mode,
      event_location,
      event_link,
      event_category,
      event_capacity,
      event_ticket,
      event_price,
    } = req.body;

    // Check if all required fields are present
    if (
      !event_name ||
      !event_host_name ||
      !event_description ||
      !event_start_date ||
      !event_start_time ||
      !event_end_date ||
      !event_end_time ||
      !event_mode ||
      (event_mode === "Physical" && !event_location) ||
      (event_mode === "Virtual (Zoom/Meet)" && !event_link) ||
      !event_category ||
      !event_capacity ||
      !event_ticket ||
      (event_ticket === "Premium" && !event_price)
    ) {
      return res.status(400).send({
        msg: "All fields must be filled",
      });
    }

    // Check if an event with the same name already exists
    const existingEvent = await eventSchema.findOne({
      event_name,
      event_start_date,
      event_start_time,
    });

    if (existingEvent) {
      return res.status(409).send({ msg: "Event already exists" });
    }

    // Create the new event
    const eventDetails = await eventSchema.create(req.body);

    // Send the created event details as a response
    res.status(201).send(eventDetails);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).send({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// Helps to get all events
const getEvents = async (req, res) => {
  try {
    const events = await eventSchema.find();
    if (events) {
      res.status(200).send(events);
    } else {
      res.status(404).send("Not event Found");
      return;
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Helps to get a singular event
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventSchema.findById(id);
    if (!event) {
      return res.status(404).send({ msg: "event not found!" });
    }
    res.status(200).send(event);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

// Helps to edit or update a event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const eventID = await eventSchema.findByIdAndUpdate(id, req.body);
    if (!eventID) {
      res.status(404).send({ msg: "Invalid ID; event not found" });
      return;
    }
    const updatedevent = await eventSchema.findById(id);
    res.status(200).send(updatedevent);
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

// Helps to delete a event by id
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedevent = await eventSchema.findByIdAndDelete(id);
    if (!deletedevent) {
      res.status(404).send({ msg: "Invalid ID; event not found" });
      return;
    }
    res.status(200).send({ msg: "event deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
};

module.exports = {
  createEvents,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
