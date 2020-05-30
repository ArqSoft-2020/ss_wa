import React, { Component } from "react";
import './SOAPTest.css';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

class SOAPTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: "",
            dataError: false,
            response: ""
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
    }

    handleChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    render(){
        return(
            <div className="soaptest">
                <div className="content">
                    <h1>Test SOAP Web Service</h1>
                    < this.StyledTextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="data"
                        label="Data"
                        name="data"
                        autoComplete="data"
                        onChange={this.handleChange}
                        error={this.state.dataError && this.state.data.length === 0}
                        helperText={this.state.dataError && this.state.data.length === 0 ? "Este campo es obligatorio" : ""}
                    />
                    <div className="submit">
                        <div className="submit_btn" onClick={() => {
                            if(this.state.data !== ""){
                                this.setState({
                                    dataError: false,
                                    response: "200 OK response"
                                })
                            }else{
                                this.setState({dataError: true})
                            }
                        }}>
                            <p>Run request</p>
                        </div>
                    </div>
                    <h2>Response</h2>
                    <div className="response_div">
                        <p><bold>{this.state.response}</bold></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SOAPTest;