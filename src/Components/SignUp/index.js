import React, { useState, useEffect, useRef } from 'react';
import {bindActionCreators} from 'redux';
import { useParams, useHistory } from 'react-router-dom';
import * as ShopActionsCreator from '../../actions/shopActions';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import logo from '../../assets/LogoHeader.png';
import * as LoginActionCreators from '../../actions/loginActions';
import {connect} from 'react-redux';
// import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import Layout from '../Layout';
import './SignUp.css';


const Login = (props) =>  {
  const handleOnDragStart = (e) => e.preventDefault()
  const history = useHistory();
  // const Carousel = useRef(null);
  const { auth, ShopActions: {getCartItems,}, LoginActions } = props;
  const isLoggedIn = auth.get('isLoggedIn');
  const data = useParams();
  
  const { register, handleSubmit, errors } = useForm()
  
  const {
    RegisterUser,       
  } = LoginActions;

  if(isLoggedIn) {
    history.push('/')
  }

  const handleData = (data) => {
    const newData =  {
      "first_name": data.first_name,
      "last_name": data.last_name,
      "phone":  {
        "country_code": "+91",
        "number": data.number
      },
      "email": data.email,
      "password": data.password
    }
    RegisterUser(newData, false)
  }

  return (
    <Layout
      showSearchBar={false}
    >
      <div className="d-flex flex-column container-md justify-content-center" style={{ height: '100%', paddingTop: 50, alignItems: 'center'}}>
      <img src={logo} alt="logo" className="login-logo" style={{marginBottom: 30, }}/>
      <div className="font-size-label text-align-center" style={{fontSize: 30}}>Welcome to Wedlite</div>
      <form className="border border-container  margin-top-10 d-flex flex-column" onSubmit={handleSubmit((data) => handleData(data))}>  
        <div className="form-group">
          <label className="font-size-label">First Name</label>
          <input  name="first_name" className="form-control" placeholder="First Name"  ref={register({required: true})} />
          {errors.first_name && <span style={{color: 'red'}}>This field is required</span>}    
        </div>
        <div className="form-group">
          <label className="font-size-label">Last Name</label>
          <input  name="last_name" className="form-control"  placeholder="Last Name" ref={register({required: true})} />
          {errors.last_name && <span style={{color: 'red'}}>This field is required</span>}    
        </div>
        <div className="form-group">
          <label className="font-size-label">Email address</label>
          <input name="email"  className="form-control" placeholder="Enter your email" ref={
            register({
              required: true, 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
              })} />
            {errors.email && <span style={{color: 'red'}}>Please enter a valid email</span>}
        </div>
        <div className="form-group">
          <label className="font-size-label">Phone Number</label>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span style={{ paddingRight: 10 }}>+91</span>
            <input placeholder="Phone Number" name="number" type="tel" className="form-control"   ref={register({required: true, maxLength: 10, minLength: 10})} />
          </div>
          {errors.number && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
        </div>
        <div className="form-group">
        <label className="font-size-label">Password</label>
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register(
            {
              required: true,
              minLength: 8
            }
            )} />
          {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
        </div>
        <button 
            className="fill-button " 
            type="submit"
            style={{marginLeft: 10, paddingLeft: 40, paddingRight: 30, marginTop: 30}}
          >
            Sign Up
          </button>
        <div className="forgot-password row container margin-vertical-10" >
          By signing up, you agree to the &nbsp;
          <div style={{cursor:'pointer', color: '#A63A67'}} onClick={() => {history.push('/terms-and-conditions')}}>Terms and Conditions</div>
        </div>        
      </form>

      </div>
    </Layout>
  )    
}

const mapStateToProps = (state) => {
  const { shop, auth } = state;
  return { shop, auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ShopActions: bindActionCreators(ShopActionsCreator, dispatch),
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
