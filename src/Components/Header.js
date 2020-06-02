import React, { useEffect, useState } from 'react'
import * as LoginActionCreators from '../actions/loginActions';
import { Modal, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import backgroundLogo from '../logo.png';
import SearchBar from './common/SearchBar';
import { useForm } from 'react-hook-form';
import logo from '../logo.png';
import { CATEGORY, NORMAL} from '../constants';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Header = (props) => {  
  const history = useHistory();
  const { 
    LoginActions, 
    auth, 
    handleSearch, 
    defaultSelectedCity, 
    defaultSelectedCategory,
    showLogo,
    showSearchBar
   } = props;
  const { 
    RegisterUser, 
    loginUser, 
    handleClearData, 
    fetchCities, 
    fetchCategories,
    logout
  } = LoginActions;

  const isLoggedIn = auth.get('isLoggedIn');

  const [expanded, setExpanded] = useState(false);

  const { register, handleSubmit, errors } = useForm()

  const [SignUpShow, setSignUpShow] = useState(false);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    fetchCities()
    fetchCategories()
    setSignUpShow(false);
    setShow(false);
  },[isLoggedIn]);

  const goToAppLink = () => {
    console.log("App link is clicked")
  }

  const handleClose = () => {
    setShow(false)
    setSignUpShow(false)
  };
  const handleShow = () => {
    setSignUpShow(false)
    setShow(true)
  };
  const handleSignUpShow = () => {
    setShow(false)
    setSignUpShow(true)
  };

  const handleData = (data) => {
    const newData =  {
      "first_name": data.first_name,
      "last_name": data.last_name,
      "phone":  {
        "country_code": "+91",
        "number": data.number
      },
      "email": data.email,
      "password": data.password
    }
    RegisterUser(newData, false)
  }

  const showSignUpModal = () => (
    <Modal style={{marginTop: 100}} show={SignUpShow}  onHide={handleClose}>
      <Modal.Header className="font-bold" style={{fontSize: CATEGORY}} closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <form className="container margin-top-10" onSubmit={handleSubmit((data) => handleData(data))}>  
        <div className="form-group">
          <label>First Name</label>
          <input  name="first_name" className="form-control" placeholder="First Name"  ref={register({required: true})} />
          {errors.first_name && <span style={{color: 'red'}}>This field is required</span>}    
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input  name="last_name" className="form-control"  placeholder="Last Name" ref={register({required: true})} />
          {errors.last_name && <span style={{color: 'red'}}>This field is required</span>}    
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input name="email"  className="form-control" placeholder="Enter your email" ref={
            register({
              required: true, 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"
              }
              })} />
            {errors.email && <span style={{color: 'red'}}>Please enter a valid email</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span style={{ paddingRight: 10 }}>+91</span>
            <input placeholder="Phone Number" name="number" type="tel" className="form-control"   ref={register({required: true, maxLength: 10, minLength: 10})} />
          </div>
          {errors.number && <span style={{color: 'red'}}>Please type a valid phone number</span>}    
        </div>
        <div className="form-group">
        <label>Password</label>
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register(
            {
              required: true,
              minLength: 8
            }
            )} />
          {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
        </div>
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
        <div className="forgot-password row container margin-vertical-10" >
          Pressing this means you are accepting the&nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={() => {history.push('/terms-and-conditions')}}>Terms and Conditions</div>
        </div>        
        <div className="forgot-password row container margin-vertical-10" >
          Already Registered? &nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleShow}>Login</div>
        </div>        
      </form>
    </Modal>
  )

  const showLoginModal = () => (
    <Modal style={{marginTop: 100}} show={show} onHide={handleClose}>
      <Modal.Header className="font-bold" style={{fontSize: CATEGORY}} closeButton>
        <div>Login</div>
      </Modal.Header>
      <form className="container margin-top-10" onSubmit={handleSubmit(loginUser)}>  
        <div className="form-group">
          <label>Phone Number</label>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <span style={{ paddingRight: 10 }}>+91</span>
            <input name="username" type="tel" className="form-control" placeholder="Enter your Phone Number" ref={
              register({
                required: true,
                minLength: 10,
                maxLength: 10,
              })} />
          </div>
          {errors.username && <span style={{color: 'red'}}>Invalid Phone Number address</span>}
        </div>
        <div className="form-group">
        <label>Password</label>
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true, minLength: 8})} />
          {errors.password && <span style={{color: 'red'}}>Please should be of 8 characters</span>}    
        </div>    
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
        {/* <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Login via OTP
        </Button> */}
        <div className="forgot-password row container margin-vertical-10" >
          New to WedLite? &nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleSignUpShow}>Create Account</div>
        </div>        
      </form>
    </Modal>
  )

  const header = () => (
      <div style={{ width: '100%', backgroundColor: 'black',padding: 5, paddingLeft:20, paddingRight: 20,alignItems: 'center', position: 'fixed', top: 0, display: 'block', zIndex:9999}}>
      <Navbar.Brand onClick={()=> history.push('/')} style={{cursor: 'pointer', marginLeft: 20, display: "inline-block"}}>
        <img src={logo} alt="logo" className="logo-size" />
      </Navbar.Brand>
      {  
      <Navbar expanded={expanded}  className="ml-auto" collapseOnSelect expand="lg"  variant="dark" style={{padding: 0, display: 'inline-block', float: 'right'}}>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")}  aria-controls="basic-navbar-nav" />
        { !isLoggedIn ?
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{ alignItems: 'right'}}>
            <Nav.Link className="text" onClick={() => history.push('/')} style={{cursor:'pointer',fontSize: NORMAL, color: 'white'}}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => {
              history.push('/vendor-registration')
              setExpanded(false)
            }}  style={{cursor:'pointer',fontSize: NORMAL,color: 'white'}}>
              Register your Business
            </Nav.Link>
            <Nav.Link 
              className="nav-link"
            onClick={() => {
              history.push('/about-us')
              setExpanded(false)
            }} style={{cursor:'pointer',fontSize: NORMAL, color: 'white'}}>
              About Us
            </Nav.Link>
            <Nav.Link onClick={() => {
              history.push('/contact-us')
              setExpanded(false)
            }}  style={{cursor:'pointer',fontSize: NORMAL,color: 'white'}}>
              Contact Us
            </Nav.Link> 

            <Nav.Link onClick={() => {
              handleShow()
              setExpanded(false)
              }} style={{cursor:'pointer',fontSize: NORMAL, color: 'white'}} >
              Login
            </Nav.Link>
            <Nav.Link onClick={() => {
              handleSignUpShow()
              setExpanded(false)
              }} style={{cursor:'pointer',fontSize: NORMAL, color: 'white'}}>
              Sign up
            </Nav.Link> 
          </Nav>
        </Navbar.Collapse> 
        :
        <Navbar.Collapse expanded={expanded} id="basic-navbar-nav" style={{marginRight: 40, alignItems: 'center'}}>
          <Nav className="mr-auto">
            <Nav.Link className="text" onClick={() => {
              history.push('/')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL, color: 'white'}}>
              Home
            </Nav.Link>
            <Nav.Link className="text" onClick={() => {
            }} style={{cursor:'pointer',fontSize: NORMAL, color: 'white'}}
            >
              
            </Nav.Link>
            <NavDropdown 
              style={{cursor:'pointer',fontSize: NORMAL, color: 'white'}} 
              title="Profile" 
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item 
               style={{cursor:'pointer',fontSize: NORMAL}}
                onClick={() => {
                  history.push('/my-venues')
                  setExpanded(false)
              }}>
                My Venues
              </NavDropdown.Item>
              <NavDropdown.Item className="text" onClick={() => {
                logout()
                setExpanded(false)
                }}  style={{cursor:'pointer',fontSize: NORMAL}}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
        }
      </Navbar>
      }
    </div>
  ) 
  
  
  
  return (
    <React.Fragment>
      {header()}
      {showLogo &&
        <div className="text-align-center color-white" style={{ marginTop: 20, display: "block" }}>
          <img src={backgroundLogo} alt="logo" className="App-logo" />
        </div>
      }
        
      {showSearchBar &&
        <div style={{marginTop: 20, marginBottom: 20}}>
          <SearchBar
            handleSearch={handleSearch}
            defaultSelectedCity={defaultSelectedCity}
            defaultSelectedCategory={defaultSelectedCategory}
          />   
        </div>
      }

      {props.children}
      {showLoginModal()}
      {showSignUpModal()}
    </React.Fragment>
  )

}

Header.defaultProps = {
  showLogo: true,
  showSearchBar: true,
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
)(Header);
