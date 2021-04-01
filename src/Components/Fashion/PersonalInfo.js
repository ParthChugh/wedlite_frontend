import React, { useState } from 'react'
import { Dropdown, Grid } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import webshopping from '../../assets/webshopping.png'
import './styles.css';

const PersonalInfo = (props) => {
  const history = useHistory();
  const { auth, LoginActions } = props;
  const [state, setState] = useState(1)
  const onPress = (value) => {
    setState(value)
  }


  return (
    <div className='personal-info-contents'>
        <div className='personal-info-head-content' >Please enter your personal information</div>
        <div align='center' style={{ marginTop:50, justifyItems:'center' }}>
            <input id='p-i-input-1' className='personal-info-input' type='text' /><br/>
            <select className='personal-info-input' name='event-name'>
                <option value='Male' >Male</option>
                <option value='Female' >Female</option>
            </select><br/>
            <input className='personal-info-input' type='phone' /><br/>
            <input className='personal-info-input' type='email' /><br/>
        </div>
        <div className='personal-info-btn'>
            <button style={{ marginRight:20 }} className='personal-info-back-btn' >Back</button>
            <button style={{ marginLeft:20 }} className='personal-info-next-btn' onClick={ () => onPress(2) } >Next</button>
        </div>
    </div>
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
)(PersonalInfo);
