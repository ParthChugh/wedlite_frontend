import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import DatePicker from "react-datepicker";
import Check from '../../assets/check.png'
import Layout from '../Layout';

const FashionConsutancy = (props) => {
  const history = useHistory();
  const { auth, LoginActions } = props;


  return (
    <Layout
      showSearchBar={false}
    >
      
      <div classNmae="d-flex">
        <img src={Check} alt="logo" className="box" />  
        <button 
          className="fill-button " 
          type="submit"
          style={{marginLeft: 10, paddingLeft: 40, paddingRight: 30, marginTop: 30}}
        >
          Submit details
        </button>  
      </div>
    </Layout>
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
)(FashionConsutancy);
