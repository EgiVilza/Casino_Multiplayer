const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const passport = require("./config/passportConfig")
const session = require("express-session")
const router = require("./routes/api/playersAPI")
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 8080;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Note: May not need this
app.use(bodyParser.urlencoded({ extended: true }))

//Requiring routes
app.use(cors())
app.use(router)

//Use sessions to keep track of the user's login status
app.use(session({
  secret: "Casino Multiplayer",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// Connect to the Mongo DB
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/blackJackDB")
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  //console.log("")
});