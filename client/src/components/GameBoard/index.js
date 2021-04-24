import React from "react"
import "./style.css"
import Button from "../Button"
import { useAppContext } from '../../utils/AppContext'


//Button Functions
function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }



function GameBoard() {

    const [state, dispatch] = useAppContext()

//Grabs the player object assosciated with the socket ID and names it as variable "asyncCurrentPlayer" for easier access

let asyncCurrentPlayer = {}
if(typeof state.gameState !== 'undefined'){
    asyncCurrentPlayer = state.gameState.players.find(({id}) => id === state.socket.id)
    }


let asyncOtherPlayers = []
if(typeof state.gameState !== 'undefined'){
    asyncOtherPlayers = state.gameState.players.filter(player => player.id !== state.socket.id)
}

//Renders dealer and player hands and score as empty to avoid mapping over undefined data

let asyncPlayerArray = []
if(typeof state.gameState !== 'undefined'){
asyncCurrentPlayer.hand.forEach(element => asyncPlayerArray.push(element.image))
}

let asyncDealerArray = []
if(typeof state.gameState !== 'undefined'){
    
state.gameState.dealer.hand.forEach(element => asyncDealerArray.push(element.image))
}

let asyncPlayerScore = 0
if(typeof state.gameState !== 'undefined'){
    asyncPlayerScore = asyncCurrentPlayer.score
}

let asyncDealerScore = 0
if(typeof state.gameState !== 'undefined'){
    asyncDealerScore = state.gameState.dealer.score
}

let asyncPlayerBank = 0
if(typeof state.gameState !== 'undefined'){
    asyncPlayerBank = asyncCurrentPlayer.bank
}


//Socket listeners

    state.socket.on('gameStateUpdate', function(data){
        dispatch({type: 'gameState', gameState: data})
    })


//Button functions
    function playerHit(e) {
        e.preventDefault();
        state.socket.emit('drawCard', {});
      }

    function playerStay(e) {
        e.preventDefault();
        state.socket.emit('stand', {});
      }
    
    function joinGame(e) {
        e.preventDefault();
        state.socket.emit('joinGame', {});
        dispatch({type: 'joinedGame', joinedGame: true})
      }

    function playerBet(e) {
        e.preventDefault();
        let betAmount = prompt('How much would you like to bet?')
        if(betAmount < asyncPlayerBank){
        state.socket.emit('bet', betAmount);
      }
    }

console.log(asyncOtherPlayers)
//Conditional rendering

      
    return(
        <div className="gbWrapper">
            <div className="firstCol">
                
                <div className="amount">Amount Left: {asyncPlayerBank}</div>

                <Button className="joinGame"
                        onClick={joinGame}>
                        Join Game
                </Button>

                <Button className="placeBet"
                        onClick={playerBet}>
                        Place Bet
                </Button>

                <div className="innerDiv">
                    <Button className="hit"
                        onClick={playerHit}>
                        Hit
                    </Button>

                    <Button className="stay"
                        onClick={playerStay}>
                        Stay
                    </Button>

                </div>

                <Button className="split"
                    onClick={handleClick}>
                    Split
                </Button>

                <Button className="subScore"
                    onClick={handleClick}>
                    Submit Score
                </Button>

            </div>

            { <div className="secCol">
            

                <div className="handOfDealer">Dealer's Hand: {asyncDealerArray.map((card) => (
                    <img src={`/Images/CardFaces/${card}`} alt ={card} height='100px'></img>
                ))}
                
                <div className="dealerScoreCard">Dealer's Score: {asyncDealerScore}
                </div>

                </div>
               

                <div className="handOfPlayer">Player's Hand: {asyncPlayerArray.map((card) => (
                    <img src={`/Images/CardFaces/${card}`} alt ={card} height='100px'></img>
                ))}
                
                <div className="playerScoreCard">Player's Score: {asyncPlayerScore}
                
                </div>
                {asyncOtherPlayers.map((player) => <div>

                    {player.id}'s Hand: 
                    {player.hand.map((card) =>(
                        <img src={`/Images/CardFaces/${card.image}`} alt ={card.image} height='100px'></img>))}

                </div>)}
                </div>

              
            </div> }

        {/* MAKE A GAME RULES COMPONENT HERE?  */}
        </div>
    )
}

export default GameBoard