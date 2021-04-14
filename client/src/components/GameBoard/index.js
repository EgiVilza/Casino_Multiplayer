import React from "react"
import "./style.css"


// maybe turn this into a page and then break up these two sections into components? - YES
function GameBoard() {
    return (
        <div id="gameBoardContainer">
            <br />
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="tableTitle col-auto">BLACKJACK PAYS 3 TO 2</div>
                    <div className="col"></div>
                </div>

                <div className="row">
                    <div className="col"></div>
                    <div className="tableText col-auto">INSURANCE PAYS 2 TO 1</div>
                    <div className="col"></div>
                </div>

                <div className="row">
                    <div className="col playersHandText">Player's Hand</div>
                    <div className="col"></div>
                    <div className="col dealersHandText">Dealer's Hand</div>
                </div>

                <div className="row">
                    <div className="col cards playersHand"></div>
                    <div className="col">
                        <div className="betAmountDiv">
                            <input type="text" id="betAmount" value="0" />
                        </div>
                    </div>
                    <div className="col cards dealersHand"></div>
                </div>
            </div>
        </div>
    )
}

export default GameBoard