import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./Home";
import Game from "./main";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));