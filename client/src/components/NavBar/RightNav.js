import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import API from "../../utils/API"
import {useAppContext} from '../../utils/AppContext'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 968px) {
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
  .hidden {
    display: none;
  }
`;

const RightNav = ({ open }) => {

  const [state, dispatch] = useAppContext();

  // If the user is not logged in, the game and viewgame links are hidden
  // From the user
  useEffect(() => {
    API.verifyToken(API.getTokenFromLocalStorage())
            .then(results => {
                const message = results.data.message

                if (message !== "Token Verified") {
                  dispatch({
                    type: 'isLoggedIn',
                    payload: "hidden"
                  })
                } else {
                  dispatch({
                    type: 'isLoggedIn',
                    payload: ""
                  })
                }
            })
            .catch(err => dispatch({type: 'isLoggedIn', payload:"hidden"}));
  }, [])


  return (
    <Ul open={open}>
        {/* <li className={classes}>
            <Link 
            to="/server"
            >
              Create Server
             </Link>
        </li> */}
        <li className={state.isLoggedIn}>
            <Link 
            to="/game"
            >
             Black Jack
             </Link>
        </li>
        <li className={state.isLoggedIn}>
            <Link 
            to="/viewgame"          
            >
              View Game
             </Link>
        </li>
        <li>
            <Link 
            to="/leaderboard"
            >
              Leader Board
             </Link>
        </li>
        <li>
            <Link 
            to="/signup"
            >
              Sign Up
             </Link>
        </li>
        <li>
            <Link 
            to="/login"
            >
              Login
             </Link>
        </li>
    </Ul>
  )
}

export default RightNav
