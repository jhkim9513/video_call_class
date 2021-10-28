import { combineReducers } from "redux";
import { userReducer } from "./user/reducers";
import { roomReducer } from "./room/reducers";

const rootReducer = combineReducers({
  userReducer,
  roomReducer,
});

export default rootReducer;
