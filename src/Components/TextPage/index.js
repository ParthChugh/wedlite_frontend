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
        console.log(response);
        if(response.status === 200) {
          response.text().then((json) => {
            updateData(json);
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
    });
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
    showSearchBar={false}
    >
      {
        data !== '' ?
        <div className="container">
          <h1>{header}</h1>
          <div dangerouslySetInnerHTML={{
            __html: data
          }}>

          </div>
        </div>
        : 
        <div className="row space-around" >
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