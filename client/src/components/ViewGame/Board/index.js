import React from "react"
import "./style.css"
import DealersHand from "..//DealersHand"
import PlayersHand from "../PlayersHand"


function Board() {
    return(
        <div className="boardWrapper">
            <DealersHand />
            <PlayersHand />
        </div>
        // call playersHand in here
    )
}

export default Board