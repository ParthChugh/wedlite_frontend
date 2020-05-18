import React, { useEffect, useState } from 'react'
import * as LoginActionCreators from '../actions/loginActions';
import { Modal, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'semantic-ui-react'
import { CATEGORY, NORMAL} from '../constants';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Header = (props) => {  
  const history = useHistory();
  const { LoginActions, auth } = props;
  const { RegisterUser, loginUser, handleClearData, fetchCities, fetchCategories } = LoginActions;
  
  const cities = auth.get('cities');
  const categories = auth.get('categories');
  const [selectedCategory, updateCategory] = useState('');
  const [selectedCity, updateCity] = useState('');

  const cityOptions = cities.map((element, index) => ({
    key: element.id,
    text: element.city,
    value: element.id,
  }))

  const categoriesData = categories.map((element, index) => ({
    key: element.id,
    text: element.type,
    value: element.id,
  }))
  
  const updateSelectedCity = (event, data) => { 
    const newData = cities.filter(el => el["id"] === data.value); 
    updateCity(newData[0])
  } 

  const updateSelectedCategory = (event, data) => {
    const newData = categories.filter(el => el["id"] === data.value); 
    updateCategory(newData[0])
  } 


  const isLoggedIn = auth.get('isLoggedIn');

  const { register, handleSubmit, errors } = useForm()

  const [SignUpShow, setSignUpShow] = useState(false);
  const [show, setShow] = useState(false);
  const [vendorShow, setVendorShow] = useState(false);

  useEffect(() => {
    fetchCities()
    fetchCategories()
    setSignUpShow(false);
    setShow(false);
    setVendorShow(false);
  },[isLoggedIn]);

  const goToAppLink = () => {
    console.log("App link is clicked")
  }

  const handleClose = () => {
    setShow(false)
    setSignUpShow(false)
    setVendorShow(false);
  };
  const handleShow = () => {
    setSignUpShow(false)
    setShow(true)
  };
  const handleSignUpShow = () => {
    setShow(false)
    setSignUpShow(true)
  };

  const handleSetVendorShow = () => {
    setShow(false);
    setSignUpShow(false);
    setVendorShow(true);
  }


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
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true, minLength: 8})} />
          {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
        </div>
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
        <div className="forgot-password row container margin-vertical-10" >
          New to WedLite? &nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleSignUpShow}>Create Account</div>
        </div>        
      </form>
    </Modal>
  )
  const createVendorData = (props) => {
    if(selectedCity && selectedCategory) {
      const data = {
        "user": {
          "email": props.email,
          "password": props.password
        },
        "phone": {
          "country_code": "+91",
          "number": props.number
        },
        "first_name": props.first_name,
        "last_name": props.last_name,
        "business_name": props.business_name,
        "city": selectedCity.id,
        "bysiness_type": selectedCategory.id
      }
      
      RegisterUser(data, true);
    }
  }

  const header = () => (
    <div className="row space-around color-white">
      <div  onClick={goToAppLink} style={{cursor:'pointer', fontSize: 14}}>
        Get the App
      </div>
      {
      !isLoggedIn ?
        <div className="row ">
          <div onClick={handleShow} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}} >
            Login
          </div>
          <div onClick={handleSignUpShow} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Sign up
          </div>
          <div onClick={handleSetVendorShow} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Register your Business
          </div>
          <div onClick={() => history.push('/about-us')} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            About Us
          </div>
        </div>
        : 
        <div onClick={handleClearData} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
          Logout
        </div>
      }
    </div>
  ) 
  
  const showVenueRegistrationModal = () => (
    <Modal show={vendorShow} onHide={handleClose}>
      <Modal.Header className="font-bold" style={{fontSize: CATEGORY}} closeButton>
        <div>Sign Up Vendor</div>
      </Modal.Header>
      <Modal.Body>
        <form className="container margin-top-10" onSubmit={handleSubmit(createVendorData)}>  
          <div className="form-group">
            <div className="form-group">
              <label>First Name</label>
              <input  name="first_name" className="form-control" placeholder="First Name"  ref={register({required: true})} />
              {errors.first_name && <span style={{color: 'red'}}>This field is required</span>}    
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input  name="last_name" className="form-control"  placeholder="Last Name" ref={register({required: true})} />
              {errors.last_name && <span style={{color: 'red'}}>This field is required</span>}    
            </div>
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
            <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true, minLength: 8})} />
            {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <span style={{ paddingRight: 10 }}>+91</span>
              <input placeholder="Phone Number" name="number" className="form-control"   ref={register({required: true, minLength: 10})} />
            </div>
            {errors.number && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
            
          </div>
          <div className="form-group">
            <label>Business Name</label>
            <input placeholder="Busineess Name" name="business_name" className="form-control" ref={register({required: true})} />
            {errors.business_name && <span style={{color: 'red'}}>This field is required</span>}    
          </div>
          
          <div className="form-group">
            <label>City</label>
            <Dropdown 
              className="form-control"
              placeholder='cities' 
              search selection
              onChange={updateSelectedCity} 
              options={cityOptions} 
            />
            {selectedCity === "" && <span style={{color: 'red'}}>Please select one city</span>}    
          </div>

          
          <div className="form-group">
            <label>Business Type</label>
            <Dropdown 
              placeholder="Busineess Type" 
              name="bysiness_type" 
              className="form-control"
              placeholder='Categories' 
              search selection
              onChange={updateSelectedCategory} 
              options={categoriesData} 
            />
            {selectedCategory === "" && <span style={{color: 'red'}}>Please select one business type</span>}    
          </div>
          <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
            Submit
          </Button>       
        </form>
      </Modal.Body>
    </Modal>
  )
  
  return (
    <div className="image-background">
      <div>
        {header()}
        {props.children}
      </div>
      {showLoginModal()}
      {showSignUpModal()}
      {showVenueRegistrationModal()}
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
