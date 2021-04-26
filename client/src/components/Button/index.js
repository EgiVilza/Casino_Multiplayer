import React from "react"


// function Button({type = "default", className, children, onClick})
// function Button(props, {className}) {
//     return (
//         // 
//         <button onClick={props.onClick} 
//         className={`card-btn ${className} ${props["data-value"]}`} >
//             {props.children}
//         </button>
//     )
// }

function Button({type = "default", className, children, onClick}) {
    return (
        <button onClick={onClick} className={`btn btn-${type} ${className}`}>
            {children}
        </button>
    )
}

export default Button