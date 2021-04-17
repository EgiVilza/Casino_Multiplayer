import React from "react"
import "./style.css"
import Button from "../Button"

function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

function GameBoard() {
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
                        onClick={handleClick}>
                        Ht
                    </Button>

                    <Button className="stay"
                        onClick={handleClick}>
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

            <div className="secCol">
                <div className="handOfDealer">Dealer's Hand: </div>
                <div className="handOfPlayer">Player's Hand: </div>
            </div>

        {/* MAKE A GAME RULES COMPONENT HERE?  */}
        </div>
    )
}

export default GameBoard