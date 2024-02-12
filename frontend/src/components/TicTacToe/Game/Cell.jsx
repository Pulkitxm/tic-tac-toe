import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
const Cell = ({ game, index, makeMove,content }) => {
  const isDone = content;
  const cellRef = useRef();
  useEffect(() => {
    if (isDone) cellRef.current.classList.add("done");
  }, [isDone]);
  const X = () => (
    <div className={"x"}>
      <div className="lines">
        <div className="line line-1"></div>
        <div className="line line-2"></div>
      </div>
    </div>
  );
  const O = () => (
    <div className={"o"}>
      <div className="circle"></div>
    </div>
  );
  return (
    <div
      ref={cellRef}
      className="cell"
      id={`cell-${index + 1}`}
      onClick={() => {
        if (isDone) return;
        makeMove(index);
      }}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
    >
      {isDone && (isDone === "x" ? <X /> : <O />)}
    </div>
  );
};

Cell.propTypes = {
  makeMove: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  setGame: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default Cell;
