import React from "react"
import "./style.css"

function GameBoard() {
    return(
        <div className="gbWrapper">
          {/* change to use props and make separate components for each part */}
            <div className="firstCol">
                <div className="amount">Amount Left: $5,000</div>
                <button className="placeBet">Place Bet</button>

                <div className="innerDiv">
                    <button className="hit">Ht</button>
                    <button className="stay">Stay</button>
                </div>

                <button className="split">Split</button>
                <button className="subScore">Submit Score</button>
            </div>

            <div className="secCol">
                <div className="handOfDealer">Dealer's Hand: </div>
                <div className="handOfPlayer">Player's Hand: </div>
            </div>

        </div>
    )
}

export default GameBoard