require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const eventRoute = require("./route/eventRoute.js");
const userRoute = require("./route/userRoute.js");
const cors = require("cors");

const app = express(); // express instance

app.use(cors()); // Use CORS middleware

app.use(express.json()); // registering express json middleware

app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      } else if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      } else if (path.endsWith(".html")) {
        res.set("Content-Type", "text/html");
      }
    },
  })
);

app.use(express.urlencoded({ extended: false })); // registering urlencoded to express which helps us to post using a form or urlencoded format
app.use(process.env.APP_EVENT_ROUTE_URL, eventRoute); //manage event route
app.use(process.env.APP_EVENT_USER_ROUTE_URL, userRoute); // manage user route

const PORT = process.env.PORT || 3000; //port number

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});

// mongoose //connection to MongoDBCompass
//   .connect("mongodb://localhost:27017/univelcity")
//   .then(() => {
//     console.log("Connected to database successfully");
//   })
//   .catch(() => {
//     console.log(`Connection to database failed`);
//   });

const MONGO_URL = process.env.MONGO_DB_CONNECTION_STRING;
mongoose //connection to MongoDB
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to database successfully");
  })
  .catch(() => {
    console.log(`Connection to database failed`);
  });

// get method
app.get("/", (req, res) => {
  res
    .send({
      msg: "Welcome to eventify api endpoint",
      hint: "Crafting Experiences One Event at a Time",
    })
    .status(200);
});
