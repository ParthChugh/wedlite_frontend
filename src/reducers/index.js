import { combineReducers } from "redux";
import auth from "./authReducer";
import shop from "./shopReducer";
import invitation from "./invitationReducer";

export default combineReducers({ auth, shop, invitation });
