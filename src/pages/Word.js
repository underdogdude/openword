import React, { Component } from "react";

class Word extends Component { 

    constructor(props) {
        super(props);
        console.log(props, 'prop');
        console.log(props.match.params.catId, 'props');
    }

    render() { 
        return (
            <div className="d-flex align-items-center justify-content-center flex-column">
              <h1 className="splash__title">
                WORD
              </h1>
            </div>
        )
    }
}

export default Word;