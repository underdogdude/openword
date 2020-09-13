import React, { Component } from "react";
import axios from "axios";
import WordComponent from "../components/WordComponent";
import Swal from "sweetalert2";
import Logo from "../img/logo.png";
import BtnHome from "../img/logo-home.png";
import BtnWordSet from "../img/logo-change.png";
import WordLoader from "../components/WordLoader";

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
            isLoading: true
        };
    }

    componentDidMount() {
        let url =
            "https://v2-api.sheety.co/bc59d1975d4c4799f8cf90660fa16457/openword/words";
        axios.get(url).then((res) => {
            console.log(res,'RE');
            let dataFiltered = res.data.words.filter((item) => {
                return item.categoryId === this.state.catId;
            });

            this.setState(
                {
                    data: this.SplitIntoChunk(dataFiltered)
                },
                () => {
                    this.PopupChangeWordSet();
                }
            );
        });
    }

    SplitIntoChunk = (dataFiltered) => {
        var myArray = [];
        // current size per set === 10
        for (var i = 0; i < dataFiltered.length; i += 10) {
            myArray.push(dataFiltered.slice(i, i + 10));
        }
        return myArray;
    };

    Random3Number = () => {
        var arr = [];
        if (this.state.shuffledWord.length <= 3) {
            while (arr.length < this.state.shuffledWord.length) {
                let r = Math.floor(
                    Math.random() * this.state.shuffledWord.length
                );
                if (arr.indexOf(r) === -1) {
                    arr.push(r);
                }
            }
            return arr;
        } else {
            while (arr.length < 3) {
                let r = Math.floor(
                    Math.random() * this.state.shuffledWord.length
                );
                if (arr.indexOf(r) === -1 && r !== this.state.currentIdx) {
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

        if (getRandom3Number.indexOf(this.state.currentIdx) === -1) {
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

    PopupChangeWordSet = async () => {

        let group = {};
        let previousDataLength = 0;

        this.state.data.map((item, idx) => {
            let fromNumber = previousDataLength;
            let toNumber = previousDataLength + (item.length - 1);
            group[idx] = "Words: " + fromNumber + "-" + toNumber;

            previousDataLength += item.length;
        });

        const { value: catID } = await Swal.fire({
            title: "Select Word Group",
            input: "select",
            inputOptions: group,
            inputPlaceholder: "Please Select",
            showCancelButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            customClass: {
                title: 'type__sweetalert',
                confirmButton: 'btn__sweetalert-confirm',
                input: 'ml-2 mr-2 w-100',
            },
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === '') {
                        resolve('Please select value')
                    } else {
                        resolve()
                    }
                });
            },
        });
        if (catID) {
            this.ChangeWordSet(catID);
            this.setState({
                isLoading: false
            })
        }
    };

    ChangeWordSet = (idx) => {
        this.setState(
            {
                shuffledWord: this.state.data[idx].sort(
                    () => Math.random() - 0.5
                ),
                currentIdx: 0,
                currentSet: idx,
                currentAnswer: 0,
                score: 0,

            },
            () => {
                this.SetWord();
                this.SetChoice();
            }
        );
    };

    NextWord = (score) => {

        let stringCap = this.state.currentWord.wordTranslated.replace(/^./, this.state.currentWord.wordTranslated[0].toUpperCase());

        if(score) { 
            Swal.fire({
                icon: 'success',
                title: 'CORRECT!',
                showConfirmButton: false,
                timer: 900
            }).then(() => {
                this.updateScore(score);
            });
        }else { 
            Swal.fire({
                icon: 'error',
                title: 'WRONG!',
                showConfirmButton: true,
                text: `${this.state.currentWord.word}  (${this.state.currentWord.wordPinyin}) = ${ stringCap }`,

            }).then(() => { 
                this.updateScore(score);
            });
        }
    };

    updateScore = (score) => { 
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
                    console.log(this.state.score,'score');
                    Swal.fire({
                        title: "Your Score",
                        text: this.state.score.toString(),
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: `HOME`,
                        cancelButtonText: "TRY AGAIN",
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        customClass: {
                            title: 'type__sweetalert',
                            content: 'type__sweetalert-text',
                            confirmButton: 'btn__sweetalert-confirm',
                            cancelButton: 'btn__sweetalert-cancel'
                        },
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.props.history.push("/catagory");
                        } else {
                            this.ChangeWordSet(this.state.currentSet);
                        }
                    });
                }
            );
        }
    };

    BackToHome () {
        Swal.fire({
            title: "Are you sure to leave this page?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continue",
            allowEscapeKey: false,
            allowOutsideClick: false,
            customClass: {
                title: 'type__sweetalert',
                confirmButton: 'btn__sweetalert-confirm',
                cancelButton: 'btn__sweetalert-cancel'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                this.props.history.push("/catagory");
            } 
        });
    }

    render() {

        return (
            <div className="container custom__container">
                <div className="d-flex align-items-center justify-content-center flex-column">
                    {
                        this.state.isLoading 
                        ? ""
                        :<div className="d-flex justify-content-between w-100 mt-4 mb-3 px-2">
                            <h5 className="splash__title text-white mt-3">
                                Group { this.state.currentSet }
                            </h5>
                            <div className="d-flex">
                                
                                <div onClick={() => this.BackToHome()} 
                                className="animate__animated animate__pulse btn__img btn__home">
                                    <img alt="Change wordset button" src={BtnHome} />
                                </div>
                                <div onClick={() => this.PopupChangeWordSet()} 
                                className="animate__animated animate__pulse btn__img btn__changeword mr-0">
                                    <img alt="Change wordset button" src={BtnWordSet} />
                                </div>
                            </div>
                        </div>
                    }
                    
                    {
                        this.state.isLoading
                        ? <div className="mt-5"><WordLoader/></div>
                        : <div className="card word__card">
                            <div className="card-header d-flex align-items-center">
                                <span className="number__indicate">
                                    { this.state.currentIdx+1 } / {this.state.data[this.state.currentSet].length}
                                </span>
                                <div className="progress ml-2">
                                    <div className="progress-bar"
                                        style={{width: ((this.state.currentIdx+1)/this.state.data[this.state.currentSet].length) * 100 +`%`}}
                                        role="progressbar"
                                        aria-valuenow={ ((this.state.currentIdx+1)/this.state.data[this.state.currentSet].length) * 100 } 
                                        aria-valuemin={"0"} 
                                        aria-valuemax={"100"}></div>
                                </div>
                            </div>
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
                    }
                </div>
            </div>
        );
    }
}

export default Word;
