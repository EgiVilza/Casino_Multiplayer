import React, { useEffect } from "react"
import "./style.css"
import CreateServerBtn from "../../components/CreateServerBtn"
import ServerInfo from "../../components/ServerInfo"
import { useAppContext } from "../../utils/AppContext"

function ChooseServer() {
    const [ state, dispatch ] = useAppContext()

    // setting the original title to Leader Board
    useEffect(() => {
        dispatch({
            type: "changeTitle",
            title: "Create Server"
        })
    }, [] )

    return(
        <div id="chooseServer">
            {/* make this own component */}
            <CreateServerBtn />
            <ServerInfo />
        </div>
    )
}

export default ChooseServer