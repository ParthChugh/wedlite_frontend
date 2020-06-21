import React, { useEffect, useState } from 'react'
import * as LoginActionCreators from '../../actions/loginActions';
import { Button } from 'react-bootstrap';
import ScrollAnimation from 'react-animate-on-scroll';
import { useForm } from 'react-hook-form'
import { Dropdown } from 'semantic-ui-react'
import Invoice from '../../assets/invoice';
import Commission from '../../assets/commission';
import {useHistory} from 'react-router-dom'
import Graph from '../../assets/graph';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'
import Layout from '../Layout';

const VendorRegistration = (props) => {
  const { auth, LoginActions } = props;
  const history = useHistory();
  const { RegisterUser, fetchCities, fetchCategories } = LoginActions;
  const { register, handleSubmit, errors } = useForm()

  useEffect(()=> {
    fetchCities();
    fetchCategories();
  },[]);

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
  
  const callbackFunction = () => {
    history.push('/');
  }
  const createVendorData = (props) => {
    if(selectedCity && selectedCategory) {
      const data = {
        "user": {
          "email": props.email,
          "password": props.password,
          "phone": {
            "country_code": "+91",
            "number": props.number
          },
          "first_name": props.first_name,
          "last_name": props.last_name
        },
        "business": {
          "name": props.business_name,
          "address": props.address,
          "website": props.website,
          "city_id": selectedCity.id,
          "category_id": selectedCategory.id
        },
      }
      RegisterUser(data, true, callbackFunction);
    }
  }

  return(
    <Layout
      showSearchBar={false}
      showLogo={false}
    >
      
      <div className="container" >
        <h1 className="container">Vendor Registration</h1>
        <ScrollAnimation 
          animateIn='fadeIn'
        >
          <div className="row " style={{ justifyContent: 'space-around', }} >
            <div style={{display: 'flex', flexDirection: 'column', flex: 1/3, alignItems: 'center'}}>
              
              <Invoice />
              <h6 style={{marginTop: 10}}>
                No broker between you and your client
              </h6>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', flex: 1/3, alignItems: 'center'}}>
              <Commission />
              <h6 style={{marginTop: 10}}>Partner With India's top NO commission Venue search Company</h6>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', flex: 1/3, alignItems: 'center'}}>
              <div style={{width: 100, height: 100,}}>
                <Graph />
              </div>
              <h6 style={{marginTop: 10}}>
                Get your business visibility in Major cities across India
              </h6>
            </div>
          </div>
        </ScrollAnimation>
       <form style={{maxWidth: '50%'}} className="container margin-top-10" onSubmit={handleSubmit(createVendorData)}>  
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
            <input placeholder="Phone Number" name="number" className="form-control"   ref={register({required: true, minLength: 10, maxLength: 10})} />
          </div>
          {errors.number && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
        </div>
        <div className="form-group">
          <label>Business Name</label>
          <input placeholder="Busineess Name" name="business_name" className="form-control" ref={register({required: true})} />
          {errors.business_name && <span style={{color: 'red'}}>This field is required</span>}    
        </div>
        <div className="form-group">
          <label>Address</label>
          <input placeholder="Address" name="address" className="form-control" ref={register({required: true})} />
          {errors.address && <span style={{color: 'red'}}>This field is required</span>}    
        </div>
        <div className="form-group">
          <label>Website</label>
          <input 
            name="website" 
            placeholder="https://www.example.com" 
            className="form-control" 
            ref={
              register({
                required: true,
                pattern: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/  
              }
            )} />
          {errors.website && <span style={{color: 'red'}}>Website should be valid</span>}    
        </div>
        {
        cities.length > 0 &&
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
        }
        {
          categories.length > 0 &&
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
        }
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>       
      </form>
      </div>
      
    </Layout>
    
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
)(VendorRegistration);
