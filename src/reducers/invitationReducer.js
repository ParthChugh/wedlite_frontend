import {fromJS} from 'immutable';
import { 
  UPDATE_WEDDING_CARDS, 
  UPDATE_EVENTS, 
  REMOVE_EVENTS,
  UPDATE_SELECTED_CARD,
  UPDATE_PEROSONAL_DETAILS,
  UPDATE_GUEST_LIST
} from "../actions/actionTypes";

const INIT_STATE = {
  invitationCards: {},
  events: {},
  selectedCard: {},
  personalInvitation: {},
  guestList: {}
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
    case UPDATE_PEROSONAL_DETAILS: {
      return state.merge({
        personalInvitation: action.payload
      });
    }
    case UPDATE_SELECTED_CARD: {
      return state.merge({
        selectedCard: action.payload,
      });
    }
    case UPDATE_GUEST_LIST: {
      return state.merge({
        guestList: {...state.guestList.toJS(),[action.payload.type]: action.payload.list},
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
