const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/blackJackDB"
);

const playerSeed = [
  {
    name: "Ken", 
    balance: 5000
  },
  {
    name: "Pam", 
    balance: 900
  },
  {
    name: "Pat", 
    balance: 6000
  },
  {
    name: "Ren", 
    balance: 1000
  },
];

db.Player
  .remove({})
  .then(() => db.Player.collection.insertMany(playerSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
