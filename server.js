const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const router = require("./routes/api/players")
const cors = require("cors")

// websocket ish
let socket = require('socket.io')
let cardsLogic = require('./cards.js');
const playerController = require("./controllers/playerController");

const app = express("*");
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
    .connect(process.env.MONGODB_URI || "mongodb://localhost/blackJackDB",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch(err => console.log(err))

// Start the API server
let server = app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
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

//Socket set up

//Creates a game round on startup

let currentGameRound = new gameRound([])



//Function that checks if all players in the player array are done drawing cards
function allStandOrBust(){

    let everyPlayerStandOrBust = currentGameRound.players.every((player) => 
    {
       return player.bust || player.stand
    })

    return everyPlayerStandOrBust

}
//If all players are done drawing cards, causes the dealer to perform turns until he hits 17 or busts
function runDealer(){
    if(allStandOrBust()){
    for(let z = 0; !currentGameRound.dealer.bust && !currentGameRound.dealer.stand; z++){
        currentGameRound.dealer.dealerTurn(currentGameRound.deck)
    }

//For each player compares dealer's score to player score
//For each player clears their bet and awards to their bank the correct amount of money
currentGameRound.players.forEach(player => {

    if(player.score === 21){
        player.bank = player.bank + 1.5*(player.currentBet)
        player.currentBet = 0
    }
    else if(player.bust){
    
        player.currentBet = 0
    }
    else if(currentGameRound.dealer.bust){
        player.bank = player.bank + 2*(player.currentBet)
        player.currentBet = 0
    }
    else if(currentGameRound.dealer.score > player.score){
        player.currentBet = 0
    }
    else if(player.score === currentGameRound.dealer.score){
        player.bank = player.bank + player.currentBet
        player.currentBet = 0
    }
    else if(player.score > currentGameRound.dealer.score){
        player.bank = player.bank + 2*(player.currentBet)
        player.currentBet = 0
    }
   


})
//sendUpdatedGameStateToClients()
setTimeout(function() {
    let refreshedPlayersArray = []
    currentGameRound.players.forEach(player => refreshedPlayersArray.push(new cardsLogic.player(player.id, player.name, player.bank)))
    currentGameRound = new gameRound(refreshedPlayersArray)
    currentGameRound.players.forEach(player => player.drawCard(currentGameRound.deck))
    currentGameRound.players.forEach(player => player.drawCard(currentGameRound.deck))
    console.log('currentPlayers', currentGameRound.players)
    sendUpdatedGameStateToClients()
  }, 3000);


    }
    
    
    sendUpdatedGameStateToClients()
}


function sendUpdatedGameStateToClients(){

    let gameState = {
        players: currentGameRound.players,
        dealer: currentGameRound.dealer
    }
    currentGameRound.players.forEach(player => {
        io.to(player.id).emit('gameStateUpdate', gameState)})
}


//Websocket that fires on connection
io.on('connection', function(socket){

    socket.on('joinGame', function(data){
        console.log('Welcome!', socket.id
        )
        let currentPlayer = currentGameRound.players.find(({id}) => id === socket.id)
        //If there is no current player with the ID of the one connecting...
        if (!currentPlayer) {
    
            //Creates new player, using their socket ID as their name
            currentPlayer = new cardsLogic.player(socket.id, data.username, 1000)
    
            //Causes player to immediately draw two cards for their initial hand
            currentPlayer.drawCard(currentGameRound.deck)
            currentPlayer.drawCard(currentGameRound.deck)
    
            //Pushes new player into the players array
            currentGameRound.players.push(currentPlayer)
    
           sendUpdatedGameStateToClients()
        }
    })

    
    socket.on('disconnect', function(data){
        let currentPlayer = currentGameRound.players.find(({id}) => id === socket.id)
        if(typeof currentPlayer !== 'undefined' ){
        currentGameRound.players = currentGameRound.players.filter(player => player.id !== currentPlayer.id)
        sendUpdatedGameStateToClients()}
    })
    
    //Listens for a card draw request from client
    socket.on('drawCard', function(data){
        let currentPlayer = currentGameRound.players.find(({id}) => id === socket.id)
        let cardDrawSuccessful = false
        //Checks if the player has busted or is standing
        if(!currentPlayer.stand && !currentPlayer.bust){

        //Causes current player to draw a card from the deck
        currentPlayer.drawCard(currentGameRound.deck)
        cardDrawSuccessful = true 
        }
        //Runs the dealer function
        runDealer()
    })


    socket.on('nameSet', function(data){
        //Finds the player assosciated with the correct socket ID in the player array
        let currentPlayer = currentGameRound.players.find(({id}) => id === socket.id)
        //Sets the name of that player to the string received from the client
        currentPlayer.name = data.playerName
        console.log('Got name!', data)
    })

    socket.on('stand', function(data){
        //Finds the player assosciated with the correct socket ID in the player array
        let currentPlayer = currentGameRound.players.find(({id}) => id === socket.id)
        //Sets that player's stand attribute to 'true'
        currentPlayer.stand = true
        //Runs the dealer function
        runDealer()
    })

    //test



    
//test
    socket.on('bet', function(data){
        let currentPlayer = currentGameRound.players.find(({id}) => id === socket.id)
        currentPlayer.bet(parseInt(data))
       //sendUpdatedGameStateToClients()
        console.log(currentPlayer)
    
  
    })

    socket.on('loadUserBank', function(data){
        console.log('Loading user bank', data)
        let currentPlayer = currentGameRound.players.find(({id}) => id === socket.id)
        currentPlayer.bank = data
        sendUpdatedGameStateToClients()
    })

})

