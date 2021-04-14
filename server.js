const express = require("express");
const mongoose = require("mongoose");

// change items to routes later
const players = require("./routes/api/playersAPI");

const app = express();

const PORT = process.env.PORT || 8080;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view, grabbing all the routes from the routes folder
// anything that goes to api/items should refer to the items variable, which is that file
// if they hit that endpoint, it goes to that file and uses those routes
app.use("/api/players", players);

// Connect to the Mongo DB
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/blackJackDB")
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});