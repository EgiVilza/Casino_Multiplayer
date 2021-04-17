// Make connection
if(!socket){
var socket = io({autoConnect: false}).connect('http://localhost:1222')
}

//
let socketID = ''

socket.on('connect', function(){
  socketID = socket.id
})

// Query DOM
var gameState = document.getElementById('currentCard')
var joinGameButton = document.getElementById('joinGame')
var drawCardButton = document.getElementById('drawCard')
var standButton = document.getElementById('stand')

// Event listeners for buttons, emit events


joinGameButton.addEventListener('click', function(){
  socket.emit('stand', {

});
});

drawCardButton.addEventListener('click', function(){
  socket.emit('drawCard', {

});
});

standButton.addEventListener('click', function(){
  socket.emit('stand', {

});
});

// Listen for events
socket.on('drawCard', function(data){
  gameState.innerHTML += '<li>' + data.playerID + ' has drawn ' + data.drawnCard.rank + ' of ' + data.drawnCard.suit + 's. Player score is now ' + data.playerScore +  'There are ' + data.deckLength + ' remaining. </li>' ;
});

//
socket.on('receiveData', function(data){
  console.log('This is the received data:')
  console.log(data)
})