import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import './SearchBar.css';

const HoroscopeComponent = (props) => {
  const history = useHistory();
  
  const handleGoClick = () => {
    history.push('/horoscope')
  }
  return (
    <form className="d-flex flex-column bar-tab" style={{zIndex: 999, paddingLeft: 20}} onSubmit={e => e.preventDefault()}>
      <div className="top-tagline">Horoscope</div>
      <div className="tagline"><span>Astrology reveals the will of the gods</span></div>
      <div className="tagline-info" style={{fontSize: 15}}>Book now to get know your future</div>  
      <div className="d-flex bar-tab" style={{marginTop: 20}}>
        <button
          type='submit'
          className="fill-button-let-begin"
          onClick={handleGoClick}
          >
            Let's Begin       
        </button>
      </div>
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
)(HoroscopeComponent);
