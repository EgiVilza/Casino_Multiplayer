import React, { useEffect } from "react"
import "./style.css"
import GameBoard from "../../components/GameBoard"
import { useAppContext } from "../../utils/AppContext"

function GameBoardPage() {
    const [ state, dispatch ] = useAppContext()

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "Game Board"
        })
    }, [] )

    return(
        <div className="gbPageWrapper">
            <GameBoard />
        </div>
    )
}

export default GameBoardPage