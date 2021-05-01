import axios from 'axios';

const apiURL = process.env.NODE_ENV==="development" ? "http://localhost:8080" : ""

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login(data) {
        return new Promise((resolve, reject) => {
            axios.post(apiURL + "/login", data)
            .then( response => {
                // Variable for error or login messages
                let message = {}

                //If login is not valid, set "Invalid Login" message, else set "Logged In"
                if (response.data.message !== "Account Logged In") {
                    message = { message: response.data.message, alert: " alert alert-danger"}
                    resolve(message)
                } else {
                    message = { message: "Logged In: Redirecting to game page...", alert: " alert alert-success"}
                }

                // Store token in a variable
                const tokenStringify = JSON.stringify(response.data.token)
                const token = tokenStringify.substring(1).slice(0,-1)

                // Store username in localstorage
                const username = response.data.username
                localStorage.setItem("CasinoUsername", username)

                // Store Token in local storage
                localStorage.setItem("CasinoToken", token)

                resolve(message)
            })
            .catch(err => reject(err))
        })
    },
    signup(data) {
        return new Promise((resolve, reject) => {
            axios.post(apiURL + "/signup", data)
            .then( response => {
                // Variable for error or login messages
                let message = {}

                // If err, set messsage to "Username or email already taken", else "Account Created"
                if (response.data === "Username or email already taken") {
                    message = { message: response.data, alert: " alert alert-danger"}
                } else {
                    message = { message: "Account Created", alert: " alert alert-success"}
                }

                resolve(message)
            })
            .catch(err => reject(err))
        })
    },
    verifyToken(data) {
        return new Promise((resolve, reject) => {
            axios.post(apiURL + "/game", data)
            .then( response => {
                resolve(response)
            })
            .catch(err => reject(err))
        })
    },
    getTokenFromLocalStorage() {
        // Store token in variable
        const token = localStorage.getItem("CasinoToken")

        let body = {
            token: token,
            headers: "bearer " + token
        }

        return body
    },
    getPlayers() {
        return axios.get(apiURL + "/leaderboard") 
      },
    getBalance(data) {
        return axios.get(apiURL + "/balance", {
            params: {
              username: data
            }
          }) 

      }

    }