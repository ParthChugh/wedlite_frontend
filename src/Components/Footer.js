import React from 'react'
// import { MDBContainer, MDBFooter, MDBRow, MDBCol } from "mdbreact";
import {  NORMAL} from '../constants';
import playstore from '../assets/playstore.png'
import appstore from '../assets/app-store.png'
import logo from '../Wedlite.png'
import {useHistory} from 'react-router-dom'
import { Footer, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import {faTwitter, faInstagram, faFacebook, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FooterContainer({openSignUpModal}) {
  const history = useHistory();
  return (
    <Footer color="stylish-color-dark" className="page-footer font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3">
            <img src={logo} alt="logo" style={{height: 100}} />
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title">GENERAL</h5>
            <ul>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
                <a onClick={() => history.push('/vendor-registration')}>Vendor Registration</a>
              </li>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
                <a onClick={() => history.push('/about-us')}>About Us</a>
              </li>                
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title" >COMPANY</h5>
            <ul>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
                <a onClick={() => history.push('/careers')}>Careers</a>
              </li>                
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
                <a onClick={() => history.push('/contact-us')}>Contact Us</a>
              </li>                
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title" >LEGAL</h5>
            <ul>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
                <a onClick={() => history.push('/terms-and-conditions')}>Terms & Conditions</a>
              </li>                
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <hr />
      <div className="text-center py-3">
          <ul className="list-unstyled list-inline mb-0">
              <li className="list-inline-item">
                  <h5 className="mb-1">Register for busniess</h5>
              </li>
              <li className="list-inline-item"><a  onClick={() => history.push('/vendor-registration')} className="btn btn-danger btn-rounded">Sign up!</a></li>
          </ul>
      </div>
      <hr />
      <div className="text-center">
          <ul className="list-unstyled list-inline">  
            <img src={logo} alt="logo" style={{height: 100}} />
            <h5 className="title">Download the App</h5>
            <div className="logo-container">
              <img src={playstore} alt="logo" className="logo" />
              <img src={appstore} alt="logo" className="logo" /> 
            </div>
          </ul>
      </div>
      <hr />
      <div className="text-center">
          <ul className="list-unstyled list-inline">  
            <FontAwesomeIcon className="list-inline-item"  icon={faTwitter} size="2x" style={{marginLeft: 5, marginRight: 5}} />
            <FontAwesomeIcon className="list-inline-item" icon={faInstagram} size="2x" style={{marginLeft: 5, marginRight: 5}} />
            <FontAwesomeIcon className="list-inline-item" icon={faFacebook} size="2x" style={{marginLeft: 5, marginRight: 5}} />
            <FontAwesomeIcon className="list-inline-item" icon={faLinkedin} size="2x" style={{marginLeft: 5, marginRight: 5}} />
          </ul>
      </div>
      <div className="footer-copyright text-center">
        <MDBContainer fluid >
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.wedlite.in"> WedLite.in</a>
        </MDBContainer>
      </div>
  </Footer>
  )
}

/*
<MDBFooter color="primary" textColor="#fff" className="font-small pt-4 mt-4 footer">
      <MDBContainer fluid className="text-center text-md-left" style={{color: 'black'}}>
        <MDBRow>
          <MDBCol md="3">
            <h3 className="title">Wedlite</h3>
            <h5 className="title">Download the App</h5>
            <div className="logo-container">
              <img src={playstore} alt="logo" className="logo" />
              <img src={appstore} alt="logo" className="logo" /> 
            </div>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title" style={{color: 'black'}}>GENERAL</h5>
            <ul>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL, color: 'black'}}>
                <a onClick={() => history.push('/vendor-registration')}>Vendor Registration</a>
              </li>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL, color: 'black'}}>
                <a onClick={() => history.push('/about-us')}>About Us</a>
              </li>                
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title" style={{color: 'black'}}>COMPANY</h5>
            <ul>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL, color: 'black'}}>
                <a onClick={() => history.push('/careers')}>Careers</a>
              </li>                
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL, color: 'black'}}>
                <a onClick={() => history.push('/contact-us')}>Contact Us</a>
              </li>                
            </ul>
          </MDBCol>
          <MDBCol md="3">
            <h5 className="title" style={{color: 'black'}}>LEGAL</h5>
            <ul>
              <li className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL, color: 'black'}}>
                <a onClick={() => history.push('/terms-and-conditions')}>Terms & Conditions</a>
              </li>                
            </ul>
          </MDBCol>
        </MDBRow>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <FontAwesomeIcon icon={faTwitter} size="2x" style={{marginLeft: 5, marginRight: 5, color: 'black'}} />
          <FontAwesomeIcon icon={faInstagram} size="2x" style={{marginLeft: 5, marginRight: 5, color: 'black'}} />
          <FontAwesomeIcon icon={faFacebook} size="2x" style={{marginLeft: 5, marginRight: 5, color: 'black'}} />
          <FontAwesomeIcon icon={faLinkedin} size="2x" style={{marginLeft: 5, marginRight: 5, color: 'black'}} />
        </div>
      </MDBContainer>
      <div className="footer-copyright text-center">
        <MDBContainer fluid >
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.wedlite.in"> WedLite.in</a>
        </MDBContainer>
      </div>
    </MDBFooter>
*/