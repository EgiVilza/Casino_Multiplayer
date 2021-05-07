/* eslint-disable no-unused-vars */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return (
        <div className="loginPage">
            <Login />
        </div>
    )
}

export default LoginPage
