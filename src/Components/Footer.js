import React from 'react'
// import { MDBContainer, MDBFooter, MDBRow, MDBCol } from "mdbreact";
import {  NORMAL} from '../constants';
import playstore from '../assets/playstore.png'
import appstore from '../assets/app-store.png'
import {connect} from 'react-redux';
import * as LoginActionCreators from '../actions/loginActions';
import {bindActionCreators} from 'redux';
import logo from '../Wedlite.png'
import {useHistory} from 'react-router-dom'
import { Footer, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import {faTwitter, faInstagram, faFacebook, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FooterContainer = (props) => {
  const {auth} = props;
  
  const isLoggedIn = auth.get('isLoggedIn');
  const history = useHistory();
  return (
    <Footer color="stylish-color-dark" className="page-footer font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3">
            <img src={logo} alt="logo" style={{height: 100}} />
          </MDBCol>
          <MDBCol md="3">
            <h5 style={{fontWeight: 'bold'}} className="title">GENERAL</h5>
            <div className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
              <a onClick={() => {
                history.push('/vendor-registration')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
              }}>Vendor Registration</a>
            </div>
            <div className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
              <a onClick={() => {
                history.push('/about-us')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
              }}>About Us</a>
            </div>                
            <div className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
              <a onClick={() => {
                history.push('/blog')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });  
              }}>What is Wedlite?</a>
            </div>                
          </MDBCol>
          <MDBCol md="3">
            <h5 style={{fontWeight: 'bold'}} className="title" >COMPANY</h5>
            <div className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
              <a onClick={() => {
                history.push('/careers')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });  
              }}>Careers</a>
            </div>                
            <div className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
              <a onClick={() =>{ 
                history.push('/contact-us')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
              }}>Contact Us</a>
            </div>                
          </MDBCol>
          <MDBCol md="3">
          <h5 style={{fontWeight: 'bold'}} className="title">LEGAL</h5>
            <div className="margin-left-right-10 color-white text" style={{cursor:'pointer',fontSize: NORMAL}}>
              <a onClick={() => { 
                history.push('/terms-and-conditions')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
              }}>Terms & Conditions</a>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      {!isLoggedIn && <hr /> }
      {!isLoggedIn &&
      <div className="text-center py-3">
          <ul className="list-unstyled list-inline mb-0">
              <li className="list-inline-item">
                  <h5 className="mb-1">Register for business</h5>
              </li>
              <li className="list-inline-item"><a  onClick={() => {
                history.push('/vendor-registration')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
              }} className="btn btn-danger btn-rounded">Sign up!</a></li>
          </ul>
      </div>
      }
      <hr />
      <div className="text-center">
          <ul className="list-unstyled list-inline">  
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
            <a href="https://twitter.com/InWedlite" target="_blank"><FontAwesomeIcon className="list-inline-item"  icon={faTwitter} size="2x" style={{marginLeft: 5, marginRight: 5}} /></a>
            <a href="https://www.instagram.com/wedlite.in/" target="_blank"><FontAwesomeIcon className="list-inline-item" icon={faInstagram} size="2x" style={{marginLeft: 5, marginRight: 5}} /></a>
            <a href="https://www.facebook.com/Wedlite.in/?modal=admin_todo_tour" target="_blank"><FontAwesomeIcon className="list-inline-item" icon={faFacebook} size="2x" style={{marginLeft: 5, marginRight: 5}} /></a>
            <a href="https://www.linkedin.com/in/wedlite-book-your-wedding-now-686a311ab/" target="_blank"><FontAwesomeIcon className="list-inline-item" icon={faLinkedin} size="2x" style={{marginLeft: 5, marginRight: 5}} /></a>
          </ul>
      </div>
      <hr />
      <div className="text-center">
          <ul className="list-unstyled list-inline ">  
            <li className><div style={{fontWeight: 'bold'}}>We Deliver in :</div> Ahmedabad, Bangalore,  Chennai, Faridabad, Ghaziabad,  Gurgaon, Hyderabad, Indore, Jaipur, Jodhpur,  Kolkata, Mumbai,  Navi Mumbai, New Delhi, Noida, Pimpri Chinchwad, Pune,  Surat, Udaipur, Thane, Vadodara, Mysore & Across India</li>
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

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FooterContainer);
