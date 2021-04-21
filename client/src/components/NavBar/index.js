/* eslint-disable no-unused-vars */
import React from "react"
import styled from 'styled-components';
import Burger from './Burger';
import {useAppContext} from "../../utils/AppContext"
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: white;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
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