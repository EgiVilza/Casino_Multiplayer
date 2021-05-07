/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import Login from "../../components/Signup"
import "./style.css"
import { useAppContext } from "../../utils/AppContext"

function SignupPage() {
    const [ state, dispatch ] = useAppContext()

    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "Sign up "
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return (  
        <div id="signUpPage">
            <Login />
        </div>
    )
}

export default SignupPage