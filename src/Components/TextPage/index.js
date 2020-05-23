import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import {  toast } from 'react-toastify';
import { TERMS_AND_CONDTION, ABOUT_US } from '../../urls';
import Loader from 'react-loader-spinner'
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
      <div className="text-align-center color-white" >
        <img src={logo} alt="logo" className="App-logo" />
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
        <div className="container" style={{marginTop: -80}}>
          <h1>{header}</h1>
          <span style={{fontSize: 20}}> {data}</span>
        </div>
        : 
        <div className="row space-around" style={{marginTop: -350}}>
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      }
    </Layout>
    
  )
  
}

export default TextPage