/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Burger from './Burger';
// import NavContext from "../../utils/NavContext"
// import React, { useState, useEffect } from "react";
import React from "react"
import {useAppContext} from "../../utils/AppContext"

const Nav = styled.nav`
  background-color: white;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    font-family: 'Rouge Script', cursive;
    font-size: 40px;
    color: green;
  }
`

function Navbar() {

  // pulling the state from useAppContext
  const [ state, _ ] = useAppContext()

  return (
    <Nav>
      <div className="logo">
        Blackjack Casino
      </div>

      {/* put the state.title here */}
      <h1>{state.title} </h1>
      <Burger />
    </Nav>
  )
}

export default Navbar