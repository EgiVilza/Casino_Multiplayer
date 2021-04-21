import React, { useRef } from "react"
//import axios from "axios"
import "./style.css"
import LoginBtn from "../LoginBtn" 
import { Link } from "react-router-dom";

function Login() {

    const emailRef = useRef("")
    const passwordRef = useRef("")

    const onSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email: emailRef.current.value, 
                password: passwordRef.current.value
            })
        })
           
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
                    <Link
                        to="/signup"
                        >
                        Signup here.
                    </Link>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login