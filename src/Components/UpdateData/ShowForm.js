import React, {useState ,useEffect} from 'react'
import * as LoginActionCreators from '../../actions/loginActions';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useHistory, useParams } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux'

const VendorRegistration = (props) => {
  const { LoginActions, place, placeId } = props;
  
  const [image, updateImage] = useState('');
  const history = useHistory()
  
  useEffect(()=> {
    if(props.place.display_photo) {
      updateImage(props.place.display_photo.id)
    }
  },[]);

  const data = useParams()
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

  const callbackFunction = () => {
    history.push(`/venue/place/${data.placeId}`)
  }

  const createVendorData = (props) => {
    if(image !== '') {
      const data = {
        "business_status": props.business_status,
        "formatted_address": props.formatted_address,
        "name": props.name,
        "website": props.website,
        "vicinity": props.vicinity,
        "formatted_phone_number": props.formatted_phone_number,
        "display_photo_id": image
      }
      updateVenue(placeId, data, callbackFunction);
    }
  }

  const options = Object.values(props.place.photos).map((el, index) => ( {
    key: el.id,
    text: `Image ${index}`,
    value: el.id,
    image: { avatar: true, src: el.path },
    }
  ))

  const exposedCampaignOnChange = (event, data) => {
    updateImage(data.value)
  }

  return(
    <div  className="container" >
      <h1 className="container">Update Business Details</h1>
      <form style={{width: '70%'}} className="container margin-top-10" onSubmit={handleSubmit(createVendorData)}>  
      <div className="form-group">
        <label>Business Name</label>
        <input  name="name" className="form-control"  placeholder="Name"  ref={register({required: true})} />
        {errors.name && <span style={{color: 'red'}}>This field is required</span>}    
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <span style={{ paddingRight: 10 }}>+91</span>
          <input placeholder="Phone Number" name="formatted_phone_number" className="form-control"   ref={register({minLength: 10})} />
        </div>
        {errors.formatted_phone_number && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
      </div>
      <div className="form-group">
        <label>Business Status</label>
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
              pattern: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/  
            }
          )} />
        {errors.website && <span style={{color: 'red'}}>Website should be valid</span>}    
      </div>
      {
        image !== '' &&
        <div className="form-group">
          <label>Select Display Picture</label>
          <Dropdown 
            className="form-control"
            placeholder='Select Photo' 
            fluid
            defaultValue={parseInt(image)}
            options={options}
            onChange={exposedCampaignOnChange}
          />
          {image === "" && <span style={{color: 'red'}}>Please select one display Picture</span>}    
        </div>
      }
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
