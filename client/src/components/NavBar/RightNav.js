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

                // If not logged in, blackjack and viewgame links
                // Else hide the signup and login links 
                if (message !== "Token Verified") {
                  dispatch({
                    type: 'isLoggedIn',
                    payload: "hidden"
                  })
                  dispatch({
                    type: 'isLoggedOut',
                    payload: ""
                  })
                } else {
                  dispatch({
                    type: 'isLoggedIn',
                    payload: ""
                  })
                  dispatch({
                    type: 'isLoggedOut',
                    payload: "hidden"
                  })
                }
            })
            .catch(err => {
              dispatch({type: 'isLoggedIn', payload:"hidden"})
              dispatch({type: 'isLoggedOut', payload:""})
            });
  }, [])

  function signout() {
    // Reset Token
    localStorage.setItem("CasinoToken","")

    // Log out, hide game links and reveal signout/login links
    dispatch({
      type: "isLoggedIn",
      payload: "hidden"
    })
    dispatch({
      type: "isLoggedOut",
      payload: ""
    })

    // state.socket.emit("disconnect")
  }

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
        <li className={state.isLoggedOut}>
            <Link 
            to="/signup"
            >
              Sign Up
             </Link>
        </li>
        <li className={state.isLoggedOut}>
            <Link 
            to="/login"
            >
              Login
             </Link>
        </li>
        <li className={state.isLoggedIn}>
            <Link 
            to="/login"
            onClick={signout}
            >
              Sign Out
             </Link>
        </li>
    </Ul>
  )
}

export default RightNav
