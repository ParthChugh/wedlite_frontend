import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './App';

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
