import { createAction } from "@reduxjs/toolkit";

export const setRoomName = createAction("room/setRoomName");
export const inputRoomName = createAction("room/inputRoomName");
export const setMyStream = createAction("room/setMyStream");
export const setPeerConnection = createAction("room/setPeerConnection");
export const setCameras = createAction("room/setCameras");
export const clickMuteBtn = createAction("room/clickMuteBtn");
export const clickCameraBtn = createAction("room/clickCameraBtn");
