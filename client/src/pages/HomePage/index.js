import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../utils/AppContext'
import "./style.css"

const HomePage = () => {
    const [state, dispatch] = useAppContext()
    // const [cards, setCards] = useState()
    useEffect(() => {/*
        state.socket.on('drawCard', (data) => {
            // setCards()
        })
        state.socket.emit('nameSet', {playerName: 'BMAX'})*/
        //state.socket.emit('nameSet', { playerName: 'BMAX' })
    }, [])

    return (
        <div className="homePage">
                <h1>Multiplayer Blackjack Casino</h1>
                <p>Create a server to start playing Blackjack with friends!</p>
        </div>
    )
}

export default HomePage
