import React, { useEffect, useState } from 'react'
import * as LoginActionCreators from '../actions/loginActions';
import { Modal, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import logo from '../logo1.png';
import { CATEGORY, NORMAL} from '../constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Header = (props) => {  
  const history = useHistory();
  const { LoginActions, auth } = props;
  const { RegisterUser, loginUser, handleClearData, fetchCities, fetchCategories } = LoginActions;

  const isLoggedIn = auth.get('isLoggedIn');

  const { register, handleSubmit, errors } = useForm()

  const [SignUpShow, setSignUpShow] = useState(false);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    fetchCities()
    fetchCategories()
    setSignUpShow(false);
    setShow(false);
  },[isLoggedIn]);

  const goToAppLink = () => {
    console.log("App link is clicked")
  }

  const handleClose = () => {
    setShow(false)
    setSignUpShow(false)
  };
  const handleShow = () => {
    setSignUpShow(false)
    setShow(true)
  };
  const handleSignUpShow = () => {
    setShow(false)
    setSignUpShow(true)
  };

 


  const showSignUpModal = () => (
    <Modal show={SignUpShow}  onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <form className="container margin-top-10" onSubmit={handleSubmit((data) => RegisterUser(data, false))}>  
        <div className="form-group">
          <label>Email address</label>
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
        <label>Password</label>
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register(
            {
              required: true,
              minLength: 8
            }
            )} />
          {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
        </div>
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
        <div className="forgot-password row container margin-vertical-10" >
          Pressing this means you are accepting the&nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={() => {history.push('/terms-and-conditions')}}>Terms and Conditions</div>
        </div>        
        <div className="forgot-password row container margin-vertical-10" >
          Already Registered? &nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleShow}>Login</div>
        </div>        
      </form>
    </Modal>
  )

  const showLoginModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="font-bold" style={{fontSize: CATEGORY}} closeButton>
        <div>Login</div>
      </Modal.Header>
      <form className="container margin-top-10" onSubmit={handleSubmit(loginUser)}>  
        <div className="form-group">
          <label>Email address/Phone Number</label>
          <input name="email"  className="form-control" placeholder="Enter your email/Phone Number" ref={
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
        <label>Password</label>
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true, minLength: 8})} />
          {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
        </div>    
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Login via OTP
        </Button>
        <div className="forgot-password row container margin-vertical-10" >
          New to WedLite? &nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleSignUpShow}>Create Account</div>
        </div>        
      </form>
    </Modal>
  )

  const header = () => (
    <div className="row space-around" style={{backgroundColor: 'black', paddingTop: 20, alignItems: 'center', paddingBottom: 10}}>
      <div onClick={()=> history.push('/')} style={{cursor: 'pointer'}}>
        <img src={logo} alt="logo" className="logo" />
      </div>
      
      {
      !isLoggedIn ?
        <div className="row ">
          <div onClick={() => history.push('/')} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Home
          </div>
          <div onClick={handleShow} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}} >
            Login
          </div>
          <div onClick={handleSignUpShow} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Sign up
          </div>
          <div onClick={() => history.push('/vendor-registration')} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Register your Business
          </div>
          <div onClick={() => history.push('/about-us')} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            About Us
          </div>
          <div onClick={() => history.push('/contact-us')} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Contact Us
          </div>
        </div>
        :
        <div className="row">
          <div onClick={() => history.push('/')} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Home
          </div>
          <div onClick={() => history.push('/profile')} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Profile
          </div>
          <div onClick={handleClearData} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Logout
          </div>
        </div>   
      }
    </div>
  ) 
  
  
  
  return (
    <div style={{height: 100}}>
      <div>
        {header()}
        {props.children}
      </div>
      {showLoginModal()}
      {showSignUpModal()}
    </div>
  )
  
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
