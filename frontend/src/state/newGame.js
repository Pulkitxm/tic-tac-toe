import { createSlice } from "@reduxjs/toolkit";

const newGame = createSlice({
  name: "newGame",
  initialState: {
    username:"",
    multiplayer: false,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setGameMode: (state, action) => {
      state.multiplayer = action.payload;
    },
  }
});

export const {setUsername ,setGameMode} = newGame.actions;

export default newGame;