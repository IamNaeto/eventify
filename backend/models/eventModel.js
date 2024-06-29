const mongoose = require("mongoose");

const attendeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  fullname: String,
  email: String,
});

const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    event_host_name: {
      type: String,
      required: true,
    },
    event_description: {
      type: String,
      required: true,
    },
    event_start_date: {
      type: String,
      required: true,
    },
    event_start_time: {
      type: String,
      required: true,
    },
    event_end_date: {
      type: String,
      required: true,
    },
    event_end_time: {
      type: String,
      required: true,
    },
    event_mode: {
      type: String,
      required: true,
      enum: ["Physical", "Virtual (Zoom/Meet)"], // Specify valid modes
    },
    event_location: {
      type: String,
      required: function () {
        return this.event_mode === "Physical";
      },
    },
    event_link: {
      type: String,
      required: function () {
        return this.event_mode === "Virtual (Zoom/Meet)";
      },
    },
    event_category: {
      type: String,
      required: true,
    },
    event_capacity: {
      type: String,
      required: true,
    },
    event_ticket: {
      type: String,
      required: true,
      enum: ["Free", "Premium"], // Specify valid ticket types
    },
    event_price: {
      type: String,
      required: function () {
        return this.event_ticket === "Premium";
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    attendees: [attendeeSchema],
  },
  {
    timestamps: true,
  }
);

const eventList = mongoose.model("eventList", eventSchema);
module.exports = eventList;
