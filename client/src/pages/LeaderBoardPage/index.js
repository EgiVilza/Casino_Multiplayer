import React, { useEffect, useState } from "react"
import "./style.css"
//import { useAppContext } from "../../utils/AppContext"
import Leaderboard from "../../components/Leaderboard"
import API from "../../utils/API"

// pulling the state and the dispatch function from useAppContext

function LeaderBoardPage() {
    // const [state, dispatch] = useAppContext()
    const [state, setState] = useState({ players: [] })
        
    // setting the original title to Leader Board
    // useEffect(() => {
    //         dispatch({
    //             type: "changeTitle",
    //             title: "Leader Board"
    //         })
    // }, [])
        
    // Get player data to show scores
    useEffect(() => {
        API.getBalance("Pam")
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));

        API.getPlayers()
        .then(res => {
            setState({ players: res.data });
        })
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="leaderWrapper">
            <Leaderboard players={state.players} />
        </div>
    )
}

export default LeaderBoardPage