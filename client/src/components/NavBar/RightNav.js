import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Game from '../../pages/ViewGamePage';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #0D2538;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
        <li>
            <Link 
            to="/server"
            className={
              window.location.pathname === "/server"
            }
            >
              Choose Server
             </Link>
        </li>
        <li>
            <Link 
            to="/game"
            className={
              window.location.pathname === "/game"
            }
            >
             Black Jack
             </Link>
        </li>
        <li>
            <Link 
            to="/viewgame"
            className={
              window.location.pathname === "/viewgame"
            }
            >
              View Game
             </Link>
        </li>
        <li>
            <Link 
            to="/leaderboard"
            className={
              window.location.pathname === "/leaderboard"
            }
            >
              Leader Board
             </Link>
        </li>
    </Ul>
  )
}

export default RightNav
