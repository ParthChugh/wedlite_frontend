import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import {  toast } from 'react-toastify';
import logo from '../../logo.png'
import './Profile.css';

const Profile = ({slug}) => {
  const [data, updateData] = useState('');
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

  const customRequest = (data) => {
    console.log(data);
  }
  
  return (
    <Layout
      headerComponent={LogoSearchBar()}
    >
      <div>
      
        
      </div>
      
    </Layout>
  )
}

export default Profile