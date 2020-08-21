import React, { Component } from "react";
import {
    Link
} from "react-router-dom";

class Splash extends Component { 
    render() { 
        return (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <h1 className="splash__title">
                Open Word
              </h1>
              <Link to="/catagory">
                <button className="btn btn-primary">
                    START!  
                </button>
              </Link>
            </div>
        )
    }
}

export default Splash;