import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import {  toast } from 'react-toastify';
import { CATEGORY } from '../../constants';
import { TERMS_AND_CONDTION, ABOUT_US } from '../../urls'
import logo from '../../logo.png'
import './TextPage.css';

const TextPage = ({slug}) => {
  
  const [data, updateData] = useState('');
  const [header, updateHeader] = useState('');
  const fetchData = (newUrl) => {
    fetch(newUrl, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            updateData(json.content);
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
    });
  }
  
  const LogoSearchBar = () => {
    return (
      <div className="text-align-center margin-top-150 color-white" >
        <img src={logo} alt="logo" className="App-logo" />
        <div>
          <span style={{fontSize: CATEGORY}}>
            Commission free venue booking 
          </span>
        </div>
        
      </div>
    )
  }
  
  useEffect(() => {
    switch(slug) {
      case 'terms-and-conditions': 
        fetchData(TERMS_AND_CONDTION);
        updateHeader("Terms And Conditions");
      break;
      case 'about-us': 
        fetchData(ABOUT_US);
        updateHeader("About Us");
      break;
      default:
        updateData(" NO data");
      break;
    }
  },[slug]);

  return (
    <Layout
      headerComponent={LogoSearchBar()}
      >
      {
        data !== '' ?
        <div className="container">
          <h1>{header}</h1>
          <span style={{fontSize: 20}}> {data}</span>
        </div>
        : 
        <span>
          Loading
        </span>
      }
    </Layout>
    
  )
  
}

export default TextPage