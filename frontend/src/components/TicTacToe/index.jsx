import SignlePlayer from "./SignlePlayer";
import MultiPlayer from "./MultiPlayer";
import { uniqueNamesGenerator, starWars } from "unique-names-generator";
import { useSelector } from "react-redux";
const TicTacToe = () => {
  // const [game, setGame] = useState({
  //   user1: "X",
  //   user2: "O",
  // });
  const newGame = useSelector((state) => state.newGame);
  const multiplayer = newGame.multiplayer;
  const username = newGame.username;
  const config = {
    dictionaries: [starWars],
  };
  if(!multiplayer){
    return <SignlePlayer username={ username && username.length>0 ? username : uniqueNamesGenerator(config) }/>;
  }else{
    return <MultiPlayer username={ username && username.length>0 ? username : uniqueNamesGenerator(config) }/>;
  }
};

export default TicTacToe;
