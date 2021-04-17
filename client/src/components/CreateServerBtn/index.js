import React from "react"
import "./style.css"
import Button from "../Button"

function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

// change to use props so you can use same button for other pages
function CreateServerBtn() {
    return(
        <div className="btnWrapper">
            {/* make this own component */}
            <Button className="primary"
            onClick={handleClick}
            >Create Server</Button>
        </div>
    )
}

export default CreateServerBtn