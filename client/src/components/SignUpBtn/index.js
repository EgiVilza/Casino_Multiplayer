import React from "react"
import "./style.css"
import Button from "react-bootstrap/Button"

// change to use props so you can use same button for other pages
function SignUpBtn() {
    return(
        <div className="signUpBtnWrapper">
            {/* make this own component */}
            <Button variant="primary">Sign Up</Button>
        </div>
    )
}

export default SignUpBtn