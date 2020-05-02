import React, { Component } from "react";
import './Navbar.css';
import logoNavbar from './assets/logoNavbar.png';
import { FiUser } from 'react-icons/fi';
import { IconContext } from "react-icons";
import Grid from '@material-ui/core/Grid';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: true,
            userLogin: true,
        };

        this.setNavbarButtons = this.setNavbarButtons.bind(this);
    }

    setNavbarButtons(){
        if(this.state.userLogin){
            return(<div className="navbarButtons">
                        <IconContext.Provider value={{ size: "1.2em ", className: 'Nav-icons' }}>
                            <div onClick={this.handleToSignIn}>
                                <FiUser/>
                            </div>
                        </IconContext.Provider>
                    </div>);
        }else{
            return(<div className="navbarButtons">
                        <Grid container
                            spacing={2}
                            direction="row">
                            <Grid item xs={6}>
                                <div className="navbar_link">
                                    <a href="/Login"> Inicia Sesion </a>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div className="navbar_link">
                                    <a href="/Register"> Registrate </a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>);
        }
    }

    render(){
        return(
            <div className="Navbar">
                <div className="Navbar_content">
                    <div className="logo">
                        <a href="/"><img src={logoNavbar}></img></a> 
                    </div>
                    {this.setNavbarButtons()}
                </div>
            </div>
        )
    }
}

export default Navbar;