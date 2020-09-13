import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  BrowserRouter
} from "react-router-dom";
import Splash from "./pages/Splash"
import Catagory from "./pages/Catagory";
import Word from "./pages/Word";
// import "./Lineliff-script.js";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Splash} />
                <Route path="/catagory" component={Catagory} />
                <Route path="/word/:catId" component={Word} />
              </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
