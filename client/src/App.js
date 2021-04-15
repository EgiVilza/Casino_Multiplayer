import React from "react"
import "./app.css"
import CreateServer from "./pages/CreateServerPage"
import ViewGame from "./pages/ViewGamePage"
import LeaderBoard from "./pages/LeaderBoardPage"
import GameBoardPage from "./pages/GameBoardPage"
import NavBar from "./components/NavBar"

import { HashRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <NavBar />
                {/* original "/" route use for sign up and login page */}
                    <Route export path="/server" component={CreateServer} />
                    <Route exact path="/game" component={GameBoardPage} />
                    <Route export path="/viewgame" component={ViewGame} />
                    <Route exact path="/leaderboard" component={LeaderBoard} />
            </div>
        </Router>
    )
}

export default App