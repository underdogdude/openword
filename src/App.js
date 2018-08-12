import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount () {
    let url = 'https://od-api.oxforddictionaries.com:443/api/v1/inflections/en/swimming';
    
    fetch(url, {
      "method" : "GET",
      "mode": "no-cors",
      "headers": {
        // "Accept": "application/json",
        "app_id": "ec545a93",
        "app_key": "1a159f521e2c50b83b7a4c008ff35e35"
      }
     }).then(response => {
      console.log(response);
     });
  }

    // axios.get(url, {
    //     "Accept": "application/json",
    //     "app_id": "ec545a93",
    //     "app_key": "1a159f521e2c50b83b7a4c008ff35e35"
    // })
  //     .then(res => {
  //       console.log(res);
  //     })
  // }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
