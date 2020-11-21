import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import Layout from '../Layout';

const FitnessForm = (props) => {
  const history = useHistory();
  
  const handleGoClick = () => {

  }
  const { auth, LoginActions } = props;

  const { register, handleSubmit, errors } = useForm()
  const loginUser = () => {

  }
  const bloodGroups = [
    "A RhD positive (A+)",
    "A RhD negative (A-)",
    "B RhD positive (B+)",
    "B RhD negative (B-)",
    "O RhD positive (O+)",
    "O RhD negative (O-)",
    "AB RhD positive (AB+)",
    "AB RhD negative (AB-)"
   ]
  return (
    <Layout
      showSearchBar={false}
    >
      <div className="d-flex align-items-center">
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
          
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Height</label>
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                <input name="height" type="tel" style={{borderRadius: 10, width: 55}} tabIndex="1"  className="form-control" placeholder="5.5" ref={
                  register({
                    required: true,
                  })} />
                  <label className="font-size-label"style={{paddingLeft: 10}}> feet</label>
              </div>
              {errors.height && <span style={{color: 'red'}}>Enter valid height</span>}  
            </div>
            
            
          </div>
          
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Weight</label>
            <div style={{display: 'flex', flexDirection: 'column'}} >
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',}}>
                <input name="weight" type="tel" style={{borderRadius: 10, width: 55}} tabIndex="1"  className="form-control"  placeholder="74" ref={
                  register({
                    required: true,
                  })} />
                  <label className="font-size-label"style={{paddingLeft: 10}}>KG</label>
              </div>
              {errors.height && <span style={{color: 'red'}}>Enter valid weight</span>}
            </div>
            
            
          </div>
          
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Blood group</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              {/* <input name="blood" type="tel"  tabIndex="1"  className="form-control" style={{borderRadius: 10}} placeholder="5.5" ref={
                /> */}
                <select name="gender" placeholder="Yes" ref={register({
                  required: true,
                })}>
                  <option value="undefined">Please choose...</option>
                  {bloodGroups.map(el => (
                    <option value={el}>{el}</option>
                  ))}
                </select>
            </div>
          </div>
          {errors.blood && <span style={{color: 'red'}}>Enter valid blood grouo</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Daily Sechedule</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <textarea name="sechedule" type="tel"  tabIndex="1"  className="form-control" style={{borderRadius: 10,minHeight: 150}} placeholder="Describe your lifestyle or schedule in no more than 50 words" ref={
                register({
                  required: true,
                })} />
            </div>
          </div>
          {errors.sechedule && <span style={{color: 'red'}}>Enter valid Daily Sechedule</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Smoking</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <select style={{borderRadius: 10}} name="smoking" ref={register({
                required: true,
              })}>
                <option value="undefined">Please choose...</option>
                {[ 'Yes', 'No'].map(el => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
          </div>
          {errors.smoking && <span style={{color: 'red'}}>Choose Yes/No</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Drinking</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <select style={{borderRadius: 10}} name="sechedule" ref={register({
                required: true,
              })}>
                <option value="undefined">Please choose...</option>
              {[ 'Yes', 'No'].map(el => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
            
          </div>
          {errors.sechedule && <span style={{color: 'red'}}>Choose Yes/No</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Marriage Status</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <select style={{borderRadius: 10}} name="marriage" ref={register({
                required: true,
              })}>
                <option value="undefined">Please choose...</option>
              {[ 'Single', 'Married'].map(el => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
            
          </div>
          {errors.marriage && <span style={{color: 'red'}}>Choose Yes/No</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Asthama</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <select style={{borderRadius: 10}} name="asthama" ref={register({
                required: true,
              })}>
                <option value="undefined">Please choose...</option>
              {[ 'Yes', 'No'].map(el => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
          </div>
          {errors.asthama && <span style={{color: 'red'}}>Choose Yes/No</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Diabetes</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
             <select style={{borderRadius: 10}} name="diabetes" ref={register({
                required: true,
              })}>
                <option value="undefined">Please choose...</option>
              {[ 'Yes', 'No'].map(el => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
          </div>
          {errors.diabetes && <span style={{color: 'red'}}>Choose Yes/No</span>}
          <div className="d-flex margin-top-10">
            <label className="font-size-label" style={{width: "30%"}}>Blood Pressure</label>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
              <select style={{borderRadius: 10}} name="diabetes" ref={register({
                required: true,
              })}>
                <option value="undefined">Please choose...</option>
                {[ 'Yes', 'No'].map(el => (
                  <option value={el}>{el}</option>
                ))}
              </select>
            </div>
          </div>
          {errors.bp && <span style={{color: 'red'}}>Choose Yes/No</span>}
          <button 
            className="fill-button " 
            type="submit"
            style={{marginLeft: 10, paddingLeft: 40, paddingRight: 30, marginTop: 30}}
          >
            Submit details
          </button>
        </form>
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
)(FitnessForm);
