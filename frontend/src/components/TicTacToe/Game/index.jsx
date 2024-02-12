import PropTypes from "prop-types";
import "./SignlePlayer.css";
import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import { io } from "socket.io-client";

const MultiPlayer = ({ username,opponent,curr }) => {
  const containerRef = useRef(null);
  const [i, setI] = useState(0)
  const [game, setGame] = useState({
    curr: curr?curr:"x",
    board: ["", "", "", "", "", "", "", "", ""],
    winner: null,
    turn: 1,
  });

  useEffect(() => {
    const socket = io("http://localhost:3000/");
    socket.on("next-move", (data) => {
      if(data.username!==username){
        const board = data.board;
        setGame({...game,board,curr:data.curr});
        console.log(data);
      }
    });
  }, []);

  useEffect(() => {
    if(i>=3) setTimeout(()=>alert(username+" wins"),100);
  }, [i]);

  const makeMove = (index, auto = false, curr) => {
    setI(i+1);
    const updatedGame = {
      ...game,
      curr: game.curr === "x" ? "o" : "x",
    };
    if (auto) updatedGame.curr = curr;

    updatedGame.board = game.board.map((i, idx) => {
      if (idx === index) {
        return game.curr;
      } else {
        return i;
      }
    });

    setGame(updatedGame);
    checkWinner();
    if (!auto) {
      checkWinner();
      const socket = io("http://localhost:3000/");
      socket.emit("next-move", {
        board:updatedGame.board,
        curr: updatedGame.curr,
        username: username,
      });
    }
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
    console.log(result,game.board);
    return result !== null;
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
        <h1 style={{ display: "inline" }}>{opponent}</h1>
      </div>
      <div className="container" ref={containerRef}>
        {
        game.board.map((i, index) => (
            <Cell
              key={index}
              index={index}
              game={game}
              setGame={setGame}
              makeMove={makeMove}
              content={i}
            />
          ))}
      </div>
    </div>
  );
};

MultiPlayer.propTypes = {
  username: PropTypes.string.isRequired,
  opponent: PropTypes.string.isRequired,
  curr: PropTypes.string,
};

export default MultiPlayer;
