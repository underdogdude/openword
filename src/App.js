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
// import "./Lineliff-script.js";
import liff from '@line/liff';


let lineToken = "";
alert('not fucking work');
liff.init({ liffId: '1654918729-EjBZQgb1' })
    .then(() => {
      alert('inside then');
      lineToken = liff.getIDToken();
      alert(lineToken);
    }).catch((err) => {
      alert(JSON.stringify(err));
  });

class App extends Component {



    render(){
        return (
          <Router basename={process.env.PUBLIC_URL || ''}>
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
