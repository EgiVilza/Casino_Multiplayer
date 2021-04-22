import React, { useEffect, useState } from "react"
import "./app.css"
import CreateServerPage from "./pages/CreateServerPage"
import ViewGamePage from "./pages/ViewGamePage"
import LeaderBoardPage from "./pages/LeaderBoardPage"
import GameBoardPage from "./pages/GameBoardPage"
import NavBar from "./components/NavBar"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { AppProvider } from "./utils/AppContext"
import {io} from "socket.io-client"


import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    console.log('hello')
   const [socket, setSocket] = useState(null)
    useEffect(() => 
    {
        var socketInEffect = io('http://localhost:8080')
        console.log(socketInEffect)
        socketInEffect.on('connect', () =>{
            console.log('Setting socket!')
            setSocket(socketInEffect)

    })
    socketInEffect.on('error', () => { console.log('erroring out')})
    }, [])
            


    return (
        <Router>
            <div>
                {socket && (
                <AppProvider value={{socket}}>
                <NavBar />
                    <Route exact path="/" component={LoginPage} />
                    <Route export path="/homepage" component={HomePage} />
                    <Route export path="/server" component={CreateServerPage} />
                    <Route exact path="/game" component={GameBoardPage} />
                    <Route export path="/viewgame" component={ViewGamePage} />
                    <Route exact path="/leaderboard" component={LeaderBoardPage} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route exact path="/login" component={LoginPage} />
                </AppProvider>)}
            </div>
        </Router>
    )
}

export default App