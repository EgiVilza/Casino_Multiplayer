import React, { useEffect, useState } from "react"
import "./style.css"
import GameBoard from "../../components/GameBoard"
import { useAppContext } from "../../utils/AppContext"
import { Redirect } from "react-router-dom"
import API from "../../utils/API"

function GameBoardPage() {
    const [ state, dispatch ] = useAppContext()

    const [isVerified, setIsVerified] = useState(true)

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "Game Board"
        })

        // Verifys token, if token is not verified, the user will be directed
        // To login page
        API.verifyToken(API.getTokenFromLocalStorage())
            .then(results => {
                const message = results.data.message

                if (message !== "Token Verified") {
                    setIsVerified(false)
                }
            })
            .catch(err => setIsVerified(false));

    }, [] )

    return(
        <div className="gbPageWrapper">
            {!isVerified ? <Redirect to="/login" /> : <GameBoard />}
        </div>
    )
}

export default GameBoardPage