// Make connection if there's no currently existing socket
if(!socket){
var socket = io({autoConnect: false}).connect('http://localhost:1222')
}

//Creates socket ID variable
let socketID = ''

//Sets the socketID variable to the socket ID
socket.on('connect', function(){
})

// Query DOM
var gameState = document.getElementById('currentCard')
var setNameButton = document.getElementById('setName')
var drawCardButton = document.getElementById('drawCard')
var standButton = document.getElementById('stand')

// Event listeners for buttons, emit events over websocket when press

//Emits the results of a prompt for the players name to the server to be set in the object
setNameButton.addEventListener('click', function(){
  socket.emit('nameSet', {
    playerName: prompt('Player name?')
});
});

//Emits to the server that a player has drawn a card
drawCardButton.addEventListener('click', function(){
  socket.emit('drawCard', {

});
});

//Emits to the server that a player has decided to stand
standButton.addEventListener('click', function(){
  socket.emit('stand', {

});
});

// Listen for events
//Listens for the draw card event. Writes to the html of gameState with data received from the server about the game state
socket.on('drawCard', function(data){
 if(data.drawSuccess){
  gameState.innerHTML += '<li>' + data.playerName + ' has drawn ' + data.drawnCard.rank + ' of ' + data.drawnCard.suit + 's. Player score is now ' + data.playerScore +  '. There are ' + data.deckLength + ' remaining. </li>' ;
    if(data.playerBust){
      gameState.innerHTML += '<li>' + data.playerName + ' has busted. </li>'
    }
  }
  else{
    alert('Unable to draw additional cards.')
  }


});

//Listens for data back from the server when the player has decided to stand. Writes to the html of gameState with data recieved from teh server about game state
socket.on('stand', function(data){
  gameState.innerHTML += '<li>' + data.playerName + ' has decided to stand with a score of ' + data.playerScore + '</li>'
})


//Listens for the data emited by the runDealer() function. Writes dealer's score to the html of gameState
socket.on('dealer', function(data){
  gameState.innerHTML += '<li> Dealer score: ' + data.score + '</li>'
})

//Sample socket for convenient copy and pasting
socket.on('receiveData', function(data){
  console.log('This is the received data:')
  console.log(data)
})