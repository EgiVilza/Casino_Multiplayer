import React from "react"
import "./style.css"
import SignUpBtn from "../SignUpBtn" 
import { Link } from "react-router-dom";


function Signup() {
    return(
        <div className="signupWrapper">
            {/* change to props later amigo */}
            <h1 className="signup">Signup For Free</h1>

            {/* Signup Form */}
            <form action="/signup" method="POST">
                <input type="text" name="username" placeholder="User Name"></input>
                <input type="email" name="email" placeholder="Email"></input>
                <input type="password" name="password" placeholder="Password"></input>

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