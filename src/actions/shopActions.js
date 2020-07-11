import {
  UPDATE_CART,
  UPDATE_ITEMS,
  UPDATE_DELIVERY_ADDRESS
} from './actionTypes';
import { 
  GET_SHOP_DATA,
  CART_ITEMS,
  ADDRESS_CREATE,
} from '../urls';

export function updateCart(cart) {
  return {
    type: UPDATE_CART,
    payload: cart,
  };
}

export function concatDeliveryAddress(address) {
  return {
    type: UPDATE_DELIVERY_ADDRESS,
    payload: address,
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
          dispatch(updateItems(json));
        })
      })
      .catch(() => {
    });
  } 
}

export const getCartItems  = ({callbackFunction}) => {
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
            callbackFunction(json);
          })
        }
      })
      .catch(() => {
    });
  } 
}

export const createAddress  = ({data, callbackFunction}) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    fetch(ADDRESS_CREATE, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
        body: JSON.stringify(data),
      }
    })
      .then((response) => {
        response.json().then((json) => {
          if(response.status === 200) {
            response.json().then((json) => {
              dispatch(concatDeliveryAddress(json))
              callbackFunction();
            })
          }
        })
      })
      .catch(() => {
    });
  } 
}
