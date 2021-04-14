import React from "react"
import "./style.css"
import { Link } from "react-router-dom"

function NavBar() {
    return(
        <div id="navBarContainer">
            <nav className="navBar">
                <ul className="nav">
                    <li className="nav-item" id="homePageLink">
                        <Link 
                            to="/"
                            className="nav-link active homeTitle" 
                            aria-current="page" 
                        >   
                         Black Jack Casino
                        </Link>
                    </li>
                    <li className="nav-item" id="scoreBoardLink">
                        <Link 
                            to="/leaderboard"
                            className="nav-link scoreboardTitle" 
                            aria-current="page" 
                        >   
                         LeaderBoard
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar