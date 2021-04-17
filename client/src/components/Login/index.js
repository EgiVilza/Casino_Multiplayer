import React from "react"
import "./style.css"
import LoginBtn from "../LoginBtn" 

function Login() {
    return(
        <div className="signupWrapper">
            {/* change to props later amigo */}
            <h1 className="signup">Login to Account</h1>
            <input type="text" name="email" placeholder="Email"></input>
            <input type="text" name="password" placeholder="Password"></input>

            <div className="signUpInfo">
                <LoginBtn />
                <div className="loginHere">Don't have an account? Signup here.</div>
            </div>
        </div>
    )
}

export default Login