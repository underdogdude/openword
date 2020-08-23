import React from "react";

const WordComponent = (props) => {
    if( Object.keys(props.word).length === 0 ) return false;
    return (
        <div className="card-body">
            <h3>{props.currentIndex + 1}</h3>
            {props.word.word}
        </div>
    );
}


export default WordComponent;