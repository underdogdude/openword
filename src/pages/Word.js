import React, { Component } from "react";
import axios from "axios";
import WordComponent from "../components/WordComponent";
import Swal from "sweetalert2";

class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catId: props.match.params.catId,
            data: [],
            shuffledWord: [],
            choice: [],
            currentWord: {},
            currentSet: 0,
            currentAnswer: 0,
            currentIdx: 0,
            score: 0,
        };
    }

    componentDidMount() {
        let url =
            "https://v2-api.sheety.co/bc59d1975d4c4799f8cf90660fa16457/openword/words";
        axios.get(url).then((res) => {
            let dataFiltered = res.data.words.filter((item) => {
                return item.categoryId === this.state.catId;
            });

            this.setState(
                {
                    data: this.SplitIntoChunk(dataFiltered),
                },
                () => {
                    console.log(this.state);
                    //  Do Something After Set state
                }
            );
        });
    }

    SplitIntoChunk = (dataFiltered) => {
        var myArray = [];
        // current size per set === 10
        for(var i = 0; i < dataFiltered.length; i += 10) {
          myArray.push(dataFiltered.slice(i, i+10));
        }
        return myArray;
    }

    Random3Number = () => {
        var arr = [];
        if(this.state.shuffledWord.length <= 3) {
            while (arr.length < this.state.shuffledWord.length) {
                var r = Math.floor(Math.random() * (this.state.shuffledWord.length));
                if (arr.indexOf(r) === -1) {
                    arr.push(r);
                }
            }
            return arr;
        }else { 
            while (arr.length < 3) {
                var r = Math.floor(Math.random() * (this.state.shuffledWord.length));
                if(arr.indexOf(r) === -1 && r !== this.state.currentIdx){
                    arr.push(r);
                }
            }
            return arr;
        }
    };

    SetWord = () => {
        this.setState({
            currentWord: this.state.shuffledWord[this.state.currentIdx],
        });
    };

    SetChoice = () => {
        let arrChoice = [];
        let getRandom3Number = this.Random3Number();
        
        if(getRandom3Number.indexOf(this.state.currentIdx) === -1) {
            getRandom3Number.push(this.state.currentIdx);
        }
        // shuffle it
        getRandom3Number.sort(() => Math.random() - 0.5);
        getRandom3Number.map((idx) => {
            arrChoice.push(this.state.shuffledWord[idx]);
        });

        this.setState({
            choice: arrChoice,
        });
    };

    ChangeWordSet = (idx) => {
        this.setState(
            {
                shuffledWord: this.state.data[idx].sort(
                    () => Math.random() - 0.5
                ),
                currentIdx: 0,
                currentSet: idx
            },
            () => {
                this.SetWord();
                this.SetChoice();
            }
        );
    };

    NextWord = (score) => {

        if (this.state.currentIdx < this.state.shuffledWord.length - 1) {
            this.setState(
                {
                    currentIdx: (this.state.currentIdx += 1),
                    score: this.state.score + score,
                },
                () => {
                    this.SetWord();
                    this.SetChoice();
                }
            );
        } else {
            this.setState(
                {
                    score: this.state.score + score,
                },
                () => {
                    Swal.fire({
                        title: "Your Score",
                        text: this.state.score,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                        allowEscapeKey : false,
                        allowOutsideClick: false
                    }).then((result) => {
                        console.log(result);
                        if (result.isConfirmed) {

                            this.props.history.push('/catagory')
                        }else { 
                            this.ChangeWordSet(this.state.currentSet);
                        }
                    });
                }
            );
        }
    };

    render() {
        return (
            <div className="d-flex align-items-center justify-content-center flex-column">
                {this.state.data.map((item, idx) => {
                    return (
                        <p key={idx} onClick={() => this.ChangeWordSet(idx)}>
                            Group = {idx + 1}
                        </p>
                    );
                })}
                <h1 className="splash__title">WORD</h1>
                <div className="card">
                    <WordComponent
                        word={this.state.currentWord}
                        currentIndex={this.state.currentIdx}
                    />
                    <div className="card-footer">
                        {this.state.choice.map((item, idx) => {
                            if (item.id === this.state.currentWord.id) {
                                return (
                                    <button
                                        className="btn btn-info"
                                        key={idx}
                                        onClick={() => this.NextWord(1)}
                                    >
                                        {item.wordTranslated}
                                    </button>
                                );
                            } else {
                                return (
                                    <button
                                        className="btn btn-info"
                                        key={idx}
                                        onClick={() => this.NextWord(0)}
                                    >
                                        {item.wordTranslated}
                                    </button>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Word;
