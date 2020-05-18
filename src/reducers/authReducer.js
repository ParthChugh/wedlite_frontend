import {fromJS} from 'immutable';
import { UPDATE_RESPONSE, UPDATE_LOGGED_IN, UPDATE_CITIES, UPDATE_CATEGORIES } from "../actions/actionTypes";

const INIT_STATE = {
  response: {},
  isLoggedIn: false,
  cities: [],
  categories: [],
};

const auth = (state = fromJS(INIT_STATE) , action) => {
  switch (action.type) {
    case UPDATE_RESPONSE: {
      return state.merge({
        response: action.payload,
      });
    }
    case UPDATE_LOGGED_IN: {
      return state.merge({
        isLoggedIn: action.payload,
      });
    }
    case UPDATE_CITIES: {
      return state.merge({
        cities: action.payload,
      });
    }
    case UPDATE_CATEGORIES: {
      return state.merge({
        categories: action.payload,
      });
    }
    default:
      return state;
  }
}; 
export default auth;
