import { createReducer } from "@reduxjs/toolkit";
import { inputNickName, setNickName } from "./actions";

const initialState = { nickName: "", hasNickName: false };

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNickName, (state, action) => {
      state.nickName = action.payload;
      state.hasNickName = true;
    })
    .addCase(inputNickName, (state, action) => {
      state.nickName = action.payload;
      state.hasNickName = false;
    });
});
