const db = require("../models");
const {
  // card,
  deck,
  // cardAgent,
  player,
  dealer
} = require("../public/js/cards.js");
// Routes
module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/leaderboard", (req, res) => {
    //render template through handlebars
    db.players
      .findAll({
        attributes: ["name", "balance"],
        order: [["balance", "DESC"]],
        raw: true
      })
      .then(results => {
        let j = 1;
        const checkTie = [];
        for (const i of results) {
          i.order = j;
          j++;
          checkTie.push(i.balance);
        }
        for (i = 0; i < checkTie.length; i++) {
          if (checkTie[i] === checkTie[i + 1]) {
            if (typeof results[i].order === "string") {
              results[i + 1].order = results[i].order;
            } else {
              results[i].order = "T-" + [i + 1];
              results[i + 1].order = results[i].order;
            }
          }
        }
        const scoreObject = {
          players: results
        };
        res.render("leaderboard", scoreObject);
      });
  });
  app.get("/startUp", (req, res) => {
    // generate new deck
    const generatedDeck = new deck();
    //shuffles the deck
    generatedDeck.shuffle();
    //We're arbitrarily calling 5000 the default bank for now
    const generatedPlayer = new player("defaultName", 5000);
    const generatedDealer = new dealer();
    res.json(generatedDeck, generatedPlayer, generatedDealer);
  });
};
