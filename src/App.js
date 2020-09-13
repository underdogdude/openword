import React, { Component } from "react";
import {
  // HashRouter as Router,
  Router,
  Route,
  Switch
} from "react-router-dom";
import Splash from "./pages/Splash"
import Catagory from "./pages/Catagory";
import Word from "./pages/Word";
// import "../Lineliff-script.js";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends Component {
    render() {
        return (
          <Router history={history}>
              <Switch>
                <Route exact path="/" component={Splash} />
                <Route path="/catagory" component={Catagory} />
                <Route path="/word/:catId" component={Word} />
              </Switch>
            </Router>
        );
    }
}

export default App;
