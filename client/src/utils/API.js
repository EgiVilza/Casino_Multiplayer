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
                const token = JSON.stringify(response.data.token)
                localStorage.setItem("CasinoToken", token)
                // setMessage(response.data.message)
                // setClasses(" alert alert-danger")
            })
    },
}