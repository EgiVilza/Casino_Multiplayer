import React, { useContext, useReducer } from "react"
// this is how we create our react context wrapper. So we say hey, we have this developercontext that we need to be shared, lets create it as a context and set the default values there
// we can add more to the context here and only pull out those values we want to change

const AppContext = React.createContext({
  // gotta make it the same data type - similar to what it's going to be changed to 
 title: "", 
 socket: null,
 joinedGame: false,
 gameState: {},
 clientID: ""
});

// REFERENCE UNIT 20 ACT 20******************

// pulling provider out of App context, so now when wrapping components in app.js, don't call AppContext.Provider, just use AppContext
const { Provider } = AppContext


// creating a reducer function
const reducer = (state, action) => {
  switch(action.type) {
    // if action.type = changeTitle
    
      case "changeTitle":
      // grab the state, change title from the state to acttion.title
        return { ...state, title: action.title}
      
      case "setSocket":
        return { ...state, socket: action.socket}

      case "clientID":
       return { ...state, clientID: action.clientID}

      case 'joinedGame':
        return {...state, joinedGame: action.joinedGame}

      case 'gameState':
        return {...state, gameState: action.gameState}
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}


// exporting this
const useAppContext = () => {
  return useContext(AppContext)
}


// exporting this
// creating AppProvider function
// takes in an object named value, and props
// AppProvider is going to be used in the App.js to wrap all of the routes, so that you can use it in any of that stuff
const AppProvider = ({ value={}, ...props }) => {
  // calling useReducer always returns state and dispatch
  // passing in the reducer and the value from the AppProvider
  console.log(value, "???")
  const [state, dispatch] = useReducer(reducer, { ...value });

  // returning the provider
  // passing in the value and props
  // value will have the state and the dispatch function
  // props is..... what? 
  return <Provider value={[state, dispatch]} {...props} />;
}

// when we export createContext, it allows us to do what we did in app.js
export { useAppContext, AppProvider };
