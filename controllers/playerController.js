// compare to booksController.js
const db = require("../models")
const passport = require("../config/passportConfig")
const bcrypt = require('bcrypt');
const saltRounds = 10;

// defining methods for the playerController to be used for the routes
module.exports = {
    // find all the players
    findAll: function(req, res) {
        db.Player
        .find(req.query)
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
          .catch(err => res.status(422).json(err))
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
      remove: function(req, res) {
        db.Player
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      isLoggedIn: function(req, res) {
        let {email, password} = req.body
        db.Player.findOne({email}).then((player) => {
          bcrypt.compare(password, player.password, function(err, result) {
            if(result) {
              // This works well, checks username and password against database
              // The front end is not in an authenticated state
              // look at JWT library
              // send a token in response
              // store token in local storage in front end
              // Check token on every request
              // generate a token with an expiration date of 60 minutes
              // you can make requests with that token for 60 minutes
              // when that token expires
              // you can't
              // make token middleware
              res.send("you got into my application") // token 
        }
        })
      })}
      
}