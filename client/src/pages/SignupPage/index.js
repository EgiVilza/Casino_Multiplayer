import React, { useEffect } from "react"
import Login from "../../components/Signup"
import "./style.css"
import { useAppContext } from "../../utils/AppContext"

function SignupPage() {
    const [ state, dispatch ] = useAppContext()

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "Sign up "
        })
    }, [] )

    return (  
        <div id="signUpPage">
            <Login />
        </div>
    )
}

export default SignupPage