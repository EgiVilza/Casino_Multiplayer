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

// Route to signup user
router.route("/signup")
    .post(playerController.create)

// Route to login user
router.route("/login")
    .post(playerController.isLoggedIn)

router.route("/viewgame")
    .get(middleware.verifyToken, playerController.verifyCurrentToken)
    .post(middleware.verifyToken, playerController.verifyCurrentToken)

router.route("/game")
    .post(middleware.verifyToken, playerController.verifyCurrentToken)


module.exports = router
