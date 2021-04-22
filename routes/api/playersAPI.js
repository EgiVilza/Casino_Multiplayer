// SAME FILE AS BOOKS.JS
// exporting our routes
// logic for these routes is in playerController.js

const router = require('express').Router()
const middleware = require("../../config/middleware/jsonWebToken")
const playerController = require("../../controllers/playerController")

router.route("/")
    .get(playerController.findAll)
    .post(playerController.create)

router.route("/:id")
    .get(playerController.findById)
    .put(playerController.update)
    .delete(playerController.remove);

router.route("/signup")
    .post(playerController.create)

router.route("/login")
    .post(playerController.isLoggedIn)

router.route("/viewgame")
    .post(middleware.verifyToken, playerController.verifyCurrentToken)


module.exports = router
