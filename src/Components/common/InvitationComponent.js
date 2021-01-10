import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import './SearchBar.css';
import EmailImage from '../../assets/email.png'
import EmailSendImage from '../../assets/email-send.png'
import ComputerImage from '../../assets/computer.png'
import MaskImage from '../../assets/mask.png'
import Maps from '../../assets/maps.png'

const InvitationComponent = (props) => {
  const history = useHistory();
  
  const handleGoClick = () => {
    history.push('/invitation-card')
  }
  const images = [
    {image: EmailImage, text: "E-Invitation"},
    {image: ComputerImage, text: "Online Transfer"},
    {image: EmailSendImage, text: "Faster"},
    {image: MaskImage, text: "Safer"}

  ]
  return (
    <form className="d-flex flex-column bar-tab" style={{zIndex: 999, paddingLeft: 20}} onSubmit={e => e.preventDefault()}>
      <div className="top-tagline wedding-invitation">Wedding Invitation</div>
      <div className="tagline"><span><br /></span></div>
      <div className="tagline-info" style={{fontSize: 15}}>Find all new exclusive wedding invitation cards and<br/> send them via WhatsApp , Email , SMS which is<br/> faster, safer and secure</div>  
      <div className="d-flex flex-row">
        {images.map(el => (
          <div className="d-flex justify-content-center flex-column icon-container">
            <div className="icon-outer">
              <img
                // style={{width: 30, height: 30}}
                src={el.image}
                alt="First slide"
              />
            </div>
            <span className="text-wedding">{el.text}</span>
          </div>
          
        ))}
      </div>
      <div className="d-flex bar-tab" style={{marginTop: 20}}>
        <button
          type='submit'
          className="fill-button-let-begin"
          onClick={handleGoClick}
          >
            Invite Guest
        </button>
      </div>
      <div className="scan-qr-code"><span>Now Scan the Qr code in the wedding card<br/> to get location of the venue via map application !</span></div>
      <img
        style={{width: 100, height: 100}}
        src={Maps}
        alt="First slide"
      />
    </form>
  )
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth: auth };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitationComponent);
