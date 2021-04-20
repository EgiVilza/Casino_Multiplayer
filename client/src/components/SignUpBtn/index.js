import React from "react"
import "./style.css"
import Button from "../Button"

function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

function SignUpBtn() {
    return(
        <div className="signUpBtnWrapper">
            {/* make this own component */}
            <Button 
                className="signup"
                // onClick={handleClick}
                onSubmit={handleClick}
                >
                Sign Up
            </Button>
        </div>
    )
}

export default SignUpBtn