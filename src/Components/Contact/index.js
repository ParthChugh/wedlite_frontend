import React from 'react'
import Layout from '../Layout';
import { useForm } from 'react-hook-form'
import {  toast, ToastContainer } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import { CONTACT_US  } from '../../urls';
import { Button} from 'react-bootstrap';
import logo from '../../logo.png'
import './Contact.css';

const TextPage = () => {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const postData = (data) => {
    console.log(data);
    fetch(CONTACT_US, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        response.json().then((json) => {          
          toast(json.message);
          history.push('/')
        })
      })
      .catch(() => {
        toast("Error");
    });
  }
  
  const LogoSearchBar = () => {
    return (
      <div className="text-align-center color-white" >
        <img src={logo} alt="logo" className="App-logo" />
      </div>
    )
  }
  
  return (
    <Layout
      headerComponent={LogoSearchBar()}
    >
      <form className="container margin-top-10" onSubmit={handleSubmit(postData)}>  
      <ToastContainer/>
        <div className="form-group">
          <div>
            <label>Name</label>
            <input type="name" className="form-control" name="name" placeholder="Name" autoComplete="name" ref={register({required: true})} />
            {errors.name && <span style={{color: 'red'}}>Please enter a valid username</span>}    
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
        <label>Phone Number</label>
          <input type="number" className="form-control" name="phone" placeholder="Phone" autoComplete="phone-number" ref={register({required: true, minLength: 10})} />
          {errors.phone && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
        </div>
        <label>Query</label>
        <input 
          placeholder="What issue you are facing"
          style={{height: 100}} 
          className="form-control" 
          name="query" 
          ref={register({ required: true, maxLength: 50 })} 
        />
        {errors.query && <span style={{color: 'red'}}>This field is necessary</span>}    
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
      </form>
    </Layout>  
  )
  
}

export default TextPage