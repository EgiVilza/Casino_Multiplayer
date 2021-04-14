import React from "react"
import NavBar from '../../components/NavBar'
import "./style.css"

function LeaderBoard() {
    return (
        <div id="leaderBoardContainer">
            <br />
                <div className="container">
                    <h1 className="tableText">LEADERBOARD</h1>
                    <br />
                        <table className="table">
                            <thead className="tableText">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Score</th>
                                </tr>
                            </thead>
                            <tbody className="tableTitle">
                                {/* {{ #each players }} */}
                                <tr>
                                    {/* <td>{{ this.order }}</td>
                                    <td>{{ this.name }}</td>
                                    <td>${{ this.balance }}</td> */}
                                </tr>
                                {/* {{/ each}} */}
                            </tbody>
                        </table>

                </div>
        </div>
    )
}

export default LeaderBoard