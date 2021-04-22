import {WEDDING_INVITATION, CART_ITEMS} from '../urls';
import {
  UPDATE_WEDDING_CARDS, 
  UPDATE_EVENTS, 
  REMOVE_EVENTS,
  UPDATE_SELECTED_CARD,
  UPDATE_PEROSONAL_DETAILS,
  UPDATE_GUEST_LIST,
  UPDATE_GUEST_EVENT_LIST,
  UPDATE_PREVIEW
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

export function updatePreview(response) {
  return {
    type: UPDATE_PREVIEW,
    payload: response,
  };
}

export function updateGuestEventList(response) {
  return {
    type: UPDATE_GUEST_EVENT_LIST,
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
    console.log("updateFields133131", updateFields)
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
          // console.log('response311431331', el)
          dispatch(getGuestList(selectedCard.id))
        })

      })
      .catch(() => {
    });
  } 
}

export const getWeddingEvents = (card) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    console.log('`${WEDDING_INVITATION}grand-event/${card}/events/`', `${WEDDING_INVITATION}grand-event/${card}/events/`)
    fetch(`${WEDDING_INVITATION}grand-event/${card}/events/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      }
    })
      .then((response) => {
        if(response.status === 200)  {
          response.json().then((el => {
            el.results.forEach(newData => {
              dispatch(updateEvents(newData))
            })
          }
          ))  
        }

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

export const getGuestList = (card) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    
    let url = `${WEDDING_INVITATION}create-guest-list`
    url = `${url}?grand_event=${card}`
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
          console.log('el133113',el)
          dispatch(updateGuestList({list: el, type: card}))
        })
      })
      .catch(() => {
    });
  } 
}

export const getGuestEventList = (fields) => {
  console.log('fields3131', fields)
  return (dispatch, getState) => {
    const { auth } = getState();
    let url = `${WEDDING_INVITATION}guest-in-event-list/?event-invited=${fields.event}&grand-event=${fields.grand_event}`
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
          console.log('el133113',el)
          dispatch(updateGuestEventList({list: el.results, type: fields.event}))
        })
      })
      .catch(() => {
    });
  } 
}

export const updateGuest = (fields, deleteItem) => {
  return (dispatch, getState) => {
    const { auth, invitation } = getState();
    console.log(`${WEDDING_INVITATION}guest-event-add-delete/?guest_id=${fields.guest_id}&event_id=${fields.event_id}`)
    let url = `${WEDDING_INVITATION}guest-event-add-delete/?guest_id=${fields.guest_id}&event_id=${fields.event_id}`
    // url = `${url}?grand_event=${id}`
    fetch(url, {
      method: deleteItem ? 'DELETE' : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        dispatch(getGuestEventList({event: fields.event_id, grand_event: invitation.toJS().selectedCard.id }))
        dispatch(getGuestList(invitation.toJS().selectedCard.id))
      })
      .catch(() => {
    });
  } 
}

export const getPreview = (fields) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    let url = `${WEDDING_INVITATION}preview/?event_id=${fields.event_id}&invitee_id=${fields.invitee_id}&grand_event=${fields.grand_event}`
    console.log("url13131", url)
    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {  
        response.text().then((json) => {
          dispatch(updatePreview(json))
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
    fetch(`${WEDDING_INVITATION}my-card/`, {
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
          
          response.json().then(el => {
            console.log('resposne1331', el);
            dispatch(updateSelectedCard(el))
          })
        }
      })
      .catch(() => {
    });
  } 
}

export const addEvent = (fields, card) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}grand-event/${card}/events/`, {
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

export const getCustomEvents = (event) => {
  return (dispatch, getState) => {
    const {invitation, auth} = getState();
    let selectedCard = event
    if(!event) {
      selectedCard = invitation.toJS().selectedCard.id
    } 
    fetch(`${WEDDING_INVITATION}grand-event/${selectedCard}/events/`, {
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
            dispatch({type: REMOVE_EVENTS, payload: {}})
            el.results.forEach(newData => {
              dispatch(updateEvents(newData))
            })
            
          }))  
        }
      })
      .catch(() => {
    });
  } 
}

export const deleteCustomEvent = (grand_event, id) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}grand-event/${grand_event}/events/${id}`, {
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
        dispatch(getCustomEvents())
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
    fetch(`${WEDDING_INVITATION}grand-event/${fields.grand_event}/invitee/`, {
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

export const getPeronalDetails = (grand_event) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    fetch(`${WEDDING_INVITATION}grand-event/${grand_event}/invitee/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
    })
      .then((response) => {
        response.json().then((el => {
          if(response.status === 200) {
            console.log("1331el1313", el)
            dispatch(handlePersonalDetils(el))
          } 
        }))  
      })
      .catch(() => {
    });
  } 
}

export const addToCart = (id) => {
  return (dispatch, getState) => {
    const {auth} = getState();
    if(auth.get('isLoggedIn')) {
      fetch(CART_ITEMS, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Token ${auth.getIn([
            'response', 'token'
          ])}`,
        },
        body: JSON.stringify({
          "quantity": 1,
          "product_id": id
        })
      })
        .then((response) => {
          if(response.status === 201) {
            response.json().then((json) => {
              // history.push('/login')
              // console.log(json);
              // getCartItems({callbackFunction: () => {}})
            })
          } 
          
        })
        .catch(() => {
      });
    } else {
      // toast('Please Login')
      // history.push('/login')
    }
  }
}
