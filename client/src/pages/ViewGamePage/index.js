import React from "react"
import "./style.css"
import Board from "../../components/ViewGame/Board"

function Game() {
    return(
        // render components in heoh
        <div id="gameWrapper">
            <Board />
        </div>
    )
}

export default Game