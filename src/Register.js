import React, { Component } from "react";
import './Login.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import logo from './assets/iconLogo256.png';



class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: '',
            email: '',
            username: '',
            showPassword: false,
            showConfirmPassword: false,
            password: '',
            confirmPassword: '',
            country: '',
            emailError: false,
            emailErrorText: "",
            usernameError: false,
            passwordError: false,
            signUpError: false,
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

        this.StyledFormControl = withStyles({
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
        })(FormControl);

        this.handleChange = this.handleChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

        this.handleMouseDownPassword = event => {
            event.preventDefault();
        };

        this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);

        this.handleMouseDownConfirmPassword = event => {
            event.preventDefault();
        };

    }

    handleClickShowPassword() {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    handleClickShowConfirmPassword() {
        this.setState({
            showConfirmPassword: !this.state.showConfirmPassword
        });
    }

    handleChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    handleCountryChange(event) {
        this.setState({
            country: event.target.value
        });
    }
    
    validateData() {
		var flag = true;
		var mailformat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (this.state.email == "") {
			flag = false;
			this.setState({ emailError: true });
			this.setState({ emailErrorText: "Este campo es obligatorio" });
		} else if (!this.state.email.match(mailformat)) {
			console.log("in 2");
			flag = false;
			this.setState({ emailError: true });
			this.setState({ emailErrorText: "El email ingresado no es valido" });
		} else {
			this.setState({ emailError: false });
			this.setState({ emailErrorText: "" });
		}

		if (this.state.username == "") {
			flag = false;
			this.setState({ usernameError: true });
		} else {
			this.setState({ usernameError: false });
		}

		if (this.state.password.length < 7) {
			flag = false;
			this.setState({ passwordError: true });
		} else {
			this.setState({ passwordError: false });
		}

		return flag;
	}


    render(){
        return(
                <div className="Login">
                    <div className="text_field_container_big">
                        <center>
                            <img className="logo_login" src= {logo} alt="logo"/>
                        </center>
                        <h3 className="title"> Registrate </h3>
                        <this.StyledTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Correo electronico*"
                            name="email"
                            autoComplete="email"
                            onChange={this.handleChange}
                            error={this.state.emailError && this.state.email == ""}
                            helperText={this.state.emailError && this.state.email == "" ? this.state.emailErrorText : ""}
                        />

                        <this.StyledTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="username"
                            label="Nombre de Usuario"
                            name="username"
                            autoComplete="username"
                            onChange={this.handleChange}
                            error={this.state.usernameError && this.state.username == ""}
                            helperText={this.state.usernameError && this.state.username == "" ? "Este campo es obligatorio" : ""}
                        />

                        <Grid container
                            spacing={2}
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
                            wrap="nowrap" >
                            <Grid item xs={6}>
                                <this.StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Contraseña*"
                                    id="password"
                                    autoComplete="current-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={this.state.passwordError && this.state.password.length < 7}
                                    helperText={this.state.passwordError && this.state.password.length < 7 ? "La contraseña debe tener mínimo 7 caracteres" : ""}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    color = "#FFFFFF"
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}>
                                                    {(this.state.showPassword) ? (<VisibilityOff />) : (<Visibility />)}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <this.StyledTextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirmar contraseña*"
                                    id="confirmPassword"
                                    autoComplete="confirm password"
                                    type={this.state.showConfirmPassword ? 'text' : 'password'}
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                    error={
                                        this.state.confirmPassword !== this.state.password
                                    }
                                    helperText={
                                        this.state.confirmPassword !== this.state.password ? "Las contraseñas deben coincidir" : ""
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowConfirmPassword}
                                                    onMouseDown={this.handleMouseDownConfirmPassword}>
                                                    {(this.state.showConfirmPassword) ? (<VisibilityOff />) : (<Visibility />)}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <ThemeProvider theme={this.theme}>
                            <div className="columns_container">
                                <this.StyledFormControl
                                    variant="outlined"
                                    fullWidth>
                                    <InputLabel htmlFor="outlined-age-simple">
                                        País
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        value={this.state.country}
                                        onChange={this.handleCountryChange}
                                        labelWidth={54}
                                        inputProps={{
                                            country: 'age',
                                            id: 'outlined-age-simple',
                                        }}>
                                        <MenuItem value="Espana">España</MenuItem>
                                        <MenuItem value="Argentina">Argentina</MenuItem>
                                        <MenuItem value="Bolivia">Bolivia</MenuItem>
                                        <MenuItem value="Brasil">Brasil</MenuItem>
                                        <MenuItem value="Chile">Chile</MenuItem>
                                        <MenuItem value="Colombia">Colombia</MenuItem>
                                        <MenuItem value="CostaRica">Costa Rica</MenuItem>
                                        <MenuItem value="Cuba">Cuba</MenuItem>
                                        <MenuItem value="Ecuador">Ecuador</MenuItem>
                                        <MenuItem value="ElSalvador">El Salvador</MenuItem>
                                        <MenuItem value="GuayanaFrancesa">Guayana Francesa</MenuItem>
                                        <MenuItem value="Granada">Granada</MenuItem>
                                        <MenuItem value="Guatemala">Guatemala</MenuItem>
                                        <MenuItem value="Guayana">Guayana</MenuItem>
                                        <MenuItem value="Haiti">Haití</MenuItem>
                                        <MenuItem value="Honduras">Honduras</MenuItem>
                                        <MenuItem value="Jamaica">Jamaica</MenuItem>
                                        <MenuItem value="Mexico">México</MenuItem>
                                        <MenuItem value="Nicaragua">Nicaragua</MenuItem>
                                        <MenuItem value="Paraguay">Paraguay</MenuItem>
                                        <MenuItem value="Panamá">Panamá</MenuItem>
                                        <MenuItem value="Peru">Perú</MenuItem>
                                        <MenuItem value="PuertoRico">Puerto Rico</MenuItem>
                                        <MenuItem value="RepúblicaDominicana">República Dominicana</MenuItem>
                                        <MenuItem value="Surinam">Surinam</MenuItem>
                                        <MenuItem value="Uruguay">Uruguay</MenuItem>
                                        <MenuItem value="Venezuela">Venezuela</MenuItem>

                                        
                                    </Select>
                                </this.StyledFormControl>

                            </div>
                        </ThemeProvider>
                        <div className="submit_btn_container">
                            <div className="submit_btn" onClick={() => {
                                this.LinkElement.click();
                            }}>
                                <p>Terminar registro</p>
                            </div>
                            <Link to={{
                                pathname: '/',
                                state: {
                                    data: 'Data from register' 
                                }}}
                                ref={Link => this.LinkElement = Link}>
                            </Link>
                        </div>
                        <Box mt={5}>
                            <div className="login_link register_link">
                                <p className="login_text">
                                    ¿Ya tienes una cuenta? <a href="/Login" > Inicia sesión </a>
                                </p>
                            </div>
                        </Box>
                    </div>
            </div>
		);
	}
}

export default Register;