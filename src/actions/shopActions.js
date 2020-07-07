import {
  UPDATE_CART,
  UPDATE_ITEMS
} from './actionTypes';
import { 
  GET_SHOP_DATA,
  CART_ITEMS
} from '../urls';

export function updateCart(cart) {
  return {
    type: UPDATE_CART,
    payload: cart,
  };
}

export function updateItems(items) {
  return {
    type: UPDATE_ITEMS,
    payload: items,
  };
}
export function getItems(limit) {
  return (dispatch, getState) => {
    fetch(`${GET_SHOP_DATA}?limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        response.json().then((json) => { 
          console.log(json);
          dispatch(updateItems(json));
        })
      })
      .catch(() => {
    });
  } 
}

export const getCartItems  = () => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(CART_ITEMS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      }
    })
      .then((response) => {        
        if(response.status === 200) {
          response.json().then((json) => {
            dispatch(updateCart(json));
          })
          
        }
      })
      .catch(() => {
    });
  } 
}
