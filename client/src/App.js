import React from "react"
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

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <AppProvider>
                <NavBar />
                    <Route export path="/homepage" component={HomePage} />
                    <Route export path="/server" component={CreateServerPage} />
                    <Route exact path="/game" component={GameBoardPage} />
                    <Route export path="/viewgame" component={ViewGamePage} />
                    <Route exact path="/leaderboard" component={LeaderBoardPage} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route exact path="/login" component={LoginPage} />
                </AppProvider>
            </div>
        </Router>
    )
}

export default App