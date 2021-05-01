import React, { useRef, useState }  from "react"
import "./style.css"
import SignUpBtn from "../SignUpBtn" 
import { Link, Redirect } from "react-router-dom";
import API from "../../utils/API"
import {useAppContext} from '../../utils/AppContext'

function Signup() {

    const [state, dispatch] = useAppContext();

    const usernameRef = useRef("")
    const emailRef = useRef("")
    const passwordRef = useRef("")

    const [message, setMessage] = useState("")
    const [classes, setClasses] = useState("")

    // Check if token is verified
    const [isVerified, setIsVerified] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        // Reset messages
        setMessage("")
        setClasses("")

        // store user password in a variable
        const password = passwordRef.current.value

        // If username/email is empty, display missing and return, 
        // If password is less than 6 characters, display "password needs 6 characters"
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

        // Store email, password, and username in an object
        let data = {
            email: emailRef.current.value, 
            password: passwordRef.current.value,
            username: usernameRef.current.value
        }

        let loginData = {
            email: emailRef.current.value, 
            password: passwordRef.current.value
        }

        // Attempt to sign up an account a recieve an alert message
        // When signed up, redirect to login page
        API.signup(data)
            .then(results => {
                if (results.message === "Account Created") {
                    setMessage(results.message + ": Redirecting to game page...")
                    LoginToGame(loginData)
                } else {
                    setMessage(results.message)
                }
                setClasses(results.alert)

                setTimeout(() => {
                    if (results.message === "Account Created") {

                        // Display game links and hide signup/login links
                        dispatch({
                            type: 'isLoggedIn',
                            payload: ""
                        })
                        dispatch({
                            type: 'isLoggedOut',
                            payload: "hidden"
                        })

                        setIsVerified(true)
                    }
                  }, 3000);
            })
            .catch(err => console.log(err));
    }

    const LoginToGame = (data) => {
        API.login(data)
            .catch(err => setMessage(err));
    }
        

    return(
        <div className="signupWrapper">
            {isVerified ? <Redirect to="/game" /> : ""}
            {/* change to props later amigo */}
            <h1 className="signup">Signup For Free</h1>

            {/* Signup Form */}
            <form className="signupWrapper__form" onSubmit={onSubmit}>
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