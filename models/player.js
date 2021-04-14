// black-jack-react
// player schema 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Username already taken"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"]
  },
  balance: { 
    type: Number, 
    required: true 
  }
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
