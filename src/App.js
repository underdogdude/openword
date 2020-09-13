import React, { Component } from "react";
import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Splash from "./pages/Splash"
import Catagory from "./pages/Catagory";
import Word from "./pages/Word";
// import "../Lineliff-script.js";

class App extends Component {
    render() {
        return (
          <Router>
              <Switch>
                <Route exact path="/">
                  <Splash />
                </Route>

                <Route path="/catagory">
                  <Catagory />
                </Route>

                <Route path="/word/:catId">
                  <Word />
                </Route>
                
              </Switch>
          </Router>
        );
    }
}

export default App;
