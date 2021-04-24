const router = require("express").Router();
const playerRoutes = require("./players");

// Book routes
router.use("/players", playerRoutes);

module.exports = router;
