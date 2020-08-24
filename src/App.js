import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Splash from "./pages/Splash"
import Catagory from "./pages/Catagory";
import Word from "./pages/Word";


class App extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     data: []
    //   };
    // }

    // componentDidMount() {
    //   let url = "https://sheet.best/api/sheets/bf8b383a-e9d9-4a78-9dfd-46d997c3ec2e";
    //   axios.get(url).then((res) => {
    //    this.setState({
    //      data: res.data
    //    })
    //   });
    // }

    render() {
        return (
            <Router>
              <Switch>
                <Route path="/" exact component={Splash} />
                <Route path="/catagory" exact component={Catagory} />
                <Route path="/word/:catId" exact component={Word} />
              </Switch>
            </Router>
        );
    }
}

export default App;
