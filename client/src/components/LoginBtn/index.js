import React from "react"
import "./style.css"
import Button from "../Button"

function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  
function LoginBtn() {
    return(
        <div className="LoginBtnWrapper">
            <Button 
                className="login"
                onClick={handleClick}>
                Login
            </Button>
        </div>
    )
}

export default LoginBtn