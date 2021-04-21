import React, { useEffect } from "react"
import "./style.css"
import CreateServerBtn from "../../components/CreateServerBtn"
import ServerInfo from "../../components/ServerInfo"
import { useAppContext } from "../../utils/AppContext"

function CreateServerPage() {
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
            <ServerInfo />
            <CreateServerBtn />
        </div>
    )
}

export default CreateServerPage