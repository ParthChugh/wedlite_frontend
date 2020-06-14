import {
  UPDATE_CART,
  UPDATE_ITEMS
} from './actionTypes';
import { 
  GET_SHOP_DATA,
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

export function getItems() {
  return (dispatch, getState) => {
    fetch(`${GET_SHOP_DATA}`, {
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
