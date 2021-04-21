// black-jack-react
// player schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Username already taken"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Username already taken"],
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    match: [/.{6,}/, "Password must have at least 6 characters"]
  },
  balance: { 
    type: Number, 
    required: true,
    default: 5000 
  }
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
