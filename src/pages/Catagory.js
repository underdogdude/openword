import React, { Component } from "react";
import axios from "axios";

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
            <div>
                <h1 className="text-danger">bright</h1>
                {
                    this.state.catagories.map((item, idx) => { 
                        return (
                            <p key={idx}>
                                {item.catagoryName}
                            </p>
                        )
                    })
                }
            </div>
        )
    }
}

export default Catagory;
