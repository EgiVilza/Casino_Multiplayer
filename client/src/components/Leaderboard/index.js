import React from "react"
import "./style.css"

function Leaderboard(props) {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
          {props.players.map(result => (
            <tr key={result.id}>
              <th scope="row">{result.place}</th>
              <td>{result.username}</td>
              <td>{result.balance}</td>
            </tr>
          ))}

        </tbody>

        </table>
    )
}

export default Leaderboard