import React from "react"


// function Button({type = "default", className, children, onClick})
function Button(props) {
    return (
        // 
        <button onClick={props.onClick} 
        className={`card-btn ${props["data-value"]}`} >
            {props.children}
        </button>
    )
}

export default Button