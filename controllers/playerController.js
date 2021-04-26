// compare to booksController.js
const db = require("../models")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")

// defining methods for the playerController to be used for the routes
module.exports = {
    // find all the players
    findAll: function(req, res) {
        db.Player
        .find()
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
    }, 
    //find scores and player names for leaderboard
    findScores: function(req, res) {
      db.Player
      .find({}, {balance: 1, username: 1})
      .sort([['balance', -1]])
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }, 
    // create a player
    create: function(req, res) {
      let {email, username, password} = req.body
      // HASH PASSWORDS
        bcrypt.hash(password, saltRounds, function(err, hash) {
          if(err) console.log(err)
          // Store hash in your password DB.
          db.Player
          .create({username, password: hash, email})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.send("Username or email already taken").json(err))
        });
    }, 
    // find a player by their id
    findById: function(req, res) {
        db.Player
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    // update a current player
    update: function(req, res) {
      db.Player
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    // remove a player
    remove: function(req, res) {
      db.Player
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    // login to account and create a token
    isLoggedIn: function(req, res) {
      let {email, password} = req.body
      db.Player.findOne({email}).then((player) => {
        bcrypt.compare(password, player.password, function(err, result) {
          if(result) {
            jwt.sign({ result }, "casinokey", { expiresIn: "1h"} , (err, token) => {
              res.send({ token , message: "Account Logged In"})
            })
          } else {
            res.send({ message: "Invalid Login" })
          }
        })
      })
    },
    // verify token
    verifyCurrentToken: function(req, res) {
      jwt.verify(req.token, "casinokey", (err, authData) => {
        if(err) {
          res.sendStatus(403)
        } else {
          res.send({ message: "Token Verified", authData})
        }
      })
    },
      
}