import React from 'react'
// import { MDBContainer, MDBFooter, MDBRow, MDBCol } from "mdbreact";
import {  NORMAL} from '../constants';
import playstore from '../assets/playstore.png'
import appstore from '../assets/app-store.png'
import {connect} from 'react-redux';
import * as LoginActionCreators from '../actions/loginActions';
import {bindActionCreators} from 'redux';
import logo from '../assets/LogoFooter.png'
import {useHistory} from 'react-router-dom'
import { Footer, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import {faTwitter, faInstagram, faFacebook, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FooterContainer = (props) => {
  const {auth} = props;
  
  const isLoggedIn = auth.get('isLoggedIn');
  const history = useHistory();
  return (
    <Footer className="footer-color page-footer font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={logo} alt="logo" style={{height: 70}} />
          </MDBCol>
          <MDBCol md="2">
            <h5 style={{fontWeight: 'bold',color: 'black'}} className="title">GENERAL</h5>
            <div className="margin-left-right-10  text" style={{cursor:'pointer',fontSize: NORMAL,color: 'black'}}>
              <a onClick={() => {
                history.push('/about-us')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
              }}>About Us</a>
            </div>                             
          </MDBCol>
          <MDBCol md="2">
            <h5 style={{fontWeight: 'bold',color: 'black'}} className="title" >COMPANY</h5>
            <div className="margin-left-right-10  text" style={{cursor:'pointer',fontSize: NORMAL,color: 'black'}}>
              <a onClick={() => {
                history.push('/careers')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });  
              }}>Careers</a>
            </div>                
            <div className="margin-left-right-10  text" style={{cursor:'pointer',fontSize: NORMAL,color: 'black'}}>
              <a onClick={() =>{ 
                history.push('/contact-us')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
              }}>Contact Us</a>
            </div>                
          </MDBCol>
          <MDBCol md="2">
          <h5 style={{fontWeight: 'bold',color: 'black'}} className="title">LEGAL</h5>
            <div className="margin-left-right-10  text" style={{cursor:'pointer',fontSize: NORMAL,color: 'black'}}>
              <a onClick={() => { 
                history.push('/terms-and-conditions')
                window.scrollTo({top: 0, left: 0, behavior: 'smooth',color: 'black' });
              }}>Terms & Conditions</a>
            </div>
          </MDBCol>
          <MDBCol md="3">
            <div>
            {!isLoggedIn && 
              <div className="row">

                <h5 style={{fontWeight: 'bold',color: 'black'}} className="title">Register for business</h5>
                <button  onClick={() => {
                  history.push('/vendor-registration')
                  window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
                }} className="fill-button" style={{paddingLeft: 20, paddingRight: 20}}>Sign up!</button>
                </div>  
            }
              <div>
                <ul className="list-unstyled list-inline">  
                  <a href="https://twitter.com/InWedlite" target="_blank"><FontAwesomeIcon className="list-inline-item"  icon={faTwitter} size="3x" style={{marginRight: 10,marginBottom: 10, marginTop:10,marginLeft: 0, color: '#A63A67'}} /></a>
                  <a href="https://www.instagram.com/wedlite.in/" target="_blank"><FontAwesomeIcon className="list-inline-item" icon={faInstagram} size="3x" style={{margin: 10, color: '#A63A67'}} /></a>
                  <a href="https://www.facebook.com/Wedlite.in/?modal=admin_todo_tour" target="_blank"><FontAwesomeIcon className="list-inline-item" icon={faFacebook} size="3x" style={{margin: 10, color: '#A63A67'}} /></a>
                  <a href="https://www.linkedin.com/in/wedlite-book-your-wedding-now-686a311ab/" target="_blank"><FontAwesomeIcon className="list-inline-item" icon={faLinkedin} size="3x" style={{margin: 10, color: '#A63A67'}} /></a>
                </ul>
            </div>
            </div>
          
          </MDBCol>
          
        </MDBRow>
      </MDBContainer>
      {/* <hr />
      <div className="text-center">
          <ul className="list-unstyled list-inline">  
            <h5 className="title">Download the App</h5>
            <div className="logo-container">
              <img src={playstore} alt="logo" className="logo" />
              <img src={appstore} alt="logo" className="logo" /> 
            </div>
          </ul>
      </div> */}
      <hr />
      <div className="text-center">
          <ul className="list-unstyled list-inline ">  
            <li style={{color: 'black'}}><div style={{fontWeight: 'bold'}}>We Deliver in :</div> Ahmedabad, Bangalore,  Chennai, Faridabad, Ghaziabad,  Gurgaon, Hyderabad, Indore, Jaipur, Jodhpur,  Kolkata, Mumbai,  Navi Mumbai, New Delhi, Noida, Pimpri Chinchwad, Pune,  Surat, Udaipur, Thane, Vadodara, Mysore & Across India</li>
          </ul>
      </div>
      {/* <div className="footer-copyright text-center">
        <MDBContainer fluid >
          &copy; {new Date().getFullYear()} Copyright: <a href="https://www.wedlite.in"> WedLite.in</a>
        </MDBContainer>
      </div> */}
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
