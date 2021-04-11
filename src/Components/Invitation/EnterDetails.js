import React, { useState, useEffect, useRef } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const EnterDetails = (props) => {
  const { weddingEvents,
    invitation: { 
      selectedCard, 
      personalInvitation 
    }, 
    InvitationActions: {
      handlePersonalDetils, 
      addEvent, 
      deleteCustomEvent, 
      submitPersonalDetails, 
      getCustomEvents, 
      getWeddingEvents, 
      getPreview
    }, children} = props;
  const { register, handleSubmit, errors } = useForm()
  const [state, setState] = useState({})
  const [errorsInvitation, setErrors] = useState({})
  const personalDetailsUpdate = (props) => {
    submitPersonalDetails({ ...props, grand_event: selectedCard.id })
  }
  useEffect(() => {
    getCustomEvents(selectedCard.id)
    getWeddingEvents(selectedCard.id)
  },[selectedCard.id])
  useEffect(() => {
    if(personalInvitation.id && selectedCard.id && Object.values(weddingEvents).length > 0) {
      // fields.event_id}&invitee_id=${fields.invitee_id.id}&grand_event=${fields.grand_event.id}
      getPreview({invitee_id: personalInvitation.id, grand_event: selectedCard.id, event_id: Object.values(weddingEvents)[0]?.id})
    }
  },[personalInvitation.id, selectedCard.id, Object.values(weddingEvents).length > 0 ])

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const handleSubmitInvitation = (event) => {
    event.preventDefault();
    event.target.reset()
    const keys = ['name', 'date', 'time', 'venue', 'venue_address']
    let errorsInvitation = {}
    keys.forEach(el => {
      if (!(state[el] && state[el] !== '')) {
        errorsInvitation[el] = `${capitalize(el.replace('_', ' '))} is mandatory `
      }
    })

    
    setErrors(errorsInvitation);
    if (Object.values(errorsInvitation).length === 0) {
      addEvent({...state, grand_event: selectedCard.id}, selectedCard.id)
    } else {
      return;
    }

  }
  
  

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

  return (
    <div>
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
      <div className="d-flex flex-row invitation-container flex-wrap" ref={children}>
        <div className="wedding-invitation">
          <div className="heading-invitation">
            Wedding Card Information
            </div>
          <p className="sub-heading-invitation">
            It holds the basic information of the wedding card  which includes <br />name of the couple , venue , date & time etc
            </p>
          <div className="invitation-details">
            {Object.values(personalInvitation).length === 0 ?
              <form className="margin-top-10 d-flex flex-column " onSubmit={handleSubmit((data, e) => {personalDetailsUpdate(data);  e.target.reset()})}>
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
                  onClick={() => { 
                    handlePersonalDetils({})
                  }}
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
              <button onClick={() => { deleteCustomEvent(selectedCard.id, el.id) }} className='remove-event-btn'>Remove Event</button>
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
    </div>
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
)(EnterDetails);
// <div className="d-flex flex-row justify-content-between">
