import React, { Component } from "react";
import {
    Link
} from "react-router-dom";
import Logo from "../img/logo.png";

class Splash extends Component { 
    render() { 
        return (
          <div className="container">
            
            <div className="d-flex align-items-center justify-content-center flex-column h-100">
                <img src={Logo} className="logo" width={"100px"}/>

                <h1 className="headline">
                  HELLO WORD
                </h1>

                <Link to="/catagory">
                  <button className="btn btn-primary">
                      START!  
                  </button>
                </Link>
            </div>
          </div>
        )
    }
}

export default Splash;