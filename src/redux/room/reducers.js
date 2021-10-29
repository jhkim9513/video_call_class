import { createReducer } from "@reduxjs/toolkit";
import {
  clickCameraBtn,
  clickMuteBtn,
  inputRoomName,
  setCameras,
  setDataChannel,
  setMyStream,
  setPeerConnection,
  setRoomName,
} from "./actions";

const initialState = {
  roomName: "",
  hasRoom: false,
  myStream: null,
  peerConnection: null,
  cameras: null,
  muteBtn: false,
  cameraBtn: false,
  dataChannel: null,
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
    })
    .addCase(setMyStream, (state, action) => {
      state.myStream = action.payload;
    })
    .addCase(setPeerConnection, (state, action) => {
      state.peerConnection = action.payload;
    })
    .addCase(setCameras, (state, action) => {
      state.cameras = action.payload;
    })
    .addCase(clickMuteBtn, (state, action) => {
      state.muteBtn = !state.muteBtn;
    })
    .addCase(clickCameraBtn, (state, action) => {
      state.cameraBtn = !state.cameraBtn;
    })
    .addCase(setDataChannel, (state, action) => {
      state.dataChannel = action.payload;
    });
});
