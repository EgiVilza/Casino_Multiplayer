import React from "react"
import "./style.css"

function ServerInfo() {
    return(
        <div className="serverWrapper">
            {/* change to props later amigo */}
            <input type="text" name="serverName" placeholder="Server Name"></input>
            <input type="text" name="createdBy" placeholder="Created By"></input>
            <input type="text" name="playerNum" placeholder="Number of Players"></input>
        </div>
    )
}

export default ServerInfo