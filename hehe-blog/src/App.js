import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layouts from "./layouts";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" render={props => <Layouts {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
