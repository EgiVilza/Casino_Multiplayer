import React from "react"
import "./style.css"
import GameBoard from "../../components/GameBoard"

function GameBoardPage() {
    return(
        <div className="gbPageWrapper">
            <GameBoard />
        </div>
    )
}

export default GameBoardPage