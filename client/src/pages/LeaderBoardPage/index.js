import React, { useEffect } from "react"
import "./style.css"
import { useAppContext } from "../../utils/AppContext"

// pulling the state and the dispatch function from useAppContext

function LeaderBoard() {
    const [ state, dispatch ] = useAppContext()

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "Leader Board"
        })
    }, [] )

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