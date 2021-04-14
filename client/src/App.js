import React from "react"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import LeaderBoard from "./pages/LeaderBoardPage"
import GamePage from "./pages/GamePage"
import { HashRouter as Router, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div>

                <NavBar />
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/leaderboard" component={LeaderBoard} />
                    <Route export path="/gamepage" component={GamePage} />
            </div>
        </Router>
    )
}

export default App