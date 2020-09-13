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
              {/* <Switch> */}
                <Route exact path="/" component={Splash} />
                <Route path="/catagory" component={Catagory} />
                <Route path="/word/:catId" component={Word} />
              {/* </Switch> */}
          </Router>
        );
    }
}

export default App;
