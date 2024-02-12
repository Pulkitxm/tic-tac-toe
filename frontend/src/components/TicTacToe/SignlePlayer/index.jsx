import PropTypes from "prop-types";
import "./SignlePlayer.css";
import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";

const SinglePlayer = ({ username }) => {
  const containerRef = useRef(null);
  const [game, setGame] = useState({
    curr: "x",
    board: ["","","","","","","","",""],
    winner: null,
    turn: 1,
  });

  const makeMove = (index) => {
    const updatedGame = game;
    updatedGame.curr=game.curr==="x"?"o":"x";

    updatedGame.board = updatedGame.board.map((i,idx)=>{
      if(idx===index){
        return game.curr;
      }else{
        return i;
      }
    });
    
    let res = checkWinner();
    console.log(res);
    if(!res){
      makeComputerMove();
      let res = checkWinner();
      console.log(res);
    }
    setGame(updatedGame);
  };

  const evaluate = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (board[a] === "o") {
          return 10;
        } else if (board[a] === "x") {
          return -10;
        }
      }
    }

    if (!board.includes("")) {
      return 0;
    }

    return null;
  };

  const checkWinner = () => {
    const result = evaluate(game.board);
    if (result !== null) {
      if (result === 10) {
        console.log("Computer wins!");
      } else if (result === -10) {
        console.log("Player wins!");
      } else {
        console.log("It's a draw!");
      }
      return true;
    }
    return false;
  };

  const makeComputerMove = () => {
    const updatedGame = game;

    setGame(updatedGame);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0 5em ",
        }}
      >
        <h1 style={{ display: "inline" }}>{username}</h1>
        <h2 style={{ display: "inline" }}>vs</h2>
        <h1 style={{ display: "inline" }}>Computer</h1>
      </div>
      <div className="container" ref={containerRef}>
        {Array(9)
          .fill()
          .map((_, index) => (
            <Cell
              key={index}
              index={index}
              game={game}
              setGame={setGame}
              makeMove={makeMove}
            />
          ))}
      </div>
    </div>
  );
};

SinglePlayer.propTypes = {
  username: PropTypes.string.isRequired,
};

export default SinglePlayer;
