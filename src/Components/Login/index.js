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
import './Login.css';

const Login = (props) =>  {
  const handleOnDragStart = (e) => e.preventDefault()
  const history = useHistory();
  // const Carousel = useRef(null);
  const { auth, ShopActions: {getCartItems,}, LoginActions } = props;
  const isLoggedIn = auth.get('isLoggedIn');
  const data = useParams();
  
  const { register, handleSubmit, errors } = useForm()
  
  const {
    loginUser,       
  } = LoginActions;

  if(isLoggedIn) {
    history.push('/')
  }

  return (
    <Layout
      showSearchBar={false}
    >
      <div className="d-flex flex-column container-md justify-content-center" style={{ height: '100%', paddingTop: 50, alignItems: 'center'}}>
      <ToastContainer />  
      <img src={logo} alt="logo" className="login-logo" style={{marginBottom: 30, }}/>
        <div className="font-size-label text-align-center" style={{fontSize: 30}}>Welcome back!</div>
        <form className="border border-container  margin-top-10 d-flex flex-column" onSubmit={handleSubmit(loginUser)}>  
          <div className="form-group">
            <label className="font-size-label">Phone Number</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <span style={{ paddingRight: 10 }}>+91</span>
              <input name="username" type="tel"  tabIndex="1"  className="search-box form-control" placeholder="Enter your Phone Number" ref={
                
                register({
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })} />
            </div>
            {errors.username && <span style={{color: 'red'}}>Invalid Phone Number address</span>}
          </div>
          <div className="form-group">
          <label className="font-size-label">Password</label>
            <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true, minLength: 8})} />
            {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
          </div>    
          <button 
            className="fill-button " 
            type="submit"
            style={{marginLeft: 10, paddingLeft: 40, paddingRight: 30, marginTop: 30}}
          >
              
            Log In
              
          </button>
          {/* <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
            Login via OTP
          </Button> */}
        </form>
        
        <div style={{marginTop: 40, marginBottom: 40}} className="horizontal-line border-container"><span>New to Wedlite?</span></div>
          <button 
            className="blank-button border-container"
            style={{alignItems: 'center',}}
            onClick={() => {
              history.push('/sign-up')
            }}>
              <div style={{padding: 5}}>
                Create your Wedlite account              
              </div>
          </button>
        

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
