import React from "react";
import { Switch, Route } from "react-router-dom";
import AddSong from "./components/AddSong";
import HomePage from "./pages/HomePage";
import * as PATHS from "./utils/paths";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={PATHS.HOMEPAGE} component={HomePage} />
        <Route exact path="/songs/add" component={AddSong} />
      </Switch>
    </div>
  );
}

export default App;
