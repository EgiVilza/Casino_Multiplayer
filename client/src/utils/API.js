import axios from 'axios';
import React, { Component } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    login(data) {  
        axios.post("http://localhost:8080/login", data)
            .then( response => {
                //get token stuff here
                // make a function to check localstorage for token and send in request if it exists
                console.log(response)
                const tokenStringify = JSON.stringify(response.data.token)
                const token = tokenStringify.substring(1).slice(0,-1)

                // Store Token in local storage
                localStorage.setItem("CasinoToken", token)

                let body = {
                    token: token,
                    headers: "bearer " + token
                }

                this.viewgame(body)
            })
    },
    signup(data) {
        axios.post("http://localhost:8080/signup", data)
            .then( response => {
                console.log(response)
            })
    },
    viewgame(data) {
        axios.post("http://localhost:8080/viewgame", data)
            .then( response => {
                console.log(response)
            })
    }
    
}