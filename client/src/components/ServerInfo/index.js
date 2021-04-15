import React from "react"
import "./style.css"

function ServerInfo() {
    return(
        <div className="serverWrapper">
            {/* change to props later amigo */}
            <div className="box box1">Server Name: </div>
            <div className="box box2">Created By: </div>
            <div className="box box3">Number of Players: </div>
        </div>
    )
}

export default ServerInfo