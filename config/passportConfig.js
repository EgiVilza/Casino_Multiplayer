const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { Player } = require ("../models")

passport.use(new LocalStrategy(Player.authenticate()));
passport.serializeUser(Player.serializeUser());
passport.deserializeUser(Player.deserializeUser());

module.exports = passport