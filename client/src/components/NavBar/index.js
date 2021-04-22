/* eslint-disable no-unused-vars */
import React from "react"
import styled from 'styled-components';
import Burger from './Burger';
import {useAppContext} from "../../utils/AppContext"
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: white;
  opacity: 0.75;
  width: 100%;
  height: 55px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    font-family: 'Rouge Script', cursive;
    font-size: 40px;
  }
  a {
    color: red;
  }
`

function Navbar() {

  const [ state, _ ] = useAppContext()

  return (
    <Nav>
      <div className="logo">
        <Link
          to="/homepage"
          >
          Home
        </Link>
      </div>
      <h1>{state.title} </h1>
      <Burger />
    </Nav>
  )
}

export default Navbar