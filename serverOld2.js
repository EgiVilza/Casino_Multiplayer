const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const router = require("./routes/api/playersAPI")
const cors = require("cors")

// websocket ish
let socket = require('socket.io')
let cardsLogic = require('./cards.js');
const playerController = require("./controllers/playerController");

const app = express();
const PORT = process.env.PORT || 8080;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


//Requiring routes
app.use(cors())
app.use(router)

//Use sessions to keep track of the user's login status
app.use(session({
  secret: "Casino Multiplayer",
  resave: false,
  saveUninitialized: false
}))

// Connect to the Mongo DB
mongoose
    .connect(process.env.MONGODB_URI || "mongodb://localhost/blackJackDB")
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

// Start the API server
let server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  //console.log("")
});


//Socket set up

let io = socket(server, {cors: { origin: '*'}})



//Round class

class gameRound {
    constructor(players) {
      this.deck = new cardsLogic.deck();
      this.deck.shuffle()
      this.dealer = new cardsLogic.dealer();
      this.dealer.dealerTurn(this.deck)
      this.players = players;
    }}


//Creates initial deck on server start up
let testDeck = new cardsLogic.deck()
//shuffles the deck
testDeck.shuffle()

//Creates initial dealer on startup
let testDealer = new cardsLogic.dealer()
//Dealer completes first turn
testDealer.dealerTurn(testDeck)

let currentGameRound = new gameRound([])

//Array for storing player objects server side
let players = []

//Function that checks if all players in the player array are done drawing cards
function allStandOrBust(){

    let everyPlayerStandOrBust = players.every((player) => 
    {
       return player.bust || player.stand
    })

    return everyPlayerStandOrBust

}
//If all players are done drawing cards, causes the dealer to perform turns until he hits 17 or busts
function runDealer(){
    if(allStandOrBust()){
    for(let z = 0; !testDealer.bust && !testDealer.stand; z++){
        testDealer.dealerTurn(testDeck)
    }

//For each player compares dealer's score to player score
//For each player clears their bet and awards to their bank the correct amount of money
players.forEach(player => {

    if(player.score === 21){
        player.bank = player.bank + 1.5*(player.currentBet)
        player.currentBet = 0
    }
    if(player.bust){
    
        player.currentBet = 0
    }
    else if(testDealer.bust && !player.bust){
        player.bank = player.bank + 2*(player.currentBet)
        player.currentBet = 0
    }
    else if(testDealer.score > player.score){
        player.currentBet = 0
    }
    else if(player.score === testDealer.score){
        player.bank = player.bank + player.currentBet
        player.currentBet = 0
    }
    else if(player.score > testDealer.score){
        player.bank = player.bank + 2*(player.currentBet)
        player.currentBet = 0
    }
   

})

    }
    sendUpdatedGameStateToClients()
}


function sendUpdatedGameStateToClients(){

    let gameState = {
        players: players,
        dealer: testDealer
    }
    players.forEach(player => {
        io.to(player.id).emit('gameStateUpdate', gameState)})
}


//Websocket that fires on connection
io.on('connection', function(socket){

    socket.on('joinGame', function(data){
        console.log('Welcome!', socket.id
        )
        let currentPlayer = players.find(({id}) => id === socket.id)
        //If there is no current player with the ID of the one connecting...
        if (!currentPlayer) {
    
            //Creates new player, using their socket ID as their name
            currentPlayer = new cardsLogic.player(socket.id, 'defaultPlayerName', 1000)
    
            //Causes player to immediately draw two cards for their initial hand
            currentPlayer.drawCard(testDeck)
            currentPlayer.drawCard(testDeck)
    
            //Pushes new player into the players array
            players.push(currentPlayer)
    
           sendUpdatedGameStateToClients()
        }
    })

    
    socket.on('disconnect', function(data){
        let currentPlayer = players.find(({id}) => id === socket.id)
        players = players.filter(player => player.id !== currentPlayer.id)
        sendUpdatedGameStateToClients()
    })
    
    //Listens for a card draw request from client
    socket.on('drawCard', function(data){
        let currentPlayer = players.find(({id}) => id === socket.id)
        let cardDrawSuccessful = false
        //Checks if the player has busted or is standing
        if(!currentPlayer.stand && !currentPlayer.bust){

        //Causes current player to draw a card from the deck
        currentPlayer.drawCard(testDeck)
        cardDrawSuccessful = true 
        }
        //Runs the dealer function
        runDealer()
        //Emits the cardState object to the client
        sendUpdatedGameStateToClients()
    })


    socket.on('nameSet', function(data){
        //Finds the player assosciated with the correct socket ID in the player array
        let currentPlayer = players.find(({id}) => id === socket.id)
        //Sets the name of that player to the string received from the client
        currentPlayer.name = data.playerName
        console.log('Got name!', data)
    })

    socket.on('stand', function(data){
        //Finds the player assosciated with the correct socket ID in the player array
        let currentPlayer = players.find(({id}) => id === socket.id)
        //Sets that player's stand attribute to 'true'
        currentPlayer.stand = true
        //Runs the dealer function
        runDealer()
        //Emits the standState object back to the client
        sendUpdatedGameStateToClients()
    })

    //test


//test
    socket.on('bet', function(data){
        let currentPlayer = players.find(({id}) => id === socket.id)
        currentPlayer.bet(parseInt(data))
        sendUpdatedGameStateToClients()
        console.log(currentPlayer)
    })

})

