import React, { useEffect } from "react"
import "./style.css"
import Board from "../../components/ViewGame/Board"
import { useAppContext } from "../../utils/AppContext"


function ViewGamePage() {
    const [ state, dispatch ] = useAppContext()

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "View Game"
        })
    }, [] )
    return(
        // render components in heoh
        <div id="gameWrapper">
            <Board />
        </div>
    )
}

export default ViewGamePage