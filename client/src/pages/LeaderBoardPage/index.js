import React, { useEffect } from "react"
import "./style.css"
import { useAppContext } from "../../utils/AppContext"
import Leaderboard from "../../components/Leaderboard"

// pulling the state and the dispatch function from useAppContext

function LeaderBoardPage() {
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
            <Leaderboard />
        </div>
    )
}

export default LeaderBoardPage