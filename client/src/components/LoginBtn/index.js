import React from "react"
import "./style.css"
import Button from "../Button"
  
function LoginBtn() {
    return(
        <div className="LoginBtnWrapper">
            <Button 
                className="login">
                Login
            </Button>
        </div>
    )
}

export default LoginBtn