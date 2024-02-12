import Game from "./Game";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import { useEffect } from "react";
const TicTacToe = () => {
  const opponent = new URLSearchParams(window.location.search).get("opponent");
  const navigate = useNavigate();
  const newGame = useSelector((state) => state.newGame);
  const username = newGame.username;
  const config = {
    dictionaries: [starWars],
  };
  useEffect(()=>{
    if(!opponent) navigate("/");
  },[]);
  return <Game opponent={opponent?opponent:""} username={ username && username.length>0 ? username : uniqueNamesGenerator(config) }/>;
};

export default TicTacToe;
