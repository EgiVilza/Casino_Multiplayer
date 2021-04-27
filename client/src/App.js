import React, { useEffect, useState } from "react"
import "./app.css"
import CreateServerPage from "./pages/CreateServerPage"
import ViewRulesPage from "./pages/ViewRulesPage"
import LeaderBoardPage from "./pages/LeaderBoardPage"
import GameBoardPage from "./pages/GameBoardPage"
import NavBar from "./components/NavBar"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import { AppProvider } from "./utils/AppContext"
import {io} from "socket.io-client"
import { useAppContext } from "./utils/AppContext"

import { BrowserRouter as Router, Route } from "react-router-dom";

const apiURL = process.env.NODE_ENV==="development" ? "http://localhost:8080" : ""

function App() {
    console.log(useAppContext())

    console.log('hello')
    const [socket, setSocket] = useState(null)
    useEffect(() => 
    {
        var socketInEffect = io(apiURL)
        console.log(socketInEffect)
        socketInEffect.on('connect', () =>{
            console.log(socketInEffect.id)

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
                    <Route export path="/viewrules" component={ViewRulesPage} />
                    <Route exact path="/leaderboard" component={LeaderBoardPage} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route exact path="/login" component={LoginPage} />
                </AppProvider>)}
            </div>
        </Router>
    )
}

export default App