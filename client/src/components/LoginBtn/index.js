import React from "react"
import "./style.css"
import Button from "react-bootstrap/Button"

// change to use props so you can use same button for other pages
function LoginBtn() {
    return(
        <div className="LoginBtnWrapper">
            {/* make this own component */}
            <Button variant="primary">Login</Button>
        </div>
    )
}

export default LoginBtn