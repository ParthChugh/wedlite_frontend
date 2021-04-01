import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import DatePicker from "react-datepicker";
import Check from '../../assets/check.png'
import webshopping from '../../assets/webshopping.png'
import Layout from '../Layout';
import './styles.css';

const Welcome = (props) => {
  const history = useHistory();
  const { auth, LoginActions } = props;
  const [state, setState] = useState(0)
  const onPress = (value) => {
    setState(value)
  }


  return (
        <div className='contents'>
          <div className='head-content'>Welcome to Fashion consultant service</div>
          <div className='img-content' ><img src={ webshopping } alt="logo" style={{width: 280, height: 200}}/></div>
          <div className='footer-content' >Get in touch !</div>
          <div className='footer-texts' >Contact us to get the quote,<br/> help us to understand your requirements</div>
          <button className='get-started-btn' onClick={ () => onPress(1) } >Get Started</button>
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
)(Welcome);
