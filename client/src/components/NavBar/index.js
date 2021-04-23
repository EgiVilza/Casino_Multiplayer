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
  .navTitle {
    margin: auto;
  }

  @media (max-width: 400px) {
    .navTitle {
      visibility: hidden;
    }
  }
`

function Navbar() {

  const [ state, _ ] = useAppContext()

  return (
    <Nav>
      <div>
        <Link
          to="/homepage"
          className="logo"
          >
          Home
        </Link>
      </div>
      <h1 className="navTitle"> {state.title} </h1>
      <Burger />
    </Nav>
  )
}

export default Navbar