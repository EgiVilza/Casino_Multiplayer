import axios from "axios";

const apiCall = {
  // Gets all players
  getPlayers: function() {

    return axios.get("http://localhost:8080/players");
  }
};

export default apiCall

