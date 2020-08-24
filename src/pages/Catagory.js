import React, { Component } from "react";
import axios from "axios";
import {
    Link
} from "react-router-dom";
import Logo from "../img/logo.png";

class Catagory extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            catagories: []
        };
    }

    componentDidMount() {
        let url = "https://v2-api.sheety.co/bc59d1975d4c4799f8cf90660fa16457/openword/catagories";
        axios.get(url).then((res) => {
            console.log(res);
            this.setState({
                catagories: res.data.catagories
            })
        });
    }

    render(){
        return ( 
            <div className="container mt-5 text-center">
                <div>
                    <img src={Logo} width="30%" />
                </div>
                <h3 className="text-white mt-3">
                    Select Catagory.
                </h3>
                <div className="row">
                    {
                        this.state.catagories.map((item, idx) => { 
                            return (
                                <Link to={`word/${item.id}`} key={idx} className="col-md-4 m-2 p-3 card__catagory">
                                    <div className="row">
                                        <div className="col-8">
                                            <div className="text-left d-flex flex-column justify-content-between h-100">
                                                <h5>{item.catagoryName}</h5>
                                                <span className="desc">
                                                    {item.wordTotal} WORDS
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <img  src={require(`../img/cat-logo-${idx}.png`)} width="100%" />
                                        </div>
                                    </div>
                                   
                                </Link>
                            )
                        })
                    }
                </div>
               
            </div>
        )
    }
}

export default Catagory;
