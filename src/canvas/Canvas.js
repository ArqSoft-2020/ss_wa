import React, { useState } from "react";
import './Canvas.css';
import Grid from "./Grid";
import { CirclePicker } from "react-color";
import { IconContext } from "react-icons";
import { FaEraser } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import axios from 'axios';

const makeArray = size => {
    let canvas = Array(size);
    for (let i = 0; i < size; i++) {
        let canvasRow = Array(size);
        for (let j = 0; j < size; j++) {
            if ((j + i) % 2 === 0) {
                canvasRow[j] = "rgb(255, 255, 255)";
            } else {
                canvasRow[j] = "rgb(230, 230, 230)";
            }
        }
        canvas[i] = canvasRow;
    }
    return canvas;
};

function Canvas(props) {
    // store the selected color in state
    const [colorSelected, setColorSelected] = useState("rgb(0, 0, 0)");

    // store the array of colors in state
    const [cells, setCells] = useState(makeArray(48));  

    const [connected, setConnected] = useState(false);

    const [erasedAll, setErasedAll] = useState(false);

    const updateCanvas = (data) => {
        let newColor = "rgb(" + data.color_r + ", " + data.color_g + ", " + data.color_b + ")";
        setCells(
            cells.map((row, index) => {
                if (index === data.coord_x) {
                    row.splice(data.coord_y, 1, newColor);
                }
                return row;
            })
        );
    };

    const updateHistorial = (historialArray) => {
        var newColor;
        let newArray = [...cells];
        for (let i = 0; i < historialArray.length; i++) {
            newColor = "rgb(" + historialArray[i].color_r + ", " + historialArray[i].color_g + ", " + historialArray[i].color_b + ")";
            newArray[historialArray[i].coord_x].splice(historialArray[i].coord_y, 1, newColor);
        }
        setCells(newArray);
    };

    const eraseAll = (size) => {
        setCells(
            cells.map((row, index) => {
                for (let i = 0; i < size; i++) {
                    if ((index + i) % 2 === 0) {
                        row.splice(i, 1, "rgb(255, 255, 255)");
                    }else{
                        row.splice(i, 1, "rgb(230, 230, 230)");
                    }
                }
                return row;
            })
        );
    }

    if (connected === false){
        var baseURL = "http://ec2-3-217-93-77.compute-1.amazonaws.com:3001/";
        var canvasId = props.location.state.roomid;
        console.log(canvasId);
        if(props.location.state.role === "artist"){
            //Class created to support the get request to update the drawing historial
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200)
                            aCallback(anHttpRequest.responseText);
                            setConnected(true);
                    };

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                };
            };

            //Update with historial info
            var historialArray = [];
            var client = new HttpClient();
            client.get(baseURL + 'api/canvas/historial/' + canvasId, function (response) {
                response = JSON.parse(response);
                response.drawingHistorial.drawingHistorial.forEach(element => {
                    historialArray.push(element);
                });

                updateHistorial(historialArray);
            });

        }else{
            //Class created to support the get request to update the drawing historial
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200)
                            aCallback(anHttpRequest.responseText);
                            setConnected(true);
                    };

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                };
            };

            //Update with historial info
            var historialArray = [];
            var client = new HttpClient();
            client.get(baseURL + 'api/canvas/historial/' + canvasId, function (response) {
                response = JSON.parse(response);
                response.drawingHistorial.drawingHistorial.forEach(element => {
                    historialArray.push(element);
                });

                updateHistorial(historialArray);
            });

            var source = new EventSource(baseURL + "api/canvas/update/" + canvasId);
            source.onmessage = function (event) {
                var data = JSON.parse(event.data);
                if (data.evt_type === "drawing") {
                    updateCanvas(data);
                }else{
                    eraseAll(48);
                }
            }; 
        }
    }

    const update = (x, y, currentColor) => {
        if(x === -1 && y === -1){
            axios({
                    url: 'http://ec2-3-217-93-77.compute-1.amazonaws.com:7000/graphql',
                    method: 'post',
                    data: {
                        query: `
                            mutation {
                                updateCanvas(model: {
                                    evt_type: "erase all",
                                    request_user_id: 5,
                                    allowed_user_id: 5,
                                    coord_x: 0,
                                    coord_y: 0,
                                    color_r: 0,
                                    color_g: 0,
                                    color_b: 0
                                }, id: "${props.location.state.roomid}") {
                                    message
                                    canvas {
                                        _id,
                                        drawingHistorial {
                                            coord_x,
                                            coord_y,
                                            color_r,
                                            color_g,
                                            color_b,
                                            evt_type
                                        }
                                    }
                                }
                            }
                            `
                    }
                }).then((result) => {
                    console.log("ERASE ALL");

                }, (error) => {
                    console.log(error);
                });
        }else{
            let sentColor;
            if (colorSelected === "#e6e6e6") {
                if ((x + y) % 2 === 0) {
                    sentColor = "rgb(255, 255, 255)";
                } else {
                    sentColor = "rgb(230, 230, 230)";
                }
            } else {
                sentColor = colorSelected;
            }

            if (sentColor !== currentColor) {
                let colorArray = sentColor.substring(4, (sentColor.length) - 1).split(", ");
                axios({
                    url: 'http://ec2-3-217-93-77.compute-1.amazonaws.com:7000/graphql',
                    method: 'post',
                    data: {
                        query: `
                            mutation {
                                updateCanvas(model: {
                                    evt_type: "drawing",
                                    request_user_id: 5,
                                    allowed_user_id: 5,
                                    coord_x: ${y},
                                    coord_y: ${x},
                                    color_r: ${colorArray[0]},
                                    color_g: ${colorArray[1]},
                                    color_b: ${colorArray[2]}
                                }, id: "${props.location.state.roomid}") {
                                    message
                                    canvas {
                                        _id,
                                        drawingHistorial {
                                            coord_x,
                                            coord_y,
                                            color_r,
                                            color_g,
                                            color_b,
                                            evt_type
                                        }
                                    }
                                }
                            }
                            `
                    }
                }).then((result) => {
                    console.log("Sent color: " + sentColor);

                }, (error) => {
                    console.log(error);
                });
            }
        }
    };

    const cleanCanvas = async () => {
        setCells([]);
    }

    return (
        <div className="Canvas">
            <div className="canvas_container">
                <Grid cells={cells} update={update} colorSelected={colorSelected} role={props.location.state.role}/>
                <div className={props.location.state.role === "artist" ? "color_picker_container" : "hidden"}>
                    <div>
                        <CirclePicker
                            width="84px"
                            colors = {
                                ["#C62828", "#f44336",
                                 "#FF6F00", "#e91e63",
                                 "#9c27b0", "#673ab7",
                                 "#3f51b5", "#2196f3", 
                                 "#03a9f4", "#00bcd4", 
                                 "#009688", "#4caf50", 
                                 "#8bc34a", "#cddc39", 
                                 "#ffeb3b", "#ffc107", 
                                 "#ffd9c2", "#795548",
                                 "#3E2723", "#607d8b",
                                 "#000000", "#FFFFFF"]
                            }
                            color={colorSelected}
                            onChangeComplete={color => {
                                setColorSelected(
                                    "rgb(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ")"
                                );
                            }}
                        />
                    </div>
                    <div className={colorSelected === "#e6e6e6" ?
                                        "eraser_container_selected"
                                    :
                                        "eraser_container"}>
                            <IconContext.Provider value = { {
                                    size: "1.8em ",
                                    className: 'eraser'
                                } 
                            }>
                            <div onClick={() => {
                                if(colorSelected !== "#e6e6e6"){
                                    setColorSelected("#e6e6e6");
                                }else{
                                    setColorSelected("rgb(0, 0, 0)");
                                }
                            }}>
                                <FaEraser/>
                            </div>
                        </IconContext.Provider>
                    </div>

                    <div className={"eraser_container_small_margin"}>
                            <IconContext.Provider value = { {
                                    size: "1.8em ",
                                    className: 'eraser'
                                } 
                            }>
                                <div 
                                    onClick ={async () => {
                                        await cleanCanvas();
                                        setCells(makeArray(48));
                                        setColorSelected("rgb(0, 0, 0)");
                                        update(-1, -1, colorSelected);
                                    }}

                                >
                                    <FaFile/>
                                </div>
                            </IconContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Canvas;
