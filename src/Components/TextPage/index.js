import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import {  toast } from 'react-toastify';
import { TERMS_AND_CONDTION, ABOUT_US } from '../../urls';
import { Segment } from 'semantic-ui-react'
import './TextPage.css';
import paragraph from '../../assets/Spinner.gif'


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
          response.text().then((json) => {
            updateData(json);
          })
        } else {
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
        <div className="container" style={{flex: 1, flexDirection: 'column'}}>
          <h1>{header}</h1>
          <div dangerouslySetInnerHTML={{
            __html: data
          }}>

          </div>
        </div>
        : 
        <div className="row space-around" >
          <Segment attached>
            <img alt="loading" src={paragraph} />
          </Segment>
          {/* <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          /> */}
        </div>
      }
    </Layout>
    
  )
  
}

export default TextPage