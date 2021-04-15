import React from "react"
import "./style.css"

function LeaderBoard() {
    return(
        <div className="leaderWrapper">
            {/* use props later*/}
            <div className="number">#: </div>
            <div className="username">Username: </div>
            <div className="score">Score/Bet: </div>
        </div>
    )
}

export default LeaderBoard