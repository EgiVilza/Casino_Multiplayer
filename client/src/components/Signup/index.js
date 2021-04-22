import React, { useRef, useState }  from "react"
import "./style.css"
import SignUpBtn from "../SignUpBtn" 
import { Link } from "react-router-dom";
import axios from "axios"

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

        if (usernameRef.current.value === "") {
            setMessage("Username is missing")
            setClasses(" alert alert-warning")
        } else if (emailRef.current.value === "") {
            setMessage("Email is missing")
            setClasses(" alert alert-warning")
        }

        var data = {
            email: emailRef.current.value, 
            password: passwordRef.current.value,
            username: usernameRef.current.value
        }

        axios.post("http://localhost:8080/signup", data)
            .then( response => {
                console.log(response)
                setMessage(response.data.username + " Account is created")
                setClasses(" alert alert-success")
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