import React from "react"
import "./style.css"
import SignUpBtn from "../SignUpBtn" 

function Signup() {
    return(
        <div className="signupWrapper">
            {/* change to props later amigo */}
            <h1 className="signup">Signup For Free</h1>
            <input type="text" name="username" placeholder="User Name"></input>
            <input type="text" name="email" placeholder="Email"></input>
            <input type="text" name="password" placeholder="Password"></input>

            <div className="signUpInfo">
                <SignUpBtn />
                <div className="loginHere">Already have an account? Login here.</div>
            </div>
        </div>
    )
}

export default Signup