import React from "react"
import "./app.css"
import CreateServer from "./pages/CreateServerPage"
import ViewGame from "./pages/ViewGamePage"
import LeaderBoard from "./pages/LeaderBoardPage"
import GameBoardPage from "./pages/GameBoardPage"
import NavBar from "./components/NavBar"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import { AppProvider } from "./utils/AppContext"

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <AppProvider>
                <NavBar />
                {/* original "/" route use for sign up and login page */}
                    <Route export path="/server" component={CreateServer} />
                    <Route exact path="/game" component={GameBoardPage} />
                    <Route export path="/viewgame" component={ViewGame} />
                    <Route exact path="/leaderboard" component={LeaderBoard} />
                    <Route exact path="/signup" component={SignupPage} />
                    <Route exact path="/login" component={LoginPage} />

                </AppProvider>
            </div>
        </Router>
    )
}

export default App