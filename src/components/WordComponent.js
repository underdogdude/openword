import React from "react";

const WordComponent = (props) => {
    
    if( Object.keys(props.word).length === 0 ) return false;
    return (
        <div className="card-body">
            <div className="flip-container">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <h1 className="noselect typo__chinese font-weight-bold">{  props.word.word }</h1>
                            <span className="noselect font-weight-light">
                                { props.word.example }
                                {"sdads"}
                            </span>
                        </div>
                        <div className="flip-card-back">
                            <h1 className="noselect font-weight-light">
                                { props.word.wordPinyin }
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default WordComponent;