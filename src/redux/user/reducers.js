import { createReducer } from "@reduxjs/toolkit";
import {
  inputMyMessage,
  inputNickName,
  setPeerMessage,
  setNickName,
} from "./actions";

const initialState = {
  nickName: "",
  hasNickName: false,
  myMessage: "",
  peerMessage: "",
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setNickName, (state, action) => {
      state.nickName = action.payload;
      state.hasNickName = true;
    })
    .addCase(inputNickName, (state, action) => {
      state.nickName = action.payload;
      state.hasNickName = false;
    })
    .addCase(inputMyMessage, (state, action) => {
      state.myMessage = action.payload;
    })
    .addCase(setPeerMessage, (state, action) => {
      state.peerMessage = action.payload;
    });
});
