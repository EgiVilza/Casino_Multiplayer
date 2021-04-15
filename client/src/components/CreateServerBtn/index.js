// build it all on here first, then break down into components and render them in this file
// new navbar with a hamburger menu
// use props in the navbar to change heading! - Make general page of this first
// set up route to render this page

// we want one big box
// inside that box we want 4 rows
// first row is just a create server button
// next three are rows for the server info

import React from "react"
import "./style.css"
import Button from "react-bootstrap/Button"

function CreateServerBtn() {
    return(
        <div className="btnWrapper">
            {/* make this own component */}
            <Button variant="primary">Create Server</Button>
        </div>
    )
}

export default CreateServerBtn