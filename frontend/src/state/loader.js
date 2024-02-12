import { createSlice } from "@reduxjs/toolkit";

const loader = createSlice({
  name: "loader",
  initialState: {
    show:false
  },
  reducers: {
    showLoader: (state) => {
      state.show = true;
    },
    hideLoader: (state) => {
      state.show = false;
    },
  }
});

export const {showLoader,hideLoader} = loader.actions;
export default loader;