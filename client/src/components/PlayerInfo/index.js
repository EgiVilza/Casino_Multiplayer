import React, {useCallback} from "react"
import {useHistory} from 'react-router-dom'
// import "./style.css"


function PlayerInfo() {
    // setting up route to take to gamepage
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/gamepage'), [history]);

    return(
            <div className="container pageInteraction">
                <br />
                <div className="row"> <h3>Rules:</h3> </div>
                    <div className="row">
                        <div className="col">
                            <ul className="displayToggle rules">
                                <li>
                                The goal of blackjack is to beat the dealer's hand without going over 21.
                                </li>
                                <li>
                                Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand. Number cards are worth their value.
                                </li>
                                <li>
                                Press 'Hit' to draw a card. Press 'Stand' to hold your total.
                                </li>
                            </ul>
                        </div>

                         <div className="col">
                            <ul className="displayToggle rules">
                                <li>
                                If you go over 21, you bust, and the dealer wins.
                                </li>
                                <li>
                                If you are dealt 21 from the start (Ace & 10), you recieve 1.5x your bet.
                                </li>
                                <li>
                                If dealer's hand reaches 17 points, dealer will not draw any more cards and end their turn.
                                </li>
                            </ul>
                        </div>

                    <form className="betForm col">
                        <label for="bet" >Enter Name To Start:</label>
                        <br />
                        <input type="text" id="name" name="name" />
                        {/* when this is clicked, it takes you to the playing page 
                        route is "/gamepage" */}
                        <input type="submit" className="btn btn-danger" id="submitName" value="Submit" onClick={handleOnClick}/>
                    </form>
            </div>
        </div>
    )
}

export default PlayerInfo