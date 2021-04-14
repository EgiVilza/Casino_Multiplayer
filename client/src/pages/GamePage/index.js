import React from "react"
import GameBoard from "../../components/GameBoard"

function GamePage() {
    return(
    <div id="gamePageContainer">

        <GameBoard />

        <div className="container startGame displayNone">
            <div className="row">
                {/* Amount left and button to update the leaderboard */}
                    <div className="col amountText">
                        <label for="amountLeft">Amount Left:</label>
                        <br />
                            <h2 id="amountLeft">5000</h2>
                        <button type="button" className="btn btn-primary disabled finishButton col-auto">Submit Score</button>
                    </div>

                    {/* Form to place bet  */}
                    <form className="betForm col">
                        <label for="bet">Bet:</label>
                        <br />
                        <input type="number" id="bet" name="bet" />
                        <input type="submit" className="btn btn-danger" id="placeBet" value="Place Bet" />
                    </form>

                    {/* Buttons to hit, stay, and reset for the next round  */}
                    <div className="col">
                        <br />
                        <div className="buttons">
                            <button type="button" className="btn btn-warning disabled hitButton" id="test">Hit</button>
                            <button type="button" className="btn btn-warning disabled stayButton">Stay</button>
                            <br />
                            <br />
                            <button type="button" className="col btn btn-warning resetButton" id="resetBtn">Next Round</button>
                        </div>
                </div>
            </div>
            <br />
            <br />

            {/* Game Text to display results */}
            <p className="gameText"></p>

            </div>

    </div>
    )
}

export default GamePage