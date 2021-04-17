import React from "react"
import "./style.css"
import LoginBtn from "../LoginBtn" 
import { Link } from "react-router-dom";

function Login() {
    return(
        <div className="loginWrapper">
            {/* change to props later amigo */}
            <h1 className="signup">Login to Account</h1>
            <input type="text" name="email" placeholder="Email"></input>
            <input type="text" name="password" placeholder="Password"></input>

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
        </div>
    )
}

export default Login