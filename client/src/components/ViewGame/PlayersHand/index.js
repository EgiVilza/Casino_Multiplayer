// make two rows with two columns
// top row has the colums on left and right sides
// bottom row has them more in the middle
// use grid layout for this ish

import React from "react"
import "./style.css"

function PlayersHand() {
    return(

        // Maybe click on player and it brings up a modal with their hand? 
        <div className="playersHand">

            <div className="firstPlayersColumn">
                <div className="pOne">Player 1</div>
                <div className="pTwo">Player 2</div>
            </div>
            
            <div className="secondPlayersColumn">
                <div className="pThree">Player 3</div>
                <div className="pFour">Player 4</div>
            </div>

        </div>
    )
}

export default PlayersHand