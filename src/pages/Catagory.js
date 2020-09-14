import React, { Component } from "react";
import axios from "axios";
import {
    Link
} from "react-router-dom";
import Logo from "../img/logo.png";
import CaragoryLoader from "../components/CatagoryLoader";


class Catagory extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            catagories: [],
            loading: false
        };
    }

    componentDidMount() {
        let url = "https://sheetdb.io/api/v1/ilr5vf009vt6i?sheet=catagories";
        axios.get(url).then((res) => {
            console.log(res, 'BITE');
            this.setState({
                catagories: res.data,
                loading: true
            })
        });
    }
    render(){
        return ( 
            <div className="container mt-5 text-center">
                <div>
                    <img src={Logo} width="30%" alt={"Openword Logo"} />
                </div>
                <h3 className="text-white mt-3">
                    Select Catagory.
                </h3>
               
                    {   
                        !this.state.loading 
                        ? (
                            <div className="row mb-5">
                                <div className="col-md-4">
                                    <div className="p-3 card__catagory">
                                        <CaragoryLoader />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 card__catagory">
                                        <CaragoryLoader />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 card__catagory">
                                        <CaragoryLoader />
                                    </div>
                                </div>
                            </div>
                        ) 
                        : (
                            <div className="row mb-5">
                                {
                                    this.state.catagories.map((item, idx) => { 
                                        return (
                                            <Link to={`word/${item.category_id}`} key={idx} className="col-md-4">
                                                <div className="p-3 card__catagory">
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <div className="text-left d-flex flex-column justify-content-between h-100">
                                                                <h5>{item.catagory_name}</h5>
                                                                <span className="desc">
                                                                    {item.word_total} WORDS
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="col-4">
                                                            <img  src={require(`../img/cat-logo-${idx}.png`)} width="100%" alt={`cat-logo-${idx}`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
               
            </div>
        )
    }
}

export default Catagory;
