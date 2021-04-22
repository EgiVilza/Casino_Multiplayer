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
    
let asyncArray = []
if(typeof state.hand !== 'undefined'){
    asyncArray = state.hand
}

let asyncDealerArray = []
if(typeof state.dealerHand !== 'undefined'){
    asyncDealerArray = state.dealerHand
}


//Socket listeners
    state.socket.on('drawCard', function(data){
        console.log('Updog')
        let playersHand = []
        data.playerHand.forEach(element => playersHand.push(element.image))
        dispatch({type: 'drawCard', currentPlayerHand: playersHand})
        console.log(data.drawnCard.image);
    })

    state.socket.on('stand', function(data){
    })

    state.socket.on('dealer', function(data){
        console.log('ligma')
        let dealersHand = []
        data.hand.forEach(element => dealersHand.push(element.image))
        dispatch({type: 'dealer', currentDealerHand: dealersHand})
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
    
    
    console.log('Clock' + state.hand)
      
    return(
        <div className="gbWrapper">
            <div className="firstCol">
                
                <div className="amount">Amount Left: $5,000</div>
                <Button className="placeBet"
                        onClick={handleClick}>
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
                    <img src={`/Images/CardFaces/${card}`} alt ={card}></img>
                ))}</div>

                <div className="handOfPlayer">Player's Hand: {asyncArray.map((card) => (
                    <img src={`/Images/CardFaces/${card}`} alt ={card} height='100px'></img>
                ))}</div>

              
            </div> }

        {/* MAKE A GAME RULES COMPONENT HERE?  */}
        </div>
    )
}

export default GameBoard