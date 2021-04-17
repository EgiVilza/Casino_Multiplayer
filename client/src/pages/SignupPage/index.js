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
    }, [] )

    return (  
        <div id="signUpPage">
            <Login />
        </div>
    )
}

export default SignupPage