import { configureStore } from "@reduxjs/toolkit";
import newGame from "./state/newGame";
import loader from "./state/loader";

const store = configureStore({
  reducer: {
    newGame: newGame.reducer,
    loader:loader.reducer
  }
});

export default store;