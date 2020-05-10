import {UPDATE_RESPONSE, UPDATE_LOGGED_IN} from './actionTypes';
import {  toast } from 'react-toastify';
import { REGISTER_API, LOGIN_API } from '../urls';

export function updateLoginResponse(response) {
  return {
    type: UPDATE_RESPONSE,
    payload: response,
  };
}

export function updateLoggedIn(isLoggedIn) {
  return {
    type: UPDATE_LOGGED_IN,
    payload: isLoggedIn,
  };
}

export function  RegisterUser(data) {
  return (dispatch) => {
    fetch(REGISTER_API, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 201) {
          response.json().then((json) => {  
            dispatch(updateLoginResponse(json));
            dispatch(updateLoggedIn(true));
            toast("Welcome")
          })
        } else {
          toast("Some problem please contact supportas")
          dispatch(updateLoggedIn(false));
        }
      })
      .catch(() => {
        toast("Some problem please contact supportas")
        dispatch(updateLoggedIn(false));
    });
  }
  
}
export function loginUser(data) {
  return (dispatch) => {
    fetch(LOGIN_API, {
      method: 'POST', 
      body: JSON.stringify(data),
    })
      .then((response) => response.json().then((json) => {
        if(response.status === 201) {
          response.json().then((json) => {
            dispatch(updateLoginResponse(json));
            dispatch(updateLoggedIn(true));
            toast("Welcome")
          })
        } else {
          toast("Some problem please contact supportas")
          dispatch(updateLoggedIn(false));
        }
        
  
      }))
      .catch(() => {
        toast("Some problem please contact supportas")
        dispatch(updateLoggedIn(false));
    });
  }
}