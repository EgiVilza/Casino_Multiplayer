import React, { useRef, useState } from "react"
import "./style.css"
import LoginBtn from "../LoginBtn" 
import { Link } from "react-router-dom";
import API from "../../utils/API"

function Login() {

    const emailRef = useRef("")
    const passwordRef = useRef("")
    
    const [message, setMessage] = useState("")
    const [classes, setClasses] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        setMessage("")
        setClasses("")

        if (emailRef.current.value === "") {
            setMessage("Email is missing")
            setClasses(" alert alert-warning")
            return
        } 

        var data = {
                    email: emailRef.current.value, 
                    password: passwordRef.current.value
                }
        API.login(data)
    }

    return(
        <div className="loginWrapper">
            {/* change to props later amigo */}
            <h1 className="signup">Login to Account</h1>

            {/* Login Form */}
            <form onSubmit={onSubmit}>
                <input type="email" ref={emailRef} name="email" placeholder="Email"></input>
                <input type="password" ref={passwordRef} name="password" placeholder="Password"></input>

                <div className="loginInfo">
                    <LoginBtn />
                    <div className="signUpHere">Don't have an account? 
                    <br></br>
                    <Link
                        to="/signup"
                        >
                        Signup here.
                    </Link>
                    </div>
                </div>
            </form>

            <p className={`message` + classes} role="alert">{message}</p>

        </div>
    )
}

export default Login