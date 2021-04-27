import React from "react"
import "./style.css"

const ViewRules = () => {
    return (
        <div className="viewRules">
            <h1>Rules</h1>
            <ul>
                <li>
                The goal of blackjack is to beat the dealer's hand without going over 21.
                </li>
                <li>
                Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand. Number cards are worth their value.
                </li>
                <li>
                Press 'Hit' to draw a card. Press 'Stand' to hold your total.
                </li>
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
    )
}

export default ViewRules