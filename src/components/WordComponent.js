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

    speakWord(word) { 
        try { 
            window.responsiveVoice.speak(word, "Chinese Taiwan Female", {pitch: 1});
        }catch(err) { 
            console.log(err);
        }
    }

    render() { 
        return (
            <div className="card-body">
                <div className="flip-container">
                    <div onClick={() => this.speakWord(this.props.word.word) } value="Play" className="btn__volumn"></div>
                    <div className="flip-card" onClick={() => this.FlipCard()}>
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
                                    { this.props.word.word_pinyin }
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