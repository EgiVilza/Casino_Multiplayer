import React, {useEffect, useState} from 'react'
import { useAppContext } from '../../utils/AppContext'

const HomePage = () => {
    const [state, dispatch] = useAppContext()
    // const [cards, setCards] = useState()
    useEffect(() => {
        state.socket.on('drawCard', (data) => {
            // setCards()
        })
        state.socket.emit('nameSet', {playerName: 'BMAX'})
    }, [])
    
    return (
        <div>
            <h1>What's up, dog?</h1>
        </div>
    )
}

export default HomePage
