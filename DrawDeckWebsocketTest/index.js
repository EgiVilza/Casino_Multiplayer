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

//TEST DECK
let updog = 'updog'


let testDeck = new cardsLogic.deck()
testDeck.shuffle()

let testDealer = new cardsLogic.dealer()

let players = []


//Runs a new game on Start Up


//
io.on('connection', function(socket){
    let currentPlayer = players.find(({name}) => name === socket.id)
    if (!currentPlayer) {

        //Creates new player, using their socket ID as their name
        currentPlayer = new cardsLogic.player(socket.id, 'defaultPlayerName', 1000)

        //Causes player to immediately draw two cards for their initial hand
        currentPlayer.drawCard(testDeck)
        currentPlayer.drawCard(testDeck)

        //Pushes new player into the players array
        players.push(currentPlayer)
    }
    console.log('Socket connection made by player ', currentPlayer)
    
    //Listens for a card draw request from client
    socket.on('drawCard', function(data){
        
        //Causes current player to draw a card from the deck
        currentPlayer.drawCard(testDeck)

        //Emits most recently drawn card and number of cards remaining in deck to client
        let cardState = {
            playerID: currentPlayer.id,
            playerScore: currentPlayer.score,
            drawnCard: currentPlayer.hand[currentPlayer.hand.length - 1],
            deckLength: testDeck.cards.length 
        }

        console.log('Current player just drew a card', currentPlayer)

        io.sockets.emit('drawCard', cardState)
    })

/*
    socket.on('joinGame', function(data){
        let 

    })
*/

})