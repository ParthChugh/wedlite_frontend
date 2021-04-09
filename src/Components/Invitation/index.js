import React, { useState, useEffect } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faChevronCircleDown, faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddGuest from './AddGuest'
import { useHistory } from 'react-router-dom'
import Layout from '../Layout';

import './styles.css';

const Invitation = (props) => {
  const history = useHistory();

  const { InvitationActions: { handlePersonalDetils, getSelectCard, getWeddingCards, selectCard, getCustomEvents, addEvent, deleteCustomEvent, submitPersonalDetails }, invitation: { invitationCards, events, selectedCard, personalInvitation } } = props;

  console.log('selectedCard1331', personalInvitation)
  const { register, handleSubmit, errors } = useForm()
  const [card, setSelectedCard] = useState(null)
  const [state, setState] = useState({})
  const [errorsInvitation, setErrors] = useState({})
  const [weddingEvents, setWeddingEvents] = useState({})

  useEffect(() => {
    setWeddingEvents(events)
  }, [events])

  // const personalInvitation = {
  //   bride_name: "bride",
  //   grand_event: 44,
  //   groom_name: "Groom name",
  //   guest_invitee_name: "guest",
  //   id: 6
  // }


  useEffect(() => {
    getWeddingCards()
    getCustomEvents()
    // getPeronalDetails()
    getSelectCard()
  }, [])

  const saveData = (key, value) => {
    setState({ ...state, [key]: value.target.value })
    const keys = ['name', 'date', 'time', 'venue', 'venue_address']
    let errors = {}
    keys.forEach(el => {
      if (!(state[el] && state[el] !== '')) {
        errorsInvitation[el] = `${capitalize(el.replace('_', ' '))} is mandatory `
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
    const keys = ['name', 'date', 'time', 'venue', 'venue_address']
    let errorsInvitation = {}
    keys.forEach(el => {
      if (!(state[el] && state[el] !== '')) {
        errorsInvitation[el] = `${capitalize(el.replace('_', ' '))} is mandatory `
      }
    })

    setErrors(errorsInvitation);
    if (Object.values(errorsInvitation).length === 0) {
      console.log('e133131', state)
      addEvent(state)
    } else {
      return;
    }

  }

  const personalDetailsUpdate = (props) => {
    submitPersonalDetails({ ...props, grand_event: selectedCard.id })

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
                      setSelectedCard(el.id)
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
                      setSelectedCard(el.id)
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
            <div className="invitation-details">
              {Object.values(personalInvitation).length === 0 ?
                <form className="margin-top-10 d-flex flex-column " onSubmit={handleSubmit(personalDetailsUpdate)}>
                  <label className="font-size-label" style={{ fontWeight: 'bold', marginVertical: 20 }}>Personal Details.</label>

                  <div>
                    <div className="d-flex margin-10">
                      <label className="font-size-label" style={{ width: "30%" }}>Groom name</label>
                      <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10 }} >
                        <input name="groom_name" type="tel" tabIndex="1" className="form-control" style={{ borderRadius: 10 }} placeholder="" ref={
                          register({
                            required: true,
                          })} />
                        {errors.groom_name && <span style={{ color: 'red', }}>Enter valid Groom Name</span>}
                      </div>
                    </div>
                    <div className="d-flex margin-10" style={{ marginBottom: 10 }}>
                      <label className="font-size-label" style={{ width: "30%", marginVertical: 20 }}>Bride name</label>
                      <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <input name="bride_name" type="tel" tabIndex="1" className="form-control" style={{ borderRadius: 10 }} placeholder="" ref={
                          register({
                            required: true,
                          })} />
                        {errors.bride_name && <span style={{ color: 'red', }}>Enter valid Bride Name</span>}
                      </div>
                    </div>

                    <div className="d-flex margin-10">
                      <label className="font-size-label" style={{ width: "30%" }}>Guest Invitee name</label>
                      <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <input name="guest_invitee_name" type="tel" tabIndex="1" className="form-control" style={{ borderRadius: 10 }} placeholder="" ref={
                          register({
                            required: true,
                          })} />
                        {errors.guest_invitee_name && <span style={{ color: 'red', }}>Enter valid Name</span>}
                      </div>
                    </div>
                    <div>
                      <button
                        className="fill-button "
                        type="submit"
                        style={{ marginLeft: 10, paddingLeft: 40, paddingRight: 30, marginTop: 30 }}
                      >
                        Submit details
                      </button>
                    </div>

                    
                  </div>


                </form>
                :
                <div className="d-flex flex-column ">
                  <span>Invitee Name: {personalInvitation.guest_invitee_name}</span>
                  <span>Bride Name: {personalInvitation.bride_name}</span>
                  <span>Groom Name: {personalInvitation.groom_name}</span>
                  <button
                    className="fill-button "
                    onPress={() => { handlePersonalDetils({}) }}
                    style={{ marginLeft: 10, paddingLeft: 40, paddingRight: 30, marginTop: 30 }}
                  >
                    Edit
                </button>
                </div>
              }
            </div>

            {Object.values(weddingEvents).map((el, index) =>
              <div key={index} className='invitation-details'>
                <div>
                  {Object.keys(el).map(newel => (`${capitalize(newel)}: ${el[newel]}\n`)).join()}
                </div>
                <button onClick={() => { deleteCustomEvent(el.id) }} className='remove-event-btn'>Remove Event</button>
              </div>
            )}
            <div className='invitation-details'>
              <h5>Invitation Details</h5>
              <form onSubmit={handleSubmitInvitation}>
                <label for='event-name' className='text'>Event Name</label><br />
                <select className='event-form' name='event-name' onChange={(value) => { saveData('name', value) }}>
                  <option value='Wedding' >...</option>
                  <option value='Wedding' >Wedding</option>
                  <option value='Reception' >Reception</option>
                  <option value='Sangeet' >Sangeet</option>
                  <option value='Mehendi' >Mehendi</option>
                </select>
                <span>{errorsInvitation['name']}</span>
                <div>
                  <label for='couple-name'>Wedding Couple Name</label><br />
                  {/* <div className="d-flex flex-row ">
                    <div className="d-flex flex-column invitation-row">
                      <input className='couple-name' name='couple-name' type='text' placeholder='Groom name' onChange={(value) => saveData('groom_name', value)} />
                      <span>{errorsInvitation['groom_name']}</span>
                    </div>
                    <div className="d-flex flex-column invitation-row">
                      <input className='couple-name' name='couple-name' type='text' placeholder='Bride name' onChange={(value) => saveData('bride_name', value)} />
                      <span>{errorsInvitation['bride_name']}</span>
                    </div>

                  </div> */}
                  <div className="d-flex justify-content-around">


                  </div>

                  <label for='dateNtime'>Date & time</label><br />
                  <div className="d-flex flex-row ">
                    <div className="d-flex flex-column invitation-row">
                      <input className='date' name='dateNtime' type='date' placeholder='date here' onChange={(value) => saveData('date', value)} />
                      <span>{errorsInvitation['date']}</span>
                    </div>
                    <div className="d-flex flex-column invitation-row">
                      <input className='time' name='dateNtime' type='time' placeholder='time here' onChange={(value) => saveData('time', value)} />
                      <span>{errorsInvitation['time']}</span>
                    </div>
                  </div>
                  <label for='venue'>Venue</label><br />
                  <input className='venue' name='venue' type='text' placeholder='e.g. Hotel Fortune' onChange={(value) => saveData('venue', value)} /><br />
                  <span>{errorsInvitation['venue']}</span><br />
                  <label for='venue-address'>Venue Address</label><br />
                  <textarea className='venue-address' name='venue-address' onChange={(value) => saveData('venue_address', value)} rows='3' cols='30'></textarea><br />
                  <span>{errorsInvitation['venue_address']}</span>

                </div>
                <button className='submit-btn'>Submit</button>
              </form>
            </div>
          </div>
          <div className="wedding-invitation">
            <div className='card-heading' align='center'>Preview of the selected card</div>
            <div className='card-preview'>
              <img src='src/assets/wedding-card.png' />
            </div>
          </div>
        </div>
        <div className="invitation-container flex-column" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
          <div>
            <div className="heading-invitation">
              Guest Information
            </div>
            <p className="sub-heading-invitation">
              It holds the basic information of the guest who are invited<br />for the wedding
            </p>
          </div>
          <AddGuest weddingEvents={weddingEvents}/>
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
                  <td>+91 994433821</td>dd
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
