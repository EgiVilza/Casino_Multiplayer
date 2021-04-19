const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/blackJackDB"
);

const playerSeed = [
  {
    username: "Ken", 
    email: "ken@email.com",
    password: 123456,
    balance: 5000
  },
  {
    username: "Pam",
    email: "pam@email.com",
    password: 124456,
    balance: 900
  },
  {
    username: "Pat",
    email: "pat@email.com",
    password: 125456,
    balance: 6000
  },
  {
    username: "Ren",
    email: "ren@email.com",
    password: 126456,
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
