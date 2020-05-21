import React from 'react'
import Header  from '../Header';
import { MDBContainer, MDBFooter, MDBRow, MDBCol } from "mdbreact";
import {useHistory} from 'react-router-dom'
import {  NORMAL} from '../../constants';
import playstore from '../../assets/playstore.png'
import appstore from '../../assets/app-store.png'
import './Layout.css'

const Layout = (props) => {  
  const history = useHistory();
  const {headerComponent, children} = props;
  return (
    <div>
      <Header>
        {headerComponent}
      </Header>
      {children}
      <MDBFooter color="black" className="font-small pt-4 mt-4">
        <MDBContainer fluid className="text-center text-md-left">
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
              <h5 className="title">GENERAL</h5>
              <ul>
                <li className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
                  <a onClick={() => history.push('/vendor-registration')}>Vendor Registration</a>
                </li>
                <li className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
                  <a onClick={() => history.push('/about-us')}>About Us</a>
                </li>                
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">COMPANY</h5>
              <ul>
                <li className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
                  <a onClick={() => history.push('/careers')}>Careers</a>
                </li>                
                <li className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
                  <a onClick={() => history.push('/contact-us')}>Contact Us</a>
                </li>                
              </ul>
            </MDBCol>
            <MDBCol md="3">
              <h5 className="title">LEGAL</h5>
              <ul>
                <li className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
                  <a onClick={() => history.push('/vendor-registration')}>Terms & Conditions</a>
                </li>                
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid >
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.wedlite.in"> WedLite.in</a>
          </MDBContainer>
        </div>
      </MDBFooter>
    </div>
    
  )
}

export default (Layout);
