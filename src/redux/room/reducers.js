import { createReducer } from "@reduxjs/toolkit";
import { inputRoomName, setRoomName } from "./actions";

const initialState = {
  roomName: "",
  hasRoom: false,
};

export const roomReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setRoomName, (state, action) => {
      state.roomName = action.payload;
      state.hasRoom = true;
    })
    .addCase(inputRoomName, (state, action) => {
      state.roomName = action.payload;
      state.hasRoom = false;
    });
});
