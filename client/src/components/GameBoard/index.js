/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react"
import "./style.css"
import Button from "../Button"
import { useAppContext } from '../../utils/AppContext'
import API from "../../utils/API";

//Button Functions
function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
}

function GameBoard() {

    const [state, dispatch] = useAppContext()
  
    // Disable button states
    const [disableJoinGame, setDisableJoinGame] = useState("")
    const [disablePlaceBet, setDisablePlaceBet] = useState("disabled")
    const [disableHitStay, setDisableHitStay] = useState("disabled")
    const [disableSplit] = useState("disabled")
    const [disableSubmitScore, setDisableSubmitScore] = useState("disabled")

    // Submit Score
    const [submitScore, setSubmitScore] = useState("Submit Score")

    // Disable Hit / Stay buttons
    function buttonChangeClasses() {
        setDisableHitStay("disabled")
        setDisablePlaceBet("")
        setDisableSubmitScore("")
    }

    // Socket Listener
    useEffect(() => {
        state.socket.on('gameStateUpdate', function(data){

            dispatch({type: 'gameState', gameState: data})
    
            if (data.dealer.bust === true || data.dealer.stand === true || data.dealer.score >= 21) {
                buttonChangeClasses()
            }

        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

//Grabs the player object assosciated with the socket ID and names it as variable "asyncCurrentPlayer" for easier access

let asyncCurrentPlayer = {}
let asyncOtherPlayers = []
let asyncPlayerArray = []
let asyncDealerArray = []
let asyncPlayerScore = 0
let asyncDealerScore = 0
let asyncPlayerBank = 0

if(typeof state.gameState !== 'undefined'){
    asyncCurrentPlayer = state.gameState.players.find(({id}) => id === state.socket.id)
    asyncOtherPlayers = state.gameState.players.filter(player => player.id !== state.socket.id)
    asyncCurrentPlayer.hand.forEach(element => asyncPlayerArray.push(element.image))
    state.gameState.dealer.hand.forEach(element => asyncDealerArray.push(element.image))
    asyncPlayerScore = asyncCurrentPlayer.score
    asyncDealerScore = state.gameState.dealer.score
    asyncPlayerBank = asyncCurrentPlayer.bank
}

//Button functions
    function playerHit(e) {
        e.preventDefault();

        if (disableHitStay === "disabled") {
            return
        }

        state.socket.emit('drawCard', {});
      }

    function playerStay(e) {
        e.preventDefault();
        
        if (disableHitStay === "disabled") {
            return
        }

        state.socket.emit('stand', {});

        // Disable/Enable buttons
        setDisableHitStay("disabled")
      }
    
    function joinGame(e) {
        e.preventDefault();
       
        if (disableJoinGame === "disabled") {
            return
        }

        const username = localStorage.getItem("CasinoUsername")
        state.socket.emit('joinGame', {username});
        dispatch({type: 'joinedGame', joinedGame: true})

        API.getPlayers().then(res => {
            let filteredUser = res.data.filter(user => user.username === username)
            // console.log(filteredUser)
            state.socket.emit('loadUserBank', filteredUser[0].balance)
        })
    
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
        if(betAmount < asyncPlayerBank && betAmount > 0){
        state.socket.emit('bet', betAmount);

        // Disable/Enable buttons
        //setDisablePlaceBet("disabled")
        setDisableHitStay("")
        setDisableSubmitScore("disabled")
      }
    }

    function playerSubmit(e) {
        e.preventDefault();
        API.submitScore(asyncPlayerBank, asyncCurrentPlayer.name);
        setSubmitScore("Score Submitted!")

        setTimeout(() => {
            setSubmitScore("Submit Score")
          }, 5000);

        // Redirect to leaderboard
    }
 
    return(
        <div className="gbWrapper">
            <div className="firstCol">
                
                <div className="amount">Amount Left: {asyncPlayerBank}</div>

                <Button className={"joinGame btn-success " + disableJoinGame}
                        onClick={joinGame}>
                        Join Game
                </Button>

                <Button className={"placeBet btn-primary " + disablePlaceBet}
                        onClick={playerBet}>
                        Place Bet
                </Button>

                <div className="innerDiv">
                    <Button className={"hit btn-danger " + disableHitStay}
                        onClick={playerHit}>
                        Hit
                    </Button>

                    <Button className={"stay btn-danger " + disableHitStay}
                        onClick={playerStay}>
                        Stay
                    </Button>
                </div>

                <Button className={"split btn-danger " + disableSplit}
                    onClick={handleClick}>
                    Split (Currently Disabled)
                </Button>

                <Button className={"subScore btn-warning " + disableSubmitScore}
                    onClick={playerSubmit}>
                    {submitScore}
                </Button>

            </div>

            { <div className="secCol">
            

                <div className="handOfDealer">
                    <p className="handTitle">Dealer's Hand:</p>
                    <div className="dealerScoreCard">Dealer's Score: {asyncDealerScore}</div>
                     {asyncDealerArray.map((card) => (
                    <img src={`/Images/CardFaces/${card}`} key={`${card}i`} alt ={card} height='100px'></img>
                ))}
                
               

                </div>
               

                <div className="handOfPlayer"> 
                    <p className="handTitle">Players's Hand:</p>
                    <div className="playerScoreCard">Player's Score: {asyncPlayerScore >= 21 ? asyncPlayerScore : asyncPlayerScore}</div>
                    {asyncPlayerArray.map((card) => (
                    <img src={`/Images/CardFaces/${card}`} key={`${card}i`} alt ={card} height='100px'></img>
                ))}
                
                
                {asyncOtherPlayers.map((player) => <div>

                    <p className="handTitle2">{player.name}'s Hand: </p>
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