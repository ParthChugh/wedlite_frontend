import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import './SearchBar.css';

const FashionComponent = (props) => {
  const history = useHistory();
  
  const handleGoClick = () => {
    history.push('/fashion')
  }
  return (
    <form className="d-flex flex-column bar-tab" style={{zIndex: 999, paddingLeft: 20}} onSubmit={e => e.preventDefault()}>
      <div className="top-tagline">Fashion Consultant</div>
      
      <div className="tagline-info" style={{fontSize: 15}}>Have a wedding outfit in mind?<br/>Let us help you find it</div>  
      <div className="d-flex bar-tab" style={{marginTop: 20}}>
        <button
          type='submit'
          className="fill-button-let-begin"
          onClick={handleGoClick}
          >
            Get in touch
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
)(FashionComponent);
