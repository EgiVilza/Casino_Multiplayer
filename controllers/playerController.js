// compare to booksController.js
const db = require("../models")

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
        db.Player
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
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
      }
}