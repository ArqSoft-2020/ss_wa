import React, { Component } from "react";
import './User.css';
import Navbar from './Navbar.js';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: true,
            sentData: this.props.location.state.data
        };

        console.log(this.state.sentData);
    }

    render(){
        return(
            <div className="User">
                <Navbar/>
                <h1>Usuario</h1>
            </div>
        )
    }
}

export default User;