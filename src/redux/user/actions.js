import { createAction } from "@reduxjs/toolkit";

export const setNickName = createAction("user/setNickName");
export const inputNickName = createAction("user/inputNickName");
export const inputMyMessage = createAction("user/sendMyMessage");
export const setPeerMessage = createAction("user/setPeerMessage");
