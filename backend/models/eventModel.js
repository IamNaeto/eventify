const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    event_name: {
      type: String,
      require: true,
    },
    event_host_name: {
      type: String,
      require: true,
    },
    event_description: {
      type: String,
      require: true,
    },
    event_start_date: {
      type: String,
      require: true,
    },
    event_start_time: {
      type: String,
      require: true,
    },
    event_end_date: {
      type: String,
      require: true,
    },
    event_end_time: {
      type: String,
      require: true,
    },
    event_mode: {
      type: String,
      require: true,
    },
    event_location: {
      type: String,
      require: true,
    },
    event_link: {
      type: String,
      require: true,
    },
    event_category: {
      type: String,
      require: true,
    },
    event_capacity: {
      type: String,
      require: true,
    },
    event_ticket: {
      type: String,
      require: true,
    },
    event_price: {
      type: String,
      require: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const eventList = mongoose.model("eventList", eventSchema);
module.exports = eventList;
