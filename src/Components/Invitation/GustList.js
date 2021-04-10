import React, { useState, useEffect, useRef } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const GuestList = (props) => {
  return (
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
)(GuestList);