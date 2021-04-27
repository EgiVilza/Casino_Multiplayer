import React, { useEffect, useState } from "react"
import "./style.css"
//import Board from "../../components/ViewGame/Board"
import ViewRules from "../../components/ViewRules"
import { useAppContext } from "../../utils/AppContext"
import API from "../../utils/API"
import { Redirect } from "react-router-dom"

function ViewRulesPage() {
    const [ state, dispatch ] = useAppContext()

    const [isVerified, setIsVerified] = useState(true)

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "View Rules"
        })

        // Verifys token, if token is not verified, the user will be directed
        // To login page
        API.verifyToken(API.getTokenFromLocalStorage())
            .then(results => {
                const message = results.data.message

                if (message !== "Token Verified") {
                    dispatch({type: 'isLoggedIn', payload:"hidden"})
                    dispatch({type: 'isLoggedOut', payload: ""})
                    setIsVerified(false)
                }
            })
            .catch(err => {
                dispatch({type: 'isLoggedIn', payload:"hidden"})
                dispatch({type: 'isLoggedOut', payload: ""})
                setIsVerified(false)
            } );

    }, [] )


    return(
        // render components 
        <div id="gameWrapper">
            {!isVerified ? <Redirect to="/login" /> : <ViewRules />}
        </div>
    )
}

export default ViewRulesPage