import React, { useState } from 'react'
import Layout from '../Layout';
import {  toast } from 'react-toastify';
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
  

  const customRequest = (data) => {
  
  }
  
  return (
    <Layout >
      <div>
      
        
      </div>
      
    </Layout>
  )
}

export default Profile