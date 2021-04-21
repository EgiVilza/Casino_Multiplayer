// SAME FILE AS BOOKS.JS
// exporting our routes
// logic for these routes is in playerController.js

const router = require('express').Router()
const playerController = require("../../controllers/playerController")
//const db = require("../../models")

router.route("/")
    .get(playerController.findAll)
    .post(playerController.create)

router.route("/:id")
    .get(playerController.findById)
    .put(playerController.update)
    .delete(playerController.remove);

router.route("/signup")
    .post(playerController.create)



module.exports = router

// router.route("/login", passport.authenticate("local", {
//     successRedirect: "/viewgame",
//     failureRedirect: "/login"
// }))

// router.post("/signup", (req, res) => {
//     db.Player.create({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     })
//     .then(user => res.json(user))
//     .catch(err => res.status(422).end())
// })

