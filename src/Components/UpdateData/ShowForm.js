import React from 'react'
import * as LoginActionCreators from '../../actions/loginActions';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

const VendorRegistration = (props) => {
  const { LoginActions, place, placeId } = props;
  const { updateVenue } = LoginActions;

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: place.name,
      formatted_phone_number: place.formatted_phone_number,
      business_status: place.business_status,
      formatted_address: place.formatted_address,
      vicinity: place.vicinity,
      website: place.website
    }
  })
  const createVendorData = (props) => {
    const data = {
      "business_status": props.business_status,
      "formatted_address": props.formatted_address,
      "name": props.name,
      "website": props.website,
      "vicinity": props.vicinity,
      "formatted_phone_number": props.formatted_phone_number
    }
    updateVenue(placeId, data);
  }

  return(
    <div  className="container" >
      <h1 className="container">Vendor Registration</h1>
      <form style={{maxWidth: '50%'}} className="container margin-top-10" onSubmit={handleSubmit(createVendorData)}>  
      <div className="form-group">
        <label>Business Name</label>
        <input  name="name" className="form-control"  placeholder="Name"  ref={register({required: true})} />
        {errors.name && <span style={{color: 'red'}}>This field is required</span>}    
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <span style={{ paddingRight: 10 }}>+91</span>
          <input placeholder="Phone Number" name="formatted_phone_number" className="form-control"   ref={register({required: true, minLength: 10})} />
        </div>
        {errors.formatted_phone_number && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
      </div>
      <div className="form-group">
        <label>Business Name</label>
        <input placeholder="Busineess Status" name="business_status" className="form-control" ref={register({required: true})} />
        {errors.business_status && <span style={{color: 'red'}}>This field is required</span>}    
      </div>
      <div className="form-group">
        <label>Address</label>
        <input placeholder="Address" name="formatted_address" className="form-control" ref={register({required: true})} />
        {errors.formatted_address && <span style={{color: 'red'}}>This field is required</span>}    
      </div>
      <div className="form-group">
        <label>Vicinity</label>
        <input placeholder="Vicinity" name="vicinity" className="form-control" ref={register({required: false})} />
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
              pattern: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/  
            }
          )} />
        {errors.website && <span style={{color: 'red'}}>Website should be valid</span>}    
      </div>
      <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
        Submit
      </Button>       
    </form>
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
)(VendorRegistration);
