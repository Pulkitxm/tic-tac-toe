import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import DarkModeToggler from "./components/DarkModeToggler";
import TicTacToe from "./components/TicTacToe";
import Loader from "./components/Loader";
import "./App.css";
import "./animations.css";

import { useSelector } from "react-redux";
const App = () => {
  const loader = useSelector((state) => state.loader);
  return (
    <Router>
      <div className="app">
        <Menu />
        {/* <DarkModeToggler/> */}
        {loader.show && <Loader />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<TicTacToe />} />
          <Route path="*" element={<Home />} />
          {/* Add more routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
