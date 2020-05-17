import React, { useEffect, useState } from 'react'
import { url } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { TERMS_AND_CONDTION, ABOUT_US } from '../../urls'
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
  },[]);

  return (
    <div style={{backgroundColor: 'black', flex: 1}} >
      <div className="image-background">
        <h1 className="container" style={{color: 'white'}}>{header}</h1>
      </div>
      {
        data !== '' ?
        <div style={{marginTop: -200 }} className="container">
          <span style={{color: "white"}}> {data}</span>
        </div>
        : 
        <span>
          Loading
        </span>
      }
    </div>
    
  )
  
}

export default TextPage