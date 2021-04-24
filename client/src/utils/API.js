import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login(data) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/login", data)
            .then( response => {
                // Variable for error or login messages
                let message = {}

                //If login is not valid, set "Invalid Login" message, else set "Logged In"
                if (response.data.message === "Invalid Login") {
                    message = { message: "Invalid Login", alert: " alert alert-danger"}
                    resolve(message)
                } else {
                    message = { message: "Logged In", alert: " alert alert-success"}
                }

                // Store token in a variable
                const tokenStringify = JSON.stringify(response.data.token)
                const token = tokenStringify.substring(1).slice(0,-1)

                // Store Token in local storage
                localStorage.setItem("CasinoToken", token)

                resolve(message)
            })
            .catch(err => reject(err))
        })
    },
    signup(data) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/signup", data)
            .then( response => {
                console.log(response)

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
    postToSocket(data) {
        axios.post("http://localhost:8080/game", data)
            .then( response => {
                console.log(response)
            })
    },
    verifyToken(data) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8080/game", data)
            .then( response => {
                resolve(response)
            })
            .catch(err => reject(err))
        })
    },
    getTokenFromLocalStorage() {
        const token = localStorage.getItem("CasinoToken")

        let body = {
            token: token,
            headers: "bearer " + token
        }

        return body
    },
    getPlayers() {
        return axios.get("http://localhost:8080/leaderboard") 
      }
    }