import React, { useState, useEffect } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faChevronCircleDown, faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Layout from '../Layout';

import './styles.css';

const Invitation = (props) => {
  const history = useHistory();

  const { InvitationActions: { getWeddingCards, selectCard, getCustomEvents, addEvent, deleteCustomEvent }, invitation: { invitationCards, events } } = props;
  const [card, selectedCard] = useState(null)
  const [state, setState] = useState({})
  const [errors, setErrors] = useState({})
  const [weddingEvents, setWeddingEvents] = useState({})
  
  useEffect(() => {
    setWeddingEvents(events)
  },[events])

  useEffect(() => {
    getWeddingCards()
    getCustomEvents()
  }, [])

  const saveData = (key, value) => {
    setState({...state, [key]: value.target.value})
    const keys = ['name', 'bride_name','date','groom_name', 'time', 'venue','venue_address']
    let errors = {}
    keys.forEach(el => {
      if(!(state[el] && state[el] !== '')) {
        errors[el] = `${capitalize(el.replace('_', ' '))} is mandatory `
      }
    })
    setErrors(errors);
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  const handleSubmitInvitation = (event) => {
    event.preventDefault();
    const keys = ['name', 'bride_name','date','groom_name', 'time', 'venue','venue_address']
    let errors = {}
    keys.forEach(el => {
      if(!(state[el] && state[el] !== '')) {
        errors[el] = `${capitalize(el.replace('_', ' '))} is mandatory `
      }
    })
    
    setErrors(errors);
    if(Object.values(errors).length === 0) {
      console.log('e133131', state)
      addEvent(state)
    } else {
      return;
    }
    
  }

  return (
    <Layout
      showSearchBar={false}
    >
      <div style={{ backgroundColor: '#F8F8F8' }}>
        <div className="d-flex flex-row " style={{ alignItems: 'center', marginLeft: 20, paddingTop: 20 }}>
          <FontAwesomeIcon onClick={() => { }} className="icon-outer font-icon" size={24} icon={faIdCard} size="3x" color="#A63A67" style={{ marginLeft: 20, marginRight: 20 }} />
          <div>
            <div className="text-invitation">
              Select Card Design
            </div>
            <div style={{ color: "#808080" }} className="text-invitation-sub">
              Select any of the card which suitable for your wedding
            </div>
          </div>
        </div>

        <div className="invitation-container" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <div className="heading-invitation">
                Wedding Cards
              </div>
              <p className="sub-heading-invitation">
                Varied type cards of listed below select any of the cards<br /> which suits your wedding theme
              </p>
            </div>

            <div>
              <div className="border-dropdown-container d-flex flex-row" style={{ alignItems: 'center' }}>
                <div className="border-dropdown">
                  Types of card
                </div>
                <div>
                  <FontAwesomeIcon onClick={() => { }} size={24} icon={faChevronCircleDown} size="1x" color="#000000" style={{ margin: 20 }} />
                </div>
              </div>
            </div>

          </div>
          <div className="d-flex flex-row flex-wrap " style={{ marginTop: 20 }}>
            {invitationCards?.results?.map(el => (
              <div className="d-flex flex-column" key={el.id} style={{ marginLeft: 20, marginRight: 20, marginTop: 20, }}>
                <img style={{ width: 170, height: 170 }} alt={el.name} src={el.card_thumbnail_image} />
                <span className="name-invitation">{el.card_name}</span>
                <span style={{ color: "#A63A67", fontSize: 14 }}>₹ {el.price} per card</span>
                {card !== el.id ?
                  <button
                    className="fill-button"
                    style={{ marginLeft: 10, }}
                    onClick={() => {
                      selectCard(el.id, history)
                      selectedCard(el.id)
                    }}>

                    <span style={{ fontSize: 12 }}>
                      Select card
                    </span>
                  </button>
                  :
                  <button
                    className="blank-button"
                    style={{ marginLeft: 10, marginTop: 10 }}
                    onClick={() => {
                      selectCard(el.id, history)
                      selectedCard(el.id)
                    }}>
                    <span style={{ fontSize: 12 }}>
                      UnSelect Card
                    </span>
                  </button>
                }
              </div>
            ))}
          </div>

        </div>
        <div className="d-flex flex-row " style={{ alignItems: 'center', marginLeft: 20, paddingTop: 20 }}>
          <FontAwesomeIcon onClick={() => { }} className="icon-outer font-icon" size={24} icon={faPencilRuler} size="3x" color="#A63A67" style={{ marginLeft: 20, marginRight: 20 }} />
          <div>
            <div className="text-invitation">
              Enter Details
            </div>
            <div style={{ color: "#808080" }} className="text-invitation-sub">
              Enter details which will be displayed over the card
            </div>
          </div>
        </div>
        <div className="d-flex flex-row invitation-container flex-wrap">
          <div className="wedding-invitation">
            <div className="heading-invitation">
              Wedding Card Information
            </div>
            <p className="sub-heading-invitation">
              It holds the basic information of the wedding card  which includes <br />name of the couple , venue , date & time etc
            </p>
            {Object.values(weddingEvents).map((el, index) => 
              <div key={index} className='invitation-details'>
                <div>
                  {Object.keys(el).map(newel => (`${capitalize(newel)}: ${el[newel]}\n`) ).join()}
                </div>
                <button onClick={() => {deleteCustomEvent(el.id)}}className='remove-event-btn'>Remove Event</button>
              
              </div>
            )}
            <div className='invitation-details'>
              <h5>Invitation Details</h5>
              <form onSubmit={handleSubmitInvitation}>
                <label for='event-name' className='text'>Event Name</label><br />
                <select className='event-form' name='event-name' onChange={(value) => {saveData('name', value)}}>
                  <option value='Wedding' >...</option>
                  <option value='Wedding' >Wedding</option>
                  <option value='Reception' >Reception</option>
                  <option value='Sangeet' >Sangeet</option>
                  <option value='Mehendi' >Mehendi</option>
                </select>
                <span>{errors['name']}</span>
                <div>
                  <label for='couple-name'>Wedding Couple Name</label><br />
                  <div className="d-flex flex-row ">
                    <div className="d-flex flex-column invitation-row">
                      <input className='couple-name' name='couple-name' type='text' placeholder='Groom name' onChange={(value) => saveData('groom_name', value)} />
                      <span>{errors['groom_name']}</span>
                    </div>
                    <div className="d-flex flex-column invitation-row">
                      <input className='couple-name' name='couple-name' type='text' placeholder='Bride name' onChange={(value) => saveData('bride_name', value)} />
                      <span>{errors['bride_name']}</span>
                    </div>
                    
                  </div>
                  <div className="d-flex justify-content-around">
                    
                    
                  </div>
                  
                  <label for='dateNtime'>Date & time</label><br />
                  <div className="d-flex flex-row ">
                    <div className="d-flex flex-column invitation-row">
                      <input className='date' name='dateNtime' type='date' placeholder='date here' onChange={(value) => saveData('date', value)} />
                      <span>{errors['date']}</span>
                    </div>
                    <div className="d-flex flex-column invitation-row">
                      <input className='time' name='dateNtime' type='time' placeholder='time here' onChange={(value) => saveData('time', value)}/>
                      <span>{errors['time']}</span>
                    </div>
                  </div>
                  <label for='venue'>Venue</label><br />
                  <input className='venue' name='venue' type='text' placeholder='e.g. Hotel Fortune' onChange={(value) => saveData('venue', value)}/><br />
                  <span>{errors['venue']}</span><br />
                  <label for='venue-address'>Venue Address</label><br />
                  <textarea className='venue-address' name='venue-address' onChange={(value) => saveData('venue_address', value)} rows='3' cols='30'></textarea><br />
                  <span>{errors['venue_address']}</span>
                  
                </div>
                <button className='submit-btn'>Submit</button>
              </form>
            </div>
          </div>
          <div className="wedding-invitation"> 
            <div className='card-heading' align='center'>Preview of the selected card</div>
            <div className='card-preview'>
              <img src='src/assets/wedding-card.png'/>
            </div>
            </div>
          </div>
        <div className="invitation-container" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
          <div>
            <div className="heading-invitation">
              Guest Information
              </div>
            <p className="sub-heading-invitation">
              It holds the basic information of the guest who are invited<br />for the wedding
              </p>
          </div>
          <div className='add-guest'>
            <h5 >Add Guest</h5>
            <p className='sub-heading-invitation'>Add the guest name with their<br />contact information</p>
            <form align='left'>
              <section>
                <span className='guest-input-span'>
                  <label className='guest-label' for='guest_name'>Guest Name</label>
                  <input className='guest-input' type='text' name='guest_name' placeholder='Guest Name' />
                </span>
                <span className='guest-input-span'>
                  <label className='guest-label' for='members_invited'>Members Invited</label>
                  <select className='guest-input' name='event-name' placeholder='Select'>
                    <option value='Family' >Family</option>
                    <option value='Couple' >Couple</option>
                    <option value='Single' >Single</option>
                  </select>
                </span>
                <span className='guest-input-span'>
                  <label className='guest-label' for='phone_number'>Ph- Number</label>
                  <input className='guest-input' type='text' name='phone_number' placeholder='phone_number' />
                </span>
                <span className='guest-input-span'>
                  <label className='guest-label' for='email'>Email-id</label>
                  <input className='guest-input' type='email' name='email' placeholder='name@example.com' style={{ padding: 10 }} />
                </span>
              </section>
              <button type='submit' className='event-add-btn' style={{ marginLeft: 20, marginRight: 5 }} >Add</button>
            </form>
          </div>
          <div className='list-container'>
            <div className='guest-list'>
              <div className='guest-list-heading'>
                <div><h5>Guest List</h5>
                  <p className='sub-heading-invitation'>List of guest for the wedding</p></div>
                <div><button className='delete-btn'>Delete All</button></div>
              </div>
              <table className='guest-list-table'>
                <thead>
                  <th>S. no.</th>
                  <th>Name </th>
                  <th>Ph-number</th>
                  <th>Email-id</th>
                  <th>Action</th>
                  <th>Add to</th>
                </thead>
                <tr>
                  <td>1.</td>
                  <td>Maddy</td>
                  <td>+91 993344723</td>
                  <td>maddy@gmail.com</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Dave</td>
                  <td>+91 994433821</td>
                  <td>dave@gmail.com</td>
                  <td></td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div className='event-groups'>
              <h5>Event Groups</h5>
              <p className='sub-heading-invitation'>Drag & Drop the guest or click Add to option to<br />add the guest for invitation card.</p>
              <table className='guest-list-table' style={{ marginLeft: 5 }}>
                <thead>
                  <th>S. no.</th>
                  <th>Name </th>
                  <th>Ph-number</th>
                  <th>Email-id</th>
                  <th>Action</th>
                </thead>
                <tr>
                  <td>1.</td>
                  <td>Maddy</td>
                  <td>+91 993344723</td>
                  <td>maddy@gmail.com</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  const { auth, invitation } = state;
  return { auth, invitation: invitation.toJS() };
};

const mapDispatchToProps = dispatch => {
  return {
    InvitationActions: bindActionCreators(InvitationActionsCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Invitation);
// <div className="d-flex flex-row justify-content-between">
