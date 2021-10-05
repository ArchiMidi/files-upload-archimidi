import React from "react";
import { Switch, Route } from "react-router-dom";
import AddSong from "./components/AddSong";
import SongsList from "./components/SongsList";
import NavBar from "./components/NavBar";
import * as PATHS from "./utils/paths";
import SongDetails from "./components/SongDetails";
import Signup from "./components/Signup";
import { useState } from 'react'
import Login from "./components/Login";


function App(props) {

  const [user, setUser] = useState(props.user)

  const addUser = user => {
    setUser(user);
  }

  // console.log('App.js user is :', user)

  console.log(user)

  return (
    <div className="App">
      <h1>ArchiMIDIs</h1>
      <NavBar user={user} setUser={addUser}></NavBar>
      <Switch>
        <Route exact path={PATHS.HOMEPAGE} component={SongsList} />
        <Route exact path="/songs/add"
          render={user ? props => <AddSong user={user} setUser={addUser} /> : props => <Login setUser={addUser}{...props} />
          } />
        <Route exact path='/songs/:id' component={SongDetails} />
        <Route exact path="/signup"
          render={props => <Signup setUser={addUser}{...props} />} />
        <Route exact path="/login"
          render={props => <Login setUser={addUser}{...props} />} />
      </Switch>
    </div>
  );
}

export default App;
