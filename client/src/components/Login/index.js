import React, { useRef, useState } from "react"
import "./style.css"
import LoginBtn from "../LoginBtn" 
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API";
import {useAppContext} from '../../utils/AppContext'

function Login() {

    const [state, dispatch] = useAppContext();

    const emailRef = useRef("")
    const passwordRef = useRef("")
    
    const [message, setMessage] = useState("")
    const [classes, setClasses] = useState("")

    // Check if token is verified
    const [isVerified, setIsVerified] = useState(true)

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
        // When logged in, redirect to game page
        API.login(data)
            .then(results => {
                setMessage(results.message)
                setClasses(results.alert)
                dispatch({
                    type: 'isLoggedIn',
                    payload: true
                })

                if (results.message === "Logged In") {
                    setIsVerified(false)
                }
            })
            .catch(err => console.log(err));
    }

    return(
        <div className="loginWrapper">
            {!isVerified ? <Redirect to="/viewgame" /> : ""}
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