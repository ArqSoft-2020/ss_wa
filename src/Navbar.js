import React, { Component } from "react";
import './Navbar.css';
import logoNavbar from './assets/logoNavbar.png';
import { FiUser, FiLogOut, FiCode } from 'react-icons/fi';
import { IconContext } from "react-icons";
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLogin: false,
            userData: this.props.userData
        };

        this.setNavbarButtons = this.setNavbarButtons.bind(this);
        this.handleToUser = this.handleToUser.bind(this);
        this.handleToHome = this.handleToHome.bind(this);
        this.handleToSOAP = this.handleToSOAP.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        if (this.state.userData !== null) {
            this.setState({
                userLogin: true
            });
        }
    }

    handleToUser() {
        this.UserLinkElement.click();
    }

    handleToHome() {
        this.HomeLinkElement.click();
    }

    handleToSOAP() {
        this.SOAPLinkElement.click();
    }

    handleLogout() {
        this.homeLinkElement.click();
    }

    setNavbarButtons(){
        if(this.state.userLogin){
            return(<div className="navbarButtons_home">
                        <Grid container
                            spacing={2}
                            direction="row">
                            <Grid item xs={4}>
                                <IconContext.Provider value={{ size: "1.2em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToSOAP}>
                                        <FiCode/>
                                    </div>
                                    <Link to={{
                                        pathname: '/SOAPTest'}}
                                        ref={Link => this.SOAPLinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                            <Grid item xs={4}>
                                <IconContext.Provider value={{ size: "1.2em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToUser}>
                                        <FiUser/>
                                    </div>
                                    <Link to={{
                                        pathname: '/User',
                                        state: {
                                            data: this.state.userData
                                        }}}
                                        ref={Link => this.UserLinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                            <Grid item xs={4}>
                                <IconContext.Provider value={{ size: "1.2em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleLogout}>
                                        <FiLogOut/>
                                    </div>
                                    <Link to={{
                                        pathname: '/'}}
                                        ref={Link => this.homeLinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                        </Grid>
                    </div>);
        }else{
            return(<div className="navbarButtons_home">
                        <Grid container
                            spacing={2}
                            direction="row">
                            <Grid item xs={4}>
                                <IconContext.Provider value={{ size: "2.5em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToSOAP}>
                                        <FiCode/>
                                    </div>
                                    <Link to={{
                                        pathname: '/SOAPTest'}}
                                        ref={Link => this.SOAPLinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="navbar_link_home">
                                    <a href="/Login"> Inicia Sesion </a>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div className="navbar_link_home">
                                    <a href="/Register"> Registrate </a>
                                </div>
                            </Grid>
                        </Grid>
                    </div>);
        }
    }

    render(){
        console.log(this.state.userData)
        return(
            <div className="Navbar">
                <div className="Navbar_content">
                    <div className="logo">
                        <img alt="logo" src={logoNavbar} onClick={this.handleToHome}></img>
                        <Link to={{
                            pathname: '/',
                            state: {
                                data: this.state.userData 
                            }}}
                            ref={Link => this.HomeLinkElement = Link}>
                        </Link>
                    </div>
                    {this.setNavbarButtons()}
                </div>
            </div>
        )
    }
}

export default Navbar;