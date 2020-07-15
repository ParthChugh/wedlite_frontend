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

const getMethod = ({isUpdate, isGet}) => {
  if(isGet) {
    return 'GET'
  } else {
    if(isUpdate) {
      return 'PATCH'
    }
    return 'POST'
  }
}
export const createAddress  = ({data, callbackFunction, isUpdate, isGet }) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const method = getMethod({isUpdate, isGet})
    const body = JSON.stringify(data)
    fetch(ADDRESS_CREATE, {
      method: method, 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body
    })
      .then((response) => {
        response.json().then((json) => {
          console.log(response.status);
          console.log(json);
          if(response.status === 201) {
            // dispatch(concatDeliveryAddress(json))
            callbackFunction(json);
          }
          if(response.status === 200) {
            // dispatch(concatDeliveryAddress(json))
            callbackFunction(json);
          }
        })
      })
      .catch(() => {
    });
  } 
}
