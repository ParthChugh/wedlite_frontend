import {WEDDING_INVITATION} from '../urls';
import {
  UPDATE_WEDDING_CARDS, 
  UPDATE_EVENTS, 
  REMOVE_EVENTS,
  UPDATE_SELECTED_CARD,
  UPDATE_PEROSONAL_DETAILS,
  UPDATE_GUEST_LIST
} from './actionTypes';

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

export function updateGuestList(response) {
  return {
    type: UPDATE_GUEST_LIST,
    payload: response,
  };
}

export function handlePersonalDetils(response) {
  return {
    type: UPDATE_PEROSONAL_DETAILS,
    payload: response,
  };
}

export function updateSelectedCard(response) {
  return {
    type: UPDATE_SELECTED_CARD,
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

export const createGuest = (fields, callbackFunction) => {
  return (dispatch, getState) => {
    const {invitation, auth} = getState();
    const selectedCard = invitation.toJS().selectedCard
    const updateFields = {...fields, grand_event: selectedCard.id }
    console.log('updateFields3131', updateFields)
    fetch(`${WEDDING_INVITATION}create-guest-list/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body: JSON.stringify(updateFields),
    })
      .then((response) => {
        // callbackFunction(response)
        
        response.json().then(el => {
          console.log('response311431331', el)
        })

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

export const getGuestList = (event) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    let url = `${WEDDING_INVITATION}create-guest-list`
    if(event) {
      url = `${url}?grand_event=${event}`
    }
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        response.json().then(el => {
          if(event) {
            dispatch(updateGuestList({list: el, tpye: event}))
          } else {
            dispatch(updateGuestList({list: el, type: 'all'}))
          }
          

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
      body: JSON.stringify({theme_card: cardId}),
    })
      .then((response) => {
        console.log('setSelectedCard', response)
        if(response.status === 201)  {
          response.json().then(el => dispatch(updateSelectedCard(el)))
        } else {
          history.push('/login')
        }
      })
      .catch(() => {
    });
  } 
}

export const getSelectCard = () => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}select-card/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        if(response.status === 200)  {
          console.log('resposne1331', response);
          response.json().then(el => dispatch(updateSelectedCard(el)))
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

export const submitPersonalDetails = (fields, edit=false) => {
  console.log('fields1331', fields)
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}invitee/`, {
      method: edit ? 'patch' : 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body: JSON.stringify(fields)
    })
      .then((response) => {
        response.json().then((el => {
          if(response.status === 201) {
            dispatch(handlePersonalDetils(el))
          } else {
            dispatch(submitPersonalDetails(fields, true))
          } 
        }))  
      })
      .catch(() => {
    });
  } 
}
