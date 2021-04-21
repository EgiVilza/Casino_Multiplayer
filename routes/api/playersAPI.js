// SAME FILE AS BOOKS.JS
// exporting our routes
// logic for these routes is in playerController.js

const router = require('express').Router()
const playerController = require("../../controllers/playerController")
const passport = require("../../config/passportConfig")
const authenticatedFunctions = require("../../config/middleware/isAuthenticatedConfig")

router.route("/")
    .get(playerController.findAll)
    .post(playerController.create)

router.route("/:id")
    .get(playerController.findById)
    .put(playerController.update)
    .delete(playerController.remove);

router.route("/signup")
    .post(playerController.create)

router.route("/login", passport.authenticate("local"))
    .post(playerController.isLoggedIn)

module.exports = router

// router.route("/logout", function (req, res) {
//     req.logout();
//     res.redirect("/");
// });

// router.route("/login", passport.authenticate("local", {
//     successRedirect: "/viewgame",
//     failureRedirect: "/login"
// }))

// router.route("/login", passport.authenticate("local", {
//     successRedirect: "/viewgame",
//     failureRedirect: "/login"
// }), function (req, res) {
// });

// router.route("/viewgame", test.isLoggedIn, function (req, res) {
//     res.render("/viewgame")
// })

