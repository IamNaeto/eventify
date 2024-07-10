const eventSchema = require("../models/eventModel");
const userModel = require("../models/userModel");
const { sendEmail } = require("../utiles/mailer");

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
const eventModel = require("../models/eventModel");

// Function to fetch all events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventModel
      .find()
      .populate("createdBy", "_id firstname lastname email") // Include only id, firstname, lastname and email
      .exec();

    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllEvents,
};

// Helps to get a single events from all events of the users
const getSingleEvent = async (req, res) => {
  try {
    const { id } = req.params; // Get the event ID from the request parameters

    const event = await eventSchema.findById(id);

    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send({ msg: "Event not found" });
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

const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params; // Event ID
    const userId = req.user?.id; // User ID from middleware

    if (!userId) {
      return res.status(401).send({ msg: "Unauthorized: No user ID found" });
    }

    // Find the event
    const event = await eventSchema.findById(id);
    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }

    // Check if the user is already registered
    if (
      event.attendees.some((attendee) => attendee.userId.toString() === userId)
    ) {
      return res
        .status(409)
        .send({ msg: "User already registered for this event" });
    }

    // Fetch user details using user ID
    const user = await userModel.findById(userId, "firstname lastname email");
    if (!user) {
      return res.status(404).send({ msg: "User not found" });
    }

    // Add the user to the attendees list
    event.attendees.push({
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    });
    await event.save();

    // Send email to the user
    const emailSubject = `Registration Confirmed: ${event.event_name}`;
    const emailText = `Hi ${
      user.firstname
    },\n\nYou have successfully registered for the event: ${
      event.event_name
    }.\n\nEvent Details:\nName: ${event.event_name}\nHost: ${
      event.event_host_name
    }\nDescription: ${event.event_description}\nStart: ${
      event.event_start_date
    } ${event.event_start_time}\nEnd: ${event.event_end_date} ${
      event.event_end_time
    }\nLocation: ${event.event_location || event.event_link}\n\nThank you!`;
    const emailHtml = `<p>Hi ${
      user.firstname
    },</p><p>You have successfully registered for the event: <strong>${
      event.event_name
    }</strong>.</p><p><strong>Event Details:</strong><br>Name: ${
      event.event_name
    }<br>Host: ${event.event_host_name}<br>Description: ${
      event.event_description
    }<br>Start: ${event.event_start_date} ${event.event_start_time}<br>End: ${
      event.event_end_date
    } ${event.event_end_time}<br>Location: ${
      event.event_location || event.event_link
    }</p><p>Thank you!</p>`;

    await sendEmail(user.email, emailSubject, emailText, emailHtml);

    res.status(200).send({ msg: "User registered successfully", event, user });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

// Cancel registration for an event
const cancelRegistration = async (req, res) => {
  try {
    const { id } = req.params; // Event ID
    const userId = req.user?.id; // User ID from middleware

    if (!userId) {
      return res.status(401).send({ msg: "Unauthorized: No user ID found" });
    }

    // Find the event
    const event = await eventSchema.findById(id);
    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }

    // Check if the user is registered
    const attendeeIndex = event.attendees.findIndex(
      (attendee) => attendee.userId.toString() === userId
    );
    if (attendeeIndex === -1) {
      return res
        .status(404)
        .send({ msg: "User not registered for this event" });
    }

    // Remove the user from the attendees list
    event.attendees.splice(attendeeIndex, 1);
    await event.save();

    // Send email to the user
    const user = await userModel.findById(userId, "firstname lastname email");
    const emailSubject = `Registration Cancelled: ${event.event_name}`;
    const emailText = `Hi ${user.firstname},\n\nYou have successfully cancelled your registration for the event: ${event.event_name}.\n\nThank you!`;
    const emailHtml = `<p>Hi ${user.firstname},</p><p>You have successfully cancelled your registration for the event: <strong>${event.event_name}</strong>.</p><p>Thank you!</p>`;

    await sendEmail(user.email, emailSubject, emailText, emailHtml);

    res.status(200).send({ msg: "User registration cancelled successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

// Get attendees for an event
const getAttendees = async (req, res) => {
  try {
    const { id } = req.params; // Event ID

    // Find the event
    const event = await eventSchema
      .findById(id)
      .populate("attendees.userId", "firstname lastname email");
    if (!event) {
      return res.status(404).send({ msg: "Event not found" });
    }

    res.status(200).send(event.attendees);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
};

const getUserRegisteredEvents = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .send({ message: "Unauthorized: No user ID found" });
    }

    // Find events where the user ID is present in the attendees list
    const events = await eventSchema
      .find({
        attendees: { $elemMatch: { userId: userId } },
      })
      .populate("createdBy", "_id firstname lastname email");

    // If no events found, send a 200 with an empty array
    if (!events.length) {
      return res.status(200).send([]);
    }

    res.status(200).send(events);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
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
  getUserRegisteredEvents,
};
