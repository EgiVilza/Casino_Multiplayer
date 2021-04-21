let express = require('express')
let socket = require('socket.io')
let cardsLogic = require('./public/cards.js')


// App setup
let app = express();

let server = app.listen(1222, function(){
    console.log('Listening on port 1222.')
})

//Static files

app.use(express.static('public'))

//Socket set up

let io = socket(server)

//Creates initial deck on server start up
let testDeck = new cardsLogic.deck()
//shuffles the deck
testDeck.shuffle()

//Creates initial dealer on startup
let testDealer = new cardsLogic.dealer()
//Dealer completes first turn
testDealer.dealerTurn(testDeck)

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
    let dealerState = {
        score: testDealer.score
    }
    io.sockets.emit('dealer', dealerState)
    }
}

//


//Websocket that fires on connection
io.on('connection', function(socket){
    //Finds the player assosciated with the correct socket ID in the player array
    let currentPlayer = players.find(({id}) => id === socket.id)
    if (!currentPlayer) {

        //Creates new player, using their socket ID as their name
        currentPlayer = new cardsLogic.player(socket.id, 'defaultPlayerName', 1000)

        //Causes player to immediately draw two cards for their initial hand
        currentPlayer.drawCard(testDeck)
        currentPlayer.drawCard(testDeck)

        //Pushes new player into the players array
        players.push(currentPlayer)
   
    }
   
    
    //Listens for a card draw request from client
    socket.on('drawCard', function(data){
        let cardDrawSuccessful = false
        //Checks if the player has busted or is standing
        if(!currentPlayer.stand && !currentPlayer.bust){

        //Causes current player to draw a card from the deck
        currentPlayer.drawCard(testDeck)
        cardDrawSuccessful = true 
        }

        //Object that stores information about the player and game state
        
        let cardState = {
            playerID: currentPlayer.id,
            playerName: currentPlayer.name,
            playerHand: currentPlayer.hand,
            playerScore: currentPlayer.score,
            playerBust: currentPlayer.bust,
            drawSuccess: cardDrawSuccessful,
            drawnCard: currentPlayer.hand[currentPlayer.hand.length - 1],
            deckLength: testDeck.cards.length 
        }
        //Runs the dealer function
        runDealer()
        //Emits the cardState object to the client
        io.sockets.emit('drawCard', cardState)
    })


    socket.on('nameSet', function(data){
        //Finds the player assosciated with the correct socket ID in the player array
        let currentPlayer = players.find(({id}) => id === socket.id)
        //Sets the name of that player to the string received from the client
        currentPlayer.name = data.playerName
    })

    socket.on('stand', function(data){
        //Finds the player assosciated with the correct socket ID in the player array
        let currentPlayer = players.find(({id}) => id === socket.id)
        //Sets that player's stand attribute to 'true'
        currentPlayer.stand = true
        //Creates an object that stores player's name and score
        standState = {
            playerName: currentPlayer.name,
            playerScore: currentPlayer.score
        }
        //Runs the dealer function
        runDealer()
        //Emits the standState object back to the client
        io.sockets.emit('stand', standState)
    })


})