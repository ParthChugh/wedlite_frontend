import {fromJS} from 'immutable';
import { 
  UPDATE_WEDDING_CARDS, UPDATE_EVENTS, REMOVE_EVENTS
} from "../actions/actionTypes";

const INIT_STATE = {
  invitationCards: {},
  events: {}
};

const wedding = (state = fromJS(INIT_STATE) , action) => {
  switch (action.type) {
    case UPDATE_WEDDING_CARDS: {
      return state.merge({
        invitationCards: action.payload,
      });
    }
    case UPDATE_EVENTS: {
      return state.merge({
        events: {...state.toJS().events, [action.payload.id]: action.payload},
      });
    }
    case REMOVE_EVENTS: {
      return state.merge({
        events: action.payload,
      });
    }

    default:
      return state;
  }
}; 
export default wedding;
