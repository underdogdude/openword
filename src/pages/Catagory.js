import React, { Component } from "react";
import axios from "axios";
import {
    Link
} from "react-router-dom";


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
            <div className="container">
                <h1 className="text-white">
                    Select Catagory.
                </h1>
                <div className="row">
                    
                    {
                        this.state.catagories.map((item, idx) => { 
                            return (
                                
                                <Link to={`word/${item.id}`} key={idx} className="m-3 p-3 bg-white">
                                    <div className="col-md-4">
                                        {item.catagoryName}
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
