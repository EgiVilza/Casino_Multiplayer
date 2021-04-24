import React, { useEffect } from "react"
import "./style.css"
import Board from "../../components/ViewGame/Board"
import { useAppContext } from "../../utils/AppContext"
import API from "../../utils/API"

function ViewGamePage() {
    const [ state, dispatch ] = useAppContext()

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "View Game"
        })

        // API.verifyToken(API.getTokenFromLocalStorage())
        //     .then(results => {
        //         const message = results.message

        //         if (message !== "Token Verified") {
        //             window.location = "/login";
        //         }
        //     })
        //     .catch(err => console.log(err));

    }, [] )
    return(
        // render components in heoh
        <div id="gameWrapper">
            <Board />
        </div>
    )
}

export default ViewGamePage