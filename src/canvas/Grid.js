import React from "react";
import Row from "./Row";

// takes in array of arrays as props
// returns a bunch of Row components
export default function Grid(props) {
  const grid = props.cells.map((cells, index) => {
    return (
      <Row
        key={index}
        cells={cells}
        index={index}
        update={props.update}
        colorSelected={props.colorSelected}
      />
    );
  });
  return <div className={props.role === "artist" ? "grid": "grid_no_action"}>{grid}</div>;
}
