import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import DarkModeToggler from "./components/DarkModeToggler";
import TicTacToe from "./components/TicTacToe";
import Loader from "./components/Loader";
import "./App.css";
import "./animations.css";
import io from "socket.io-client";

import { useSelector } from "react-redux";
import { useEffect } from "react";
const App = () => {
  const loader = useSelector((state) => state.loader);
  useEffect(() => {
    const socket = io("http://localhost:3000/");

    socket.on("new-user", (data) => {
      console.log(data);
    });
  }, []);
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
