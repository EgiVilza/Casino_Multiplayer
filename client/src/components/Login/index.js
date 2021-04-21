import React from "react"
import "./style.css"
import LoginBtn from "../LoginBtn" 
import { Link } from "react-router-dom";

function Login() {
    return(
        <div className="loginWrapper">
            {/* change to props later amigo */}
            <h1 className="signup">Login to Account</h1>

            {/* Login Form */}
            <form action="/login" method="POST">
                <input type="email" name="email" placeholder="Email"></input>
                <input type="password" name="password" placeholder="Password"></input>

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

        </div>
    )
}

export default Login