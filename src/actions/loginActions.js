import {UPDATE_RESPONSE, UPDATE_LOGGED_IN, UPDATE_CITIES} from './actionTypes';
import {  toast } from 'react-toastify';
import { REGISTER_API, LOGIN_API,  } from '../urls';

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

export function handleClearData() {
  return (dispatch) => {
    dispatch(updateLoginResponse({}))
    dispatch(updateLoggedIn(false))
  
  }
}

export function updateCities(cities) {
  return {
    type:  UPDATE_CITIES,
    payload: cities,
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
          toast("Email already exist")
          dispatch(updateLoggedIn(false));
        }
      })
      .catch(() => {
        toast("Email already exist")
        dispatch(updateLoggedIn(false));
    });
  }
  
}
export function loginUser(data) {
  return (dispatch) => {
    fetch(LOGIN_API, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log(response);
        if(response.status === 200) {
          response.json().then((json) => {
            dispatch(updateLoginResponse(json));
            dispatch(updateLoggedIn(true));
            toast("Welcome")
          })
        } else {
          toast("Email/Password is Incorrect")
          dispatch(updateLoggedIn(false));
        }
      })
      .catch(() => {
        toast("Email/Password is Incorrect")
        dispatch(updateLoggedIn(false));
    });
  }
}