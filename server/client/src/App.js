import React from "react";
import { Switch, Route } from "react-router-dom";
import AddSong from "./components/AddSong";
import SongsList from "./components/SongsList";
import * as PATHS from "./utils/paths";
// import SongDetails from "./components/SongDetails";

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path={PATHS.HOMEPAGE} component={SongsList} />
        <Route exact path="/songs/add" component={AddSong} />
        {/* <Route exact path='/songs/:id' component={SongDetails} /> */}
      </Switch>
    </div>
  );
}

export default App;
