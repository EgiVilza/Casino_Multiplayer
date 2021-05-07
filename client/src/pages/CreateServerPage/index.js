/* eslint-disable no-unused-vars */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return(
        <div id="chooseServer">
            <ServerInfo />
            <CreateServerBtn />
        </div>
    )
}

export default CreateServerPage