import {
  UPDATE_RESPONSE, 
  UPDATE_LOGGED_IN, 
  UPDATE_CITIES, 
  UPDATE_CATEGORIES,
  UPDATE_POPULAR_VENUES
} from './actionTypes';
import { toast } from 'react-toastify';
import { 
  REGISTER_API,
  LOGIN_API, 
  CITY_LIST_API, 
  CATEGORIES, 
  BUSINESS_SIGN_UP,
  POPULAR_VENUES
  } from '../urls';

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
    type: UPDATE_CITIES,
    payload: cities,
  };
}

export function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    payload: categories,
  };
}

export function updatePopularVenues(venues) {
  return {
    type: UPDATE_POPULAR_VENUES,
    payload: venues,
  };
}

export function RegisterUser(data, isVendor = false, callbackFunction) {
  return (dispatch) => {
    const url = isVendor ? BUSINESS_SIGN_UP : REGISTER_API
    fetch(url, {
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
            if( typeof callbackFunction !== 'undefined') {
              setTimeout(() => {
                callbackFunction()
              },1000);
            }
            
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
  console.log(data);
  return (dispatch) => {
    fetch(LOGIN_API, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            console.log(json);
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



export const fetchCities = () => {
  return (dispatch) => {
    fetch(CITY_LIST_API, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            dispatch(updateCities(json));
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
        toast("Contact Support")
    });
  }
  
}

export const fetchCategories = () => {
  return (dispatch) => {
    fetch(CATEGORIES, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            dispatch(updateCategories(json));
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
        toast("Contact Support")
    });
  } 
}

export const fetchPopularVenues = (locationId) => {
  return (dispatch) => {
    fetch(`${POPULAR_VENUES}${locationId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            console.log('00000')
            console.log(json);
            dispatch(updatePopularVenues(json));
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
        toast("Contact Support")
    });
  } 
}
