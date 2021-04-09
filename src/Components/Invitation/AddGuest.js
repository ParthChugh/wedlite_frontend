import React, { useState, useEffect } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';

import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'


const AddGuest = (props) => {

  const { register, handleSubmit, errors } = useForm()
  const { weddingEvents, InvitationActions: {createGuest}} = props;
  
  return (
    <div className='add-guest'>
      <h5>Add Guest</h5>
      <p className='sub-heading-invitation'>Add the guest name with their<br />contact information</p>
      <form className="margin-top-10 d-flex flex-column " onSubmit={handleSubmit(createGuest)}>
        <div className="d-flex flex-row flex-wrap">

          <div className="flex-column margin-10">
            <label className="sub-heading-invitation">Guest Name</label>
            <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 10, marginRight: 10 }} >
              <input name="guest_name" type="tel" tabIndex="1" className="form-control" style={{ borderRadius: 10 }} placeholder="" ref={
                register({
                  required: true,
                })} />
              {errors.groom_name && <span style={{ color: 'red', }}>Enter valid Guest Name</span>}
            </div>
          </div>
          <div className="flex-column d-flex margin-10" style={{ marginBottom: 10, marginRight: 10 }}>
            <label className="sub-heading-invitation" style={{ marginVertical: 20 }}>Members Invited</label>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <select  ref={register} name="member_invited">
                <option value="0">Single</option>
                <option value="1">Couple</option>
                <option value="1">Family</option>
              </select>
              {errors.member_invited && <span style={{ color: 'red', }}>Enter valid Members Invited</span>}
            </div>
          </div>

          <div className="flex-column d-flex margin-10" style={{ marginRight: 10 }}>
            <label className="sub-heading-invitation" >Ph-Number</label>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <input name="phone" type="tel" tabIndex="1" className="form-control" style={{ borderRadius: 10 }} placeholder="" ref={
                register({
                  required: true,
                })} />
              {errors.guest_invitee_name && <span style={{ color: 'red', }}>Enter valid PH-Number</span>}
            </div>
          </div>
          <div className="flex-column d-flex margin-10" style={{ marginRight: 10 }}>
            <label className="sub-heading-invitation" >Email-id</label>
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <input name="email" type="tel" tabIndex="1" className="form-control" style={{ borderRadius: 10 }} placeholder="" ref={
                register({
                  required: true,
                })} />
              {errors.guest_invitee_name && <span style={{ color: 'red', }}>Enter valid Email</span>}
            </div>
          </div>
        </div>
        <div className="d-flex flex-row flex-wrap">
          {Object.values(weddingEvents).map((el, index) =>
            <div key={index} className="form-group form-check" style={{marginRight: 10}}>
            <input name="acceptTerms" type="checkbox" ref={register} id="acceptTerms" className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`} />
            <label for="acceptTerms" className="form-check-label">{el.name}</label>
            <div className="invalid-feedback">{errors.acceptTerms?.message}</div>
          </div>
          )}
        </div>

        
        <button
          className='submit-btn'
          type="submit"

        >
          Submit
        </button>

      </form>
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
)(AddGuest);