import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import './SearchBar.css';

const ExerciseComponent = (props) => {
  const history = useHistory();
  
  const handleGoClick = () => {
    history.push('/shop')
  }
  return (
    <form className="d-flex flex-column bar-tab" style={{zIndex: 999, paddingLeft: 20}} onSubmit={e => e.preventDefault()}>
      <div className="top-tagline">Gifts</div>
      <div className="tagline"><span>Present it with a surprise</span></div>
      <div className="tagline-info" style={{fontSize: 15}}>Find all new exclusive gifts to present<br/> others and spread happiness</div>  
      <div className="d-flex bar-tab" style={{marginTop: 20}}>
        <button
          type='submit'
          className="fill-button-let-begin"
          onClick={handleGoClick}
          >
            Check Now
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
)(ExerciseComponent);
