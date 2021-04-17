import React, { useEffect } from "react"
import Login from "../../components/Login"
import "./style.css"
import { useAppContext } from "../../utils/AppContext"

const LoginPage = () => {
    const [ state, dispatch ] = useAppContext()

    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "Login"
        })
    }, [] )

    return (
        <div className="loginPage">
            <Login />
        </div>
    )
}

export default LoginPage
