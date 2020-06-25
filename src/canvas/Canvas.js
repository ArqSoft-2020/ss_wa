import React, { useState } from "react";
import './Canvas.css';
import Grid from "./Grid";
import { CirclePicker } from "react-color";
import { IconContext } from "react-icons";
import { FaEraser } from "react-icons/fa";
import { FaFile } from "react-icons/fa";

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

    const update = (x, y, currentColor) => {
        if(x === -1 && y === -1){
            console.log("ERASE ALL");

            // AQUI VAN LA PETICION DE BORRAR TODO AL MICROSERVICIO DE CANVAS
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
                console.log("Sent color: " + sentColor);

                // AQUI VAN LAS PETICIONES AL MICROSERVICIO DE CANVAS
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
                                 "#ff9800", "#795548",
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
