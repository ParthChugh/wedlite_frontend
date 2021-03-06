import React from 'react'
import Layout from '../Layout';
import { useForm } from 'react-hook-form'
import {  toast, ToastContainer } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import { CONTACT_US  } from '../../urls';
import { Button} from 'react-bootstrap';
import './Contact.css';

const TextPage = () => {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()
  const postData = (data) => {
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
    
  return (
    <Layout
      showSearchBar={false}
    >
      <>      
      <form className="container" style={{paddingTop: 20,maxWidth: '40em', flex: 1, flexDirection: 'column'}} onSubmit={handleSubmit(postData)}>  
        {/* <h3>If urgent please contact us at support@wedlite.in</h3>
        <div className="horizontal-line"><span>OR</span></div> */}
        <h3>
          Contact Us
        </h3>
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
            <label>Phone Number</label>
            <input type="number" className="form-control" name="phone" placeholder="Phone" autoComplete="phone-number" ref={register({required: true,minLength: 10, maxLength: 10})} />
            {errors.phone && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
          
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

            <h5 style={{fontWeight: 'bold'}} className="title">OFFICE ADDRESS</h5>
            <div className="text">
              Shop no. 3, near pasoond bus stop, service lane pasoond, NH8 , Village pasoond, District Rajsamand, pincode - 313324
            </div>
          
          </div>
      </form>
      </>
    </Layout>  
  )
  
}

export default TextPage