import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import logoNavbar from './assets/logoNavbar.png';
import bg_image from './assets/bg_mainPage.jpg';
import { FiUser } from 'react-icons/fi';
import { IconContext } from "react-icons";
import { FaCode } from "react-icons/fa";
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import './App.css';
import './index.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: null,
            userLogin: false,
            joinBtnSelected: false,
            roomidError: false,
            roomid: "",
            roleError: false,
            role: "",
            createBtnSelected: false,
            newRoomid: "",
        };

        this.handleClick = this.handleClick.bind(this);
        this.setNavbarButtons = this.setNavbarButtons.bind(this);
        this.handleToUser = this.handleToUser.bind(this);
        this.handleToSOAP = this.handleToSOAP.bind(this);
        this.handleToCanvas = this.handleToCanvas.bind(this);
        this.handleJoinSelected = this.handleJoinSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validateData = this.validateData.bind(this);
        this.handleCreateSelected = this.handleCreateSelected.bind(this);

        this.primaryColor = '#FFFFFF';
        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: this.primaryColor,
                    contrastText: '#FFFFFF !important',
                },
                fontFamily: '"ProductSans"',
                secondary: {
                    main: "#FFF",
                },
                tr: {
                    background: "#f1f1f1",
                    '&:hover': {
                        background: "#FFFFFF !important",
                    },
                },
            },
        });

        this.StyledTextField = withStyles({
            root: {
                marginTop: '10px',
                fontFamily: 'ProductSans !important',
                color: '#FFFFFF !important',
                '& label.MuiInputLabel-outlined': {
                    color: 'white',
                },
                '& label.Mui-focused': {
                    color: this.primaryColor,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: this.primaryColor,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5);',
                        color: 'white'
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.75);',
                        color: 'white'
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: this.primaryColor,
                    },
                },
            },
            input: {
                color: "white !important"
            }
        })(TextField);
    }

    componentDidMount(){
        if (this.props.location.state !== undefined) {
            console.log("in");
            this.setState({
                userData: this.props.location.state.data,
                userLogin: true
            });
        }
    }

    handleClick() {
        this.LinkElement.click();
    }

    handleToUser(){
        this.UserLinkElement.click();
    }

    handleToSOAP(){
        this.SOAPLinkElement.click();
    }

    handleJoinSelected() {
        if(!this.state.joinBtnSelected){
            this.setState({joinBtnSelected: true}); 
        }
    }

    handleCreateSelected() {
        if (!this.state.createBtnSelected) {

            axios({
                url: 'http://ec2-54-147-224-240.compute-1.amazonaws.com:7000/graphql',
                method: 'post',
                data: {
                    query: `
                        mutation{
                            createCanvas{
                                message		
                                canvas{_id, drawingHistorial{coord_x, color_r, color_g, color_b, evt_type}}
                            }
                        }`
                }
            }).then((result) => {
                this.setState({newRoomid: result.data.data.createCanvas.canvas._id});

            }, (error) => {
                console.log(error);
            });

            this.setState({
                createBtnSelected: true
            });
        }
    }

    handleToCanvas() {
        if(this.validateData()){
            this.CanvasLinkElement.click();
        }
    }

    handleChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    validateData() {
        var flag = true;
        this.setState({ roomidError: false });
        this.setState({ roleError: false });

		if (this.state.roomid === "") {
			flag = false;
			this.setState({ roomidError: true });
		} else {
			this.setState({ roomidError: false });
		}

		if (this.state.role === "") {
			flag = false;
			this.setState({ roleError: true });
		} else {
			this.setState({ roleError: false });
		}

		return flag;
	}

    setNavbarButtons(){
        if(this.state.userLogin){
            return(<div className="navbarButtons_home">
                        <Grid container
                            spacing={2}
                            direction="row">
                            <Grid item xs={6}>
                                <IconContext.Provider value={{ size: "2.5em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToSOAP}>
                                        <FaCode/>
                                    </div>
                                    <Link to={{
                                        pathname: '/SOAPTest'}}
                                        ref={Link => this.SOAPLinkElement = Link}>
                                    </Link>
                                </IconContext.Provider>
                            </Grid>
                            <Grid item xs={6}>
                                <IconContext.Provider value={{ size: "2.5em ", className: 'Nav-icons_home' }}>
                                    <div onClick={this.handleToUser}>
                                        <FiUser/>
                                    </div>
                                    <Link to={{
                                        pathname: '/User',
                                        state: {
                                            data: this.state.userData
                                        }}}
                                        ref={Link => this.LinkElement = Link}>
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
                                        <FaCode/>
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
        return (
            <div className="App">
                <div className="bg_image">
                    <img src={bg_image}></img>
                </div>
                <div className="App_overlay">
                    <div className="Navbar_home">
                        <div className="logo_home">
                            <a href="/"><img src={logoNavbar}></img></a> 
                        </div>
                        {this.setNavbarButtons()}
                    </div>
                    <div className="App_content">
                        <h1>Bienvenido a Hanged Drawn</h1>
                        <div className="main_buttons_container">
                            <Grid container
                                spacing={6}
                                direction="row">
                                <Grid item xs={6}>
                                    <div className="main_btn_container">
                                        < div className = {
                                            this.state.joinBtnSelected ? "main_btn_selected blue" 
                                            : "main_btn blue"
                                        }
                                        onClick = {
                                            this.handleJoinSelected
                                        } >
                                            <p>Unirse a una sala</p>
                                            <div className={this.state.joinBtnSelected ? "main_btn_content" : "hidden"}>
                                                < this.StyledTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="roomid"
                                                    label="Room ID"
                                                    name="Room ID"
                                                    autoComplete=""
                                                    onChange={this.handleChange}
                                                    error={this.state.roomidError && this.state.roomid.length === 0}
                                                    helperText={this.state.roomidError && this.state.roomid.length === 0 ? "Este campo es obligatorio" : ""}
                                                />
                                                < this.StyledTextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    fullWidth
                                                    id="role"
                                                    label="Player role"
                                                    name="Player role"
                                                    autoComplete=""
                                                    onChange={this.handleChange}
                                                    error={this.state.roleError && this.state.role.length === 0}
                                                    helperText={this.state.roleError && this.state.role.length === 0 ? "Este campo es obligatorio" : ""}
                                                />
                                                <div className="join_submit_btn" onClick= {this.handleToCanvas}>
                                                    <p>Unirse</p>
                                                    <Link to={{
                                                        pathname: '/Canvas',
                                                        state: {
                                                            roomid: this.state.roomid,
                                                            role: this.state.role.toLowerCase()
                                                        }}}
                                                        ref={Link => this.CanvasLinkElement = Link}>
                                                    </Link>
                                                </div>
                                                <p className="join_cancel_btn" onClick={() => {this.setState({joinBtnSelected: false})}}>Cancelar</p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="main_btn_container">
                                        < div className = {
                                            this.state.createBtnSelected ? "main_btn_selected white" : "main_btn white"
                                        }
                                        onClick = {
                                            this.handleCreateSelected
                                        } >
                                            <p>Crear una sala</p>
                                            <div className={this.state.createBtnSelected ? "main_btn_content" : "hidden"}>
                                                <div className="primary_color_div">
                                                    <div className={this.state.newRoomid === "" ? "hidden": "new_room_id"}>
                                                        <h1>Tu sala ha sido creada!</h1>
                                                        <p><bold>ID: </bold>{this.state.newRoomid}</p>
                                                    </div>
                                                    <p className="join_cancel_btn white" onClick={() => {this.setState({createBtnSelected: false})}}>Ocultar pestaña</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;
