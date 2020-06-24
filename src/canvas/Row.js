import React from "react";

// takes in array of hex values
// returns a row of pixels
export default function Row(props) {
  const row = props.cells.map((color, index) => {
    return (
      <div
        className={"pixel"}
        style={{ backgroundColor: color }}
        draggable={true}
        onMouseDown={e => {
            let currentColor = e.target.style.backgroundColor;
            if (props.colorSelected === "#e6e6e6"){
                if ((index + props.index) % 2 === 0){
                    e.target.style.backgroundColor = "rgb(255,255,255)";
                }else{
                    e.target.style.backgroundColor = "rgb(230,230,230)";
                }
            }else{
                e.target.style.backgroundColor = props.colorSelected;
            }
            props.update(index, props.index, currentColor);
            
        }}

        onDragStart={e => {
            var dragImgEl = document.createElement("span");
            dragImgEl.setAttribute(
                "style",
                "position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;"
            );
            e.dataTransfer.setDragImage(dragImgEl, 0, 0);
        }}

        onMouseOver={e => {
            e.target.style.opacity = 0.5;
        }}

        onMouseLeave={e => {
            e.target.style.opacity = 1;
        }}
        
        onDragOver={e => {e.preventDefault()}}

        onDragEnter={e => {
            e.target.style.opacity = 1;
            let currentColor = e.target.style.backgroundColor;
            if (props.colorSelected === "#e6e6e6") {
                if ((index + props.index) % 2 === 0) {
                    e.target.style.backgroundColor = "rgb(255,255,255)";
                } else {
                    e.target.style.backgroundColor = "rgb(230,230,230)";
                }
            } else {
                e.target.style.backgroundColor = props.colorSelected;
            }

            props.update(index, props.index, currentColor);
            e.preventDefault()
        }}
      />
    );
  });
  return <div className="row">{row}</div>;
}
