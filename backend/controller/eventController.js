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

    // A middleware that attaches the user ID to the request
    const userId = req.user?.id;

    // Ensure userId is defined
    if (!userId) {
      return res.status(401).send({
        msg: "Unauthorized: No user ID found",
      });
    }

    // Check if an event with the same name, start date, start time, and user ID already exists
    const existingEvent = await eventSchema.findOne({
      event_name,
      event_start_date,
      event_start_time,
      createdBy: userId, // Ensure it matches the createdBy field
    });

    if (existingEvent) {
      return res.status(409).send({ msg: "Event already exists" });
    }

    // Create the new event
    const eventData = {
      ...req.body,
      createdBy: userId, // Store the user ID as the creator of the event
    };

    const eventDetails = await eventSchema.create(eventData);

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

// Helps to get all events specific to a user
const getEvents = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .send({ message: "Unauthorized user! Please signin" });
    }

    const events = await eventSchema.find({ createdBy: userId });
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

// Get a single event by ID specific to a user
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .send({ message: "Unauthorized user! Please signin" });
    }

    const event = await eventSchema.findOne({ _id: id, createdBy: userId });

    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }

    res.status(200).send(event);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

// Helps to get all events from all users
const getAllEvents = async (req, res) => {
  try {
    const events = await eventSchema.find().populate("createdBy");
    if (events.length > 0) {
      res.status(200).send(events);
    } else {
      res.status(404).send({ msg: "No events found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

// Helps to edit or update an event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Ensure userId is defined
    if (!userId) {
      return res.status(401).send({ msg: "Unauthorized: No user ID found" });
    }

    // Find the event by id and userId
    const eventToUpdate = await eventSchema.findOne({
      _id: id,
      createdBy: userId,
    });

    // Check if the event exists and belongs to the user
    if (!eventToUpdate) {
      return res.status(404).send({
        msg: "Invalid ID; event not found or you do not have permission to update this event",
      });
    }

    // Update the event
    const updatedEvent = await eventSchema.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).send(updatedEvent);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

// Helps to delete an event by id
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Ensure userId is defined
    if (!userId) {
      return res.status(401).send({ msg: "Unauthorized: No user ID found" });
    }

    // Find the event by id and userId
    const eventToDelete = await eventSchema.findOneAndDelete({
      _id: id,
      createdBy: userId,
    });

    // Check if the event exists and belongs to the user
    if (!eventToDelete) {
      return res.status(404).send({
        msg: "Invalid ID; event not found or you do not have permission to delete this event",
      });
    }

    res.status(200).send({ msg: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createEvents,
  getEvents,
  getEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
