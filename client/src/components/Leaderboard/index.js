import React from "react"
import "./style.css"

function Leaderboard(props) {
    
    let j = 1;
    const checkTie = [];
    for (const i of props.players) {
      i.order = j;
      j++;
      checkTie.push(i.balance);
    }
    for (let i = 0; i < checkTie.length; i++) {
      if (checkTie[i] === checkTie[i + 1]) {
        if (typeof props.players[i].order === "string") {
          props.players[i + 1].order = props.players[i].order;
        } else {
          props.players[i].order = "T-" + [i + 1];
          props.players[i + 1].order = props.players[i].order;
        }
      }
    }

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
            <tr key={result._id}>
              <th scope="row">{result.order}</th>
              <td>{result.username}</td>
              <td>{result.balance}</td>
            </tr>
          ))}

        </tbody>
        </table>
    )
}

export default Leaderboard