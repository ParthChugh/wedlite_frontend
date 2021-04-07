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

const FitnessForm = (props) => {
  const history = useHistory();
  
  const handleGoClick = () => {

  }
  const [startDate, setStartDate] = useState(new Date());
  const [showIcon, setShowIcon] = useState(false);
  const { auth, LoginActions } = props;

  const { register, handleSubmit, errors } = useForm()
  const loginUser = () => {
    console.log('inside')
    setShowIcon(true);
  }

  return (
    <Layout
      showSearchBar={false}
    >
      {showIcon ?
      <div classNmae="d-flex">
        <img src={Check} alt="logo" className="box" />
        <div className="middle align-items-center">
          <div className="submitted-text">Submitted! we'll get back to you with your customized diet in 2 business days</div>
          <button 
            className="blank-button "
            style={{marginTop: 20,paddingLeft: 40, paddingRight: 40, paddingTop: 20, paddingBottom: 20}}
            onClick={() => {
              // handleShow()
              // setExpanded(false)
              history.push('/')
            }}>
              <span>
                Go to Homepage
              </span>
              
          </button>
        </div>
      </div>
      :
      <div className="d-flex align-items-center" style={{marginLeft: 10, marginRight: 10}}>
        <form className="margin-top-10 d-flex flex-column " onSubmit={handleSubmit(loginUser)}>  
          <label className="font-size-label" style={{fontWeight: 'bold', marginTop: 20, marginBottom: 20}}>Kindly kill in the form to obtain a personalized diet from the certified dietician.</label>
          <div className="d-flex margin-10">
            <label className="font-size-label" style={{width: "30%"}}>Name</label>
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <input name="name" type="tel"  tabIndex="1"  className="form-control" style={{borderRadius: 10}} placeholder="Jay Gautam" ref={
                register({
                  required: true,
                })} />
                {errors.name && <span style={{color: 'red',}}>Enter valid Name</span>}
            </div>
          </div>
          <div className="d-flex margin-10" style={{marginTop: 10, marginBottom: 10}}>
            <label className="font-size-label" style={{width: "30%"}}>Date of Birth</label>
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                inline
                showTimeInput
                showMonthYearDropdown
              />
            </div>
          </div>
          <div className="d-flex margin-10">
            <label className="font-size-label" style={{width: "30%"}}>Birth Place</label>
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <input name="birthplace" type="tel"  tabIndex="1"  className="form-control" style={{borderRadius: 10}} placeholder="Chennai" ref={
                register({
                  required: true,
                })} />
                {errors.birthplace && <span style={{color: 'red',}}>Enter valid Birth Place</span>}
            </div>
          </div>
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Gender</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <select style={{borderRadius: 10}} name="gender" ref={register({
                required: true,
              })}>
                <option value="undefined">Please choose...</option>
                {['Male', 'Female', 'Transgender', 'Others'].map(el => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
            
          </div>
          {errors.gender && <span style={{color: 'red'}}>Choose Yes/No</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Area of Interset</label>
            <div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                <textarea name="sechedule" type="tel"  tabIndex="1"  className="form-control" style={{borderRadius: 10,minHeight: 150}} placeholder="Describe your lifestyle or schedule in no more than 50 words" ref={
                  register({
                    required: true,
                  })} />
              </div>
              {errors.sechedule && <span style={{color: 'red',}}>Enter valid area of Interset</span>}  
            </div>
            
          </div>
          
          <button 
            className="fill-button " 
            type="submit"
            style={{marginLeft: 10, paddingLeft: 40, paddingRight: 30, marginTop: 30}}
          >
            Submit details
          </button>
        </form>
      </div>}
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
)(FitnessForm);
