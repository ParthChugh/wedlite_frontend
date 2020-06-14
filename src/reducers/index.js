import { combineReducers } from "redux";
import auth from "./authReducer";
import shop from "./shopReducer";

export default combineReducers({ auth, shop });
