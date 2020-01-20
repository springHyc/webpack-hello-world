import React, { Component } from "react";
import "./app.less";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layouts from "./src/layouts";

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
