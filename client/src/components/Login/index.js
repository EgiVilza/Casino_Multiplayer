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

        // Reset messages
        setMessage("")
        setClasses("")

        // If email is missing, set message to "Email is missing"
        if (emailRef.current.value === "") {
            setMessage("Email is missing")
            setClasses(" alert alert-warning")
            return
        } 

        // Store email and password in an object
        const data = {
                    email: emailRef.current.value, 
                    password: passwordRef.current.value
                }

        // Attempt to login and recieve an alert message
        API.login(data)
            .then(results => {
                setMessage(results.message)
                setClasses(results.alert)
            })
            .catch(err => console.log(err));
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