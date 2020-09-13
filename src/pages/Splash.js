import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import Logo from "../img/logo.png";
import liff from "@line/liff";

class Splash extends Component { 

    sendFlex() { 
      liff.sendMessages([
        {
          type: 'text',
          text: 'Hello, World!'
        }
      ])
        .then(() => {
          alert('message seng');
        })
        .catch((err) => {
          console.log('error', err);
          alert('error');
        });
    }

    render() { 
        return (
          <div className="container">
                <button onClick={() => this.sendFlex()} className="btn btn-lg btn-primary">SEND</button>
            
            <div className="d-flex align-items-center justify-content-center flex-column h-100">
                <img src={Logo} className="logo animate__animated animate__zoomInDown animate__slow" width={"100px"}/>

                <div className="headline animate__animated animate__zoomInDown animate__slow text-center">
                  Practise Your Chinese Everyday.
                </div>
                <Link to="/catagory">
                  <button className="btn btn__primary btn__start animate__animated animate__heartBeat animate__slow animate__infinite">
                      PLAY!  
                  </button>
                </Link>

            </div>
          </div>
        )
    }
}

export default Splash;