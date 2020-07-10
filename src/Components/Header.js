import React, { useEffect, useState } from 'react'
import * as LoginActionCreators from '../actions/loginActions';
import * as ShopActionsCreators from '../actions/shopActions';
import { Modal, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import backgroundLogo from '../logo.png';
import SearchBar from './common/SearchBar';
import { useForm } from 'react-hook-form';
import Cart from '../assets/cart.png';
import logo from '../assets/LogoHeader.png';
import { CATEGORY, NORMAL} from '../constants';
import { SEARCH_API } from '../urls';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const Header = (props) => {  
  const history = useHistory();
  const { 
    LoginActions, 
    ShopActions,
    auth, shop,
    handleSearch, 
    defaultSelectedCity, 
    defaultSelectedCategory,
    showLogo,
    showSearchBar
   } = props;
  const { 
    RegisterUser, 
    loginUser,   
    fetchCities, 
    fetchCategories,
    logout,
  } = LoginActions;

  const {
    getCartItems
  } = ShopActions;

  const isLoggedIn = auth.get('isLoggedIn');

  const [expanded, setExpanded] = useState(false);

  const { register, handleSubmit, errors } = useForm()

  const [SignUpShow, setSignUpShow] = useState(false);
  const [show, setShow] = useState(false);

  const search = (q) => {
    fetch(`${SEARCH_API}?q=${q}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            console.log(json);
          })
        } 
      })
      .catch(() => {
        console.log('no response');
    });
  }
  
  useEffect(() => {
    fetchCities()
    fetchCategories()
    setSignUpShow(false);
    getCartItems()
    setShow(false);
  },[isLoggedIn]);

  // const goToAppLink = () => {
  //   console.log("App link is clicked")
  // }

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
      <form className="container margin-top-10" style={{ flex: 1,display: 'flex', flexDirection:'column'}} onSubmit={handleSubmit((data) => handleData(data))}>  
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
      <Modal.Header style={{alignItems: 'center', display: 'flex', flexDirection: 'column-reverse'}} closeButton>
        <h6>Please Login</h6>
        <h6>Welcome back!</h6>
        <img src={backgroundLogo} alt="logo" className="logo-size" />
        <div>
        </div>
      </Modal.Header>
      <form className="container margin-top-10" style={{ flex: 1,display: 'flex', flexDirection:'column'}} onSubmit={handleSubmit(loginUser)}>  
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

  const onChange = (event) => {
    search(event.target.value)
  }

  const header = () => (
      <div>
      {  
      <Navbar expanded={expanded}  className="ml-auto" collapseOnSelect expand="lg"  variant="light" style={{
        width: '100%', 
        padding: 5, 
        paddingLeft:20, 
        paddingRight: 20,
        alignItems: 'center', 
        top: 0, 
        display: 'flex', 
        flex: 1,
        zIndex:9999,}}>
        <Navbar.Brand onClick={()=> history.push('/')} style={{cursor: 'pointer', marginLeft: 20, display: "inline-block"}}>
          <img src={logo} alt="logo" className="logo-size" />
        </Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")}  aria-controls="basic-navbar-nav" />
        { !isLoggedIn ?
        <Navbar.Collapse id="basic-navbar-nav" style={{paddingTop: 20,paddingBottom: 20}}>
          <Nav className="mr-auto" style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
           <div className="wrapper" style={{flex: 1, display: 'flex'}} >
              <div className="search-bar" >
                <i className="fas fa-search"></i>
                <input
                  style={{paddingLeft: 10, borderWidth: 0, flex: 1, display: 'flex',}}
                  type="search"
                  onChange={onChange}
                  placeholder="Search for Anything"
                  autoComplete="off"
                />
              </div>
           </div>
            <Nav.Link onClick={() => {
              history.push('/vendor-registration')
              setExpanded(false)
             }}  
              style={{cursor:'pointer',fontSize: NORMAL}}
              className="header-color"
            >
              WedLite for Business
            </Nav.Link>
            <Nav.Link className="text header-color" onClick={() => {
              history.push('/shop')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Shop on Wedlite
            </Nav.Link>
            {/* <Nav.Link
            className="text header-color"
            onClick={() => {
              handleShow()
              setExpanded(false)
              }} style={{cursor:'pointer',fontSize: NORMAL}} >
              Login
            </Nav.Link> */}
          </Nav>
          <img src={Cart} alt="logo" className="cart" />
          <button 
            className="blank-button"
            onClick={() => {
              handleShow()
              setExpanded(false)
            }}>
              Log In
          </button>
          <button 
            className="fill-button" 
            style={{marginLeft: 10}}
            onClick={() => {
              handleSignUpShow()
              setExpanded(false)
            }}>
              Sign Up
          </button>
        </Navbar.Collapse> 
        :
        <Navbar.Collapse expanded={expanded} id="basic-navbar-nav" style={{marginRight: 40, alignItems: 'center'}}>
          <Nav className="mr-auto" style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
            <Nav.Link className="text header-color" onClick={() => {
              history.push('/')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Home
            </Nav.Link>
            <Nav.Link className="text header-color" onClick={() => {
              history.push('/shop')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Shop on Wedlite
            </Nav.Link>
            <Nav.Link className="text header-color" onClick={() => {
              history.push('/cart')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Cart({shop.get('cart').size})
            </Nav.Link>
            <NavDropdown
              className="text header-color" 
              style={{cursor:'pointer',fontSize: NORMAL}} 
              title={
                <span>Profile</span>
              } 
              // id="collasible-nav-dropdown"
              id={`dropdown-variants-primary`}
            >
              <NavDropdown.Item
               className="text header-color" 
               style={{cursor:'pointer',fontSize: NORMAL}}
                onClick={() => {
                  history.push('/my-venues')
                  setExpanded(false)
              }}>
                My Venues
              </NavDropdown.Item>
              {/* <NavDropdown.Item className="text" onClick={() => {
                setExpanded(false)
                history.push('/blog')
                }}  style={{cursor:'pointer',fontSize: NORMAL}}>
                What is WedLite?
              </NavDropdown.Item> */}
              <NavDropdown.Item className="text header-color" onClick={() => {
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
      <div>
        {header()}
      </div>
        
      {showSearchBar &&        
        <SearchBar
          handleSearch={handleSearch}
          defaultSelectedCity={defaultSelectedCity}
          defaultSelectedCategory={defaultSelectedCategory}
        />   
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
  const { auth, shop } = state;
  return { auth, shop };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
    ShopActions: bindActionCreators(ShopActionsCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
