import {WEDDING_INVITATION} from '../urls';
import {UPDATE_WEDDING_CARDS, UPDATE_EVENTS, REMOVE_EVENTS} from './actionTypes';

export function updateWeddingCards(response) {
  return {
    type: UPDATE_WEDDING_CARDS,
    payload: response,
  };
}

export function updateEvents(response) {
  return {
    type: UPDATE_EVENTS,
    payload: response,
  };
}

export const updateInvitationInfo  = (fields, callbackFunction) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}invitee-info/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body: JSON.stringify(fields),
    })
      .then((response) => {
        callbackFunction(response)
      })
      .catch(() => {
    });
  } 
}

export const createGuest  = (fields, callbackFunction) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}guest-info-list/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body: JSON.stringify(fields),
    })
      .then((response) => {
        callbackFunction(response)
      })
      .catch(() => {
    });
  } 
}

export const addDeleteUser  = (fields, callbackFunction) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}guest-event-add-delete/?id=${fields.id}&event=${fields.event}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        callbackFunction(response)
      })
      .catch(() => {
    });
  } 
}
export const addDeleteGuestUser  = (fields, callbackFunction) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}guest-event-add-delete/?id=${fields.id}&event=${fields.event}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        callbackFunction(response)
      })
      .catch(() => {
    });
  } 
}

export const getGuestList = (fields, callbackFunction) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}guest-info-list/?id=${fields.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        callbackFunction(response)
      })
      .catch(() => {
    });
  } 
}

export const getWeddingCards = () => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}cards/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        response.json().then(el => {
          dispatch(updateWeddingCards(el))
        })
        
      })
      .catch(() => {
    });
  } 
}

export const getGuestListEventList = (fields, callbackFunction) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}guest-info-event-list/?id=${fields.id}&event-invited=${fields.event}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        callbackFunction(response)
      })
      .catch(() => {
    });
  } 
}

export const selectCard = (cardId, history) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}select-card/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body: JSON.stringify({card: cardId}),
    })
      .then((response) => {
        if(response.status === 201)  {
        } else {
          history.push('/login')
        }
      })
      .catch(() => {
    });
  } 
}

export const addEvent = (fields) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}events/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body: JSON.stringify(fields),
    })
      .then((response) => {
        
        if(response.status === 201)  {
          response.json().then((el => dispatch(updateEvents(el))))  
        }
      })
      .catch(() => {
    });
  } 
}

export const getCustomEvents = (initial) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}events/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        
        if(response.status === 200)  {
          
          response.json().then((el => {
            console.log('el1331',el)
            
            
            dispatch({type: REMOVE_EVENTS, payload: {}})
            
          
            el.forEach(newData => {
              dispatch(updateEvents(newData))
            })
            
          }))  
        }
      })
      .catch(() => {
    });
  } 
}

export const deleteCustomEvent = (id) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}events/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        console.log('response1313', response)
        dispatch(getCustomEvents(true))
        // if(response.status === 204)  {
        //   response.json().then((el => {
        //     el.forEach(newData => {
        //       dispatch(updateEvents(newData))
        //     })
        //   }))  
        // }
      })
      .catch(() => {
    });
  } 
}
