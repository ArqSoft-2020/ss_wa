import React, { Component } from "react";
import './Login.css';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import logo from './assets/iconLogo256.png';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: '',
            email: '',
            showPassword: false,
            password: '',
            error: false,
        };

        this.primaryColor = '#61dafb';
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
                marginTop: '1.2vh',
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

        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

        this.handleMouseDownPassword = event => {
            event.preventDefault();
        };
    }

    handleChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    render(){
        return(
            <div className="Login">
                <center>
                    <img className="logo_login" src= {logo} alt="logo"/>
                </center>
                <h3 className="title">Inicia Sesion</h3>
                <div className="text_field_container">
                    < this.StyledTextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Correo electronico"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleChange}
                    />

                    < this.StyledTextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Contraseña"
                        id="password"
                        autoComplete="current-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        onChange={this.handleChange}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.handleClickShowPassword}
                                onMouseDown={this.handleMouseDownPassword}>
                                {(this.state.showPassword) ? (<VisibilityOff />) : (<Visibility />)}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                <div className="submit_btn_container">
                    <div className="submit_btn" onClick={() => {
                        this.LinkElement.click();
                    }}>
                        <p>Iniciar sesion</p>
                    </div>
                    <Link to={{
                        pathname: '/',
                        state: {
                            data: 'Data from Login' 
                        }}}
                        ref={Link => this.LinkElement = Link}>
                    </Link>
                </div>
                </div>
                <div className="login_link">
                    <a href="#"> ¿Olvidaste tu contraseña? </a>
                </div>
                <Box mt={5}>
                    < div className="login_link" >
                        <p>¿No tienes una cuenta? </p> <a href="/Register" > Regístrate </a>
                    </div>
                </Box>
            </div>
        )
    }
}

export default Login;