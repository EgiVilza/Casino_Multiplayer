import React from "react"

function Input({props, className}) {
    return (
        <div className="input-grou input-group-lg">
            <input 
            className={
                ["form-control", className.join(" ")]
            } 
            type="text" {...props} />
        </div>
    )
}

export default Input