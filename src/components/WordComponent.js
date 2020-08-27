import React, { Component } from "react";

class WordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFliped: 0
        };
    }

    FlipCard() { 
        let hasFlip = this.state.isFliped === 0 ? 1 : 0;
        this.setState({
            isFliped: hasFlip
        });

    }

    render() { 
        return (
            <div className="card-body">
                <div className="flip-container" onClick={() => this.FlipCard()}>
                    <div className="flip-card">
                        <div className="flip-card-inner"  style={{"transform": !this.state.isFliped ? "" : "rotateY(180deg)"}}>
                            <div className="flip-card-front">
                                <h1 className="noselect typo__chinese font-weight-bold">
                                    {  this.props.word.word }
                                </h1>
                                <span className="noselect font-weight-light">
                                    { this.props.word.example }
                                </span>
                            </div>
                            <div className="flip-card-back">
                                <h1 className="noselect font-weight-light">
                                    { this.props.word.wordPinyin }
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default WordComponent;