import React, { useRef}  from "react"
import "./style.css"
import SignUpBtn from "../SignUpBtn" 
import { Link } from "react-router-dom";

function Signup() {

    const usernameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const onSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                email: emailRef.current.value, 
                password: passwordRef.current.value, 
                username: usernameRef.current.value
            })
        })
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
                    <Link
                        to="/login"
                        >
                        Login here.
                    </Link>
                </div>
                </div>   
            </form>
            
        </div>
    )
}

export default Signup