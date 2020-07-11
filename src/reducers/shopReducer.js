import {fromJS} from 'immutable';
import { 
  UPDATE_CART, 
  UPDATE_ITEMS,
  UPDATE_DELIVERY_ADDRESS
} from "../actions/actionTypes";

const INIT_STATE = {
  cart: [],
  items: {
    count: 0,
    results: []
  },
  address: [],
};

const auth = (state = fromJS(INIT_STATE) , action) => {
  switch (action.type) {
    case UPDATE_CART: {
      return state.merge({
        cart: fromJS(action.payload),
      });
    }
    case UPDATE_ITEMS: {
      return state.merge({
        items: fromJS(action.payload),
      });
    }
    case UPDATE_DELIVERY_ADDRESS: {
      return state.get('address').concat(fromJS(action.payload))
    }
    default:
      return state;
  }
}; 
export default auth;
