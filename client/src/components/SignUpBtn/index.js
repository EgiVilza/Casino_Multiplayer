import React from "react"
import "./style.css"
import Button from "../Button"

function SignUpBtn() {
    return(
        <div className="signUpBtnWrapper">
            {/* make this own component */}
            <Button 
                className="signup btn btn-primary"
                >
                Sign Up
            </Button>
        </div>
    )
}

export default SignUpBtn