import React, { useRef, useState }  from "react"
import "./style.css"
import SignUpBtn from "../SignUpBtn" 
import { Link } from "react-router-dom";
import axios from "axios"
import API from "../../utils/API"

function Signup() {

    const usernameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const [message, setMessage] = useState("")
    const [classes, setClasses] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        setMessage("")
        setClasses("")

        const password = passwordRef.current.value

        if (usernameRef.current.value === "") {
            setMessage("Username is missing")
            setClasses(" alert alert-warning")
            return
        } else if (emailRef.current.value === "") {
            setMessage("Email is missing")
            setClasses(" alert alert-warning")
            return
        } else if (password.length < 6) {
            setMessage("Password needs at least 6 characters")
            setClasses(" alert alert-warning")
            return
        }

        var data = {
            email: emailRef.current.value, 
            password: passwordRef.current.value,
            username: usernameRef.current.value
        }
        API.signup(data)

        setMessage("Account Created")
        setClasses(" alert alert-success")

    }
        

    return(
        <div className="signupWrapper">
            {/* change to props later amigo */}
            <h1 className="signup">Signup For Free</h1>

            {/* Signup Form */}
            <form onSubmit={onSubmit}>
                <input type="text" ref={usernameRef} name="username" placeholder="User Name"></input>
                <input type="email" ref={emailRef} name="email" placeholder="Email"></input>
                <input type="password" ref={passwordRef} name="password" placeholder="Password"></input>

                <div className="signUpInfo">
                    <SignUpBtn />
                    <div className="loginHere">Already have an account?
                    <br></br>
                    <Link
                        to="/login"
                        >
                        Login here.
                    </Link>
                </div>
                </div>   
            </form>
            
            <p className={`message` + classes} role="alert">{message}</p>
        </div>
    )
}

export default Signup