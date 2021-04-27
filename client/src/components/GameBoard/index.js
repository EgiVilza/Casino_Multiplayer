import React, {useState} from "react"
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

    // Disable button states
    const [disableJoinGame, setDisableJoinGame] = useState("")
    const [disablePlaceBet, setDisablePlaceBet] = useState("disabled")
    const [disableHitStay, setDisableHitStay] = useState("disabled")
    const [disableSplit, setDisableSplit] = useState("disabled")
    const [disableSubmitScore, setDisableSubmitScore] = useState("disabled")

//Button functions
    function playerHit(e) {
        e.preventDefault();

        if (disableHitStay === "disabled") {
            return
        }

        state.socket.emit('drawCard', {});

        // If round is over, enable place bet and submit score buttons
        // and disable hit and stay buttons
        // else do nothing

      }

    function playerStay(e) {
        e.preventDefault();

        if (disableHitStay === "disabled") {
            return
        }

        state.socket.emit('stand', {});

        // Disable/Enable buttons
        // setDisableHitStay("disabled")
        setDisableSubmitScore("")
        setDisablePlaceBet("")
      }
    
    function joinGame(e) {
        e.preventDefault();

        if (disableJoinGame === "disabled") {
            return
        }

        const username = localStorage.getItem("CasinoUsername")
        state.socket.emit('joinGame', {username});
        dispatch({type: 'joinedGame', joinedGame: true})

        // Disable/Enable buttons
        setDisableJoinGame("disabled")
        setDisablePlaceBet("")
      }

    function playerBet(e) {
        e.preventDefault();

        if (disablePlaceBet === "disabled") {
            return
        }

        let betAmount = prompt('How much would you like to bet?')
        if(betAmount < asyncPlayerBank){
        state.socket.emit('bet', betAmount);

        // Disable/Enable buttons
        // setDisablePlaceBet("disabled")
        setDisableHitStay("")
      }
    }

console.log(asyncOtherPlayers)
//Conditional rendering

      
    return(
        <div className="gbWrapper">
            <div className="firstCol">
                
                <div className="amount">Amount Left: {asyncPlayerBank}</div>

                <Button className={"joinGame btn btn-success " + disableJoinGame}
                        onClick={joinGame}>
                        Join Game
                </Button>

                <Button className={"placeBet btn btn-primary " + disablePlaceBet}
                        onClick={playerBet}>
                        Place Bet
                </Button>

                <div className="innerDiv">
                    <Button className={"hit btn btn-danger " + disableHitStay}
                        onClick={playerHit}>
                        Hit
                    </Button>

                    <Button className={"stay btn btn-danger " + disableHitStay}
                        onClick={playerStay}>
                        Stay
                    </Button>

                </div>

                <Button className={"split btn btn-danger " + disableSplit}
                    onClick={handleClick}>
                    Split
                </Button>

                <Button className={"subScore btn btn-warning " + disableSubmitScore}
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

                    {player.name}'s Hand: 
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