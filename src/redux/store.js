import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const middleWare = [thunk];

const store = configureStore({ reducer: rootReducer, middleware: middleWare });

export default store;
