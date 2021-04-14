import React, { useEffect, useState, useRef } from 'react'
import * as LoginActionCreators from '../actions/loginActions';
import * as ShopActionsCreators from '../actions/shopActions';
import { Modal, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import backgroundLogo from '../logo.png';
import Drawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './common/SearchBar';
import { useForm } from 'react-hook-form';
import Landing from '../assets/Landing.jpg'
import Cart from '../assets/cart.png';
import logo from '../assets/LogoHeader.png';
import { CATEGORY, NORMAL} from '../constants';
import { SEARCH_API } from '../urls';
import { Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';
import Exercise from '../assets/exercise.png'
import Gifts from '../assets/gifts.png'
import Wedding from '../assets/wedding.png'
import Horoscope from '../assets/horoscope.png'
import Invitation from '../assets/invitation.png'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ExerciseComponent from './common/ExerciseComponent'
import InvitationComponent from './common/InvitationComponent'
import HoroscopeComponent from './common/HoroscopeComponent'
import FashionComponent from './common/FashionComponent'
import GiftsComponent from './common/Gifts'

const scrollToRef = (ref) => window.scrollTo(
  {
    top: ref.current.offsetTop,
    left: 0,
    behavior: 'smooth'
  }  
)   

const Header = (props) => {  

  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });
  
  const classes = useStyles();
  const children = useRef(null)
  const history = useHistory();
  
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(open);
  };

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
  const [onfocusSearchBar, setOnfocusSearchBar] = useState(false);
  const [searchedData, updateSearchedData] = useState({});
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
            updateSearchedData(json);
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
    getCartItems({callbackFunction:  () => {}})
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
    <Modal style={{marginTop: 100,}} show={SignUpShow}  onHide={handleClose}>
      <Modal.Header className="font-bold " style={{fontSize: CATEGORY}} closeButton>
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

  const searchAnything = () => {
    return (
      <div className="wrapper search-bar" style={{flex: 1, display: 'flex'}} >
        <i className="fas fa-search" />
        <input
          style={{paddingLeft: 10, borderWidth: 0, flex: 1, display: 'flex'}}
          type="search"
          onFocus={() => setOnfocusSearchBar(true)}
          // onBlur={() => setOnfocusSearchBar(false)}
          onChange={onChange}
          placeholder="Search for Anything"
          autoComplete="off"
        />
        <div style={{ position: 'absolute', top: 70, backgroundColor: 'white', flex: 1 , border: onfocusSearchBar ? '1px solid #000000' : '0px solid #000000'  }}>
          {
            onfocusSearchBar && Object.keys(searchedData).map((el) => {
              return(
                <div>
                  { searchedData[el].length > 0 && <h3 style={{paddingLeft: 10}}>{el.split('')[0].toUpperCase() + el.slice(1)}</h3>} 
                  {
                    searchedData[el].map((venueOrPlace, index) => (
                      <div className="search-anything" key={index} style={{padding: 20 }} onClick={() => {
                          if(venueOrPlace.place_id) {
                            history.push(`/venue/place/${venueOrPlace.place_id}`)
                          } else {
                            history.push(`/shop/${venueOrPlace.id}`)
                          } 
                        }
                      }>
                        <div style={{fontSize: 14}}>{venueOrPlace.name} - {venueOrPlace.category.type ? venueOrPlace.category.type : venueOrPlace.category }  {venueOrPlace.location && `- ${venueOrPlace.location.city}`} { venueOrPlace.location &&  `, ${venueOrPlace.location.state}`} </div>
                      </div>
                    ))
                  }
                </div>
              )
            } ) 
          }
        </div>
      </div>
    )
  }
  const header = () => (
      <div>
      {  
      <Navbar fluid expanded={expanded}  className="ml-auto" collapseOnSelect expand="lg"  variant="light" >
        <Navbar.Toggle onClick={toggleDrawer(true)}  aria-controls="basic-navbar-nav" />
        
        <Navbar.Brand onClick={()=> history.push('/') } style={{cursor: 'pointer', marginLeft: 20, display: "inline-block"}}>
          <img src={logo} alt="logo" className="logo-size" />
        </Navbar.Brand>
        {/* <Nav.Link className="text header-color" onClick={() => {
          history.push('/shop')
          setExpanded(false)
          }}  style={{cursor:'pointer',fontSize: NORMAL}}
        >
          Categories
        </Nav.Link> */}
        
        {process.env.REACT_APP_STORE_ENABLE !== "false" && searchAnything()}
        { !isLoggedIn ?
        <Navbar.Collapse id="basic-navbar-nav" style={{paddingTop: 20, paddingBottom: 20}}>
          <Navbar.Toggle onClick={toggleDrawer(true)}  aria-controls="basic-navbar-nav" />
          <Nav inverse className="ml-auto" style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
            <Nav.Link onClick={() => {
              history.push('/vendor-registration')
              setExpanded(false)
             }}  
              style={{cursor:'pointer',fontSize: NORMAL}}
              className="header-color"
            >
              WedLite for Business
            </Nav.Link>
            {process.env.REACT_APP_STORE_ENABLE !== "false" && 
              <Nav.Link className="text header-color" onClick={() => {
                history.push('/shop')
                setExpanded(false)
                }}  style={{cursor:'pointer',fontSize: NORMAL}}>
                Shop on Wedlite
              </Nav.Link>
              }
            
            {/* <Nav.Link
            className="text header-color"
            onClick={() => {
              handleShow()
              setExpanded(false)
              }} style={{cursor:'pointer',fontSize: NORMAL}} >
              Login
            </Nav.Link> */}
          </Nav>
          
          <button 
            className="blank-button"
            style={{paddingLeft: 40, paddingRight: 40}}
            onClick={() => {
              // handleShow()
              // setExpanded(false)
              history.push('/login')
            }}>
              <span>
                Log In
              </span>
              
          </button>
          {/* <button 
            className="fill-button" 

            style={{marginLeft: 10, paddingLeft: 40, paddingRight: 30}}
            onClick={() => {
              history.push('/sign-up')
            }}>
              <span>
                Sign Up
              </span>
              
          </button>
           */}
        </Navbar.Collapse> 
        :
        <Navbar.Collapse expanded={expanded} id="basic-navbar-nav" style={{paddingTop: 20,paddingBottom: 20}}>
          <Nav className="ml-auto" style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
            <Nav.Link className="text header-color" onClick={() => {
              history.push('/')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Home
            </Nav.Link>
            {process.env.REACT_APP_STORE_ENABLE !== "false" &&
              <Nav.Link className="text header-color" onClick={() => {
                history.push('/shop')
                setExpanded(false)
                }}  style={{cursor:'pointer',fontSize: NORMAL}}>
                Shop on Wedlite
              </Nav.Link>
            }
            
            <Nav.Link className="text header-color" onClick={() => {
              history.push('/cart')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Cart({shop.get('cart').size})
            </Nav.Link>
            <NavDropdown
              className="text header-color" 
              style={{cursor:'pointer',fontSize: NORMAL, }} 
              title={
                <span style={{color: 'gray'}}>Profile</span>
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
        
        { !isLoggedIn ?
          <Drawer open={state} onClose={toggleDrawer(false)}>
            <Navbar.Toggle onClick={toggleDrawer(true)}  aria-controls="basic-navbar-nav" />
          <div>
            <button 
              className="blank-button top-option"
              style={{paddingLeft: 40, paddingRight: 40, marginRight: 10}}
              onClick={() => {
                // handleShow()
                // setExpanded(false)
                history.push('/login')
              }}>
                <span>
                  Log In
                </span>                
            </button>

          </div>
          <div>
            <button 
              className="fill-button" 

              style={{marginLeft: 10, paddingLeft: 40, paddingRight: 40, marginRight: 10}}
              onClick={() => {
                history.push('/sign-up')
              }}>
                <span>
                  Sign Up
                </span>
                
            </button>
          </div>
          <Divider />
          
          {/* <div style={{color: '#707070', marginLeft: 10, fontSize: 12, fontWeight: 'bold', marginTop: 10}} className="header-color margin-left-right ">
            Categories
          </div>
          <Nav.Link onClick={() => {
            history.push('/shop/products?material=marble')
            setExpanded(false)
            }}  
            style={{cursor:'pointer',fontSize: NORMAL}}
            className="header-color margin-left-right "
          >
            Exquisite marble articles
          </Nav.Link>
          <Nav.Link onClick={() => {
            history.push('/shop/products?material=wooden')
            setExpanded(false)
            }}  
            style={{cursor:'pointer',fontSize: NORMAL}}
            className="header-color margin-left-right "
          >
            Wooden articles
          </Nav.Link>
          <Nav.Link onClick={() => {
            history.push('/shop/products?material=epoxy')
            setExpanded(false)
            }}  
            style={{cursor:'pointer',fontSize: NORMAL}}
            className="header-color margin-left-right "
          >
            Epoxy articles
          </Nav.Link>           */}
          <Divider />
          <div style={{color: '#707070', marginLeft: 10, fontSize: 12, fontWeight: 'bold', marginTop: 10}} className="header-color margin-left-right ">
            More from Wedlite
          </div>
          <Nav.Link onClick={() => {
            history.push('/vendor-registration')
            setExpanded(false)
            }}  
            style={{cursor:'pointer',fontSize: NORMAL}}
            className="header-color margin-left-right "
          >
            WedLite for Business
          </Nav.Link>
          {
          process.env.REACT_APP_STORE_ENABLE !== "false" &&
            <Nav.Link className="text header-color margin-left-right" onClick={() => {
              history.push('/shop')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Shop on Wedlite
            </Nav.Link>
          }

          <Divider />
          <Nav.Link className="text header-color margin-left-right" onClick={() => {
            history.push('/about-us')
            setExpanded(false)
            }}  style={{cursor:'pointer',fontSize: NORMAL}}>
            About Us
          </Nav.Link>

          <Nav.Link className="text header-color margin-left-right" onClick={() => {
            history.push('/careers')
            setExpanded(false)
            }}  style={{cursor:'pointer',fontSize: NORMAL}}>
            Careers
          </Nav.Link>
         
          <Nav.Link className="text header-color margin-left-right" onClick={() => {
            history.push('/contact-us')
            setExpanded(false)
            }}  style={{cursor:'pointer',fontSize: NORMAL}}>
            Contact Us
          </Nav.Link>
          
          <Nav.Link className="text header-color margin-left-right" onClick={() => {
            history.push('/terms-and-conditions')
            setExpanded(false)
            }}  style={{cursor:'pointer',fontSize: NORMAL}}>
            Terms & Conditions
          </Nav.Link>

            {/* <Nav.Link
            className="text header-color"
            onClick={() => {
              handleShow()
              setExpanded(false)
              }} style={{cursor:'pointer',fontSize: NORMAL}} >
              Login
            </Nav.Link> */}
          
          
        </Drawer> 
        :
        <Drawer open={state} onClose={toggleDrawer(false)} >
          
            <Nav.Link className="text header-color margin-left-right top-option" style={{ marginLeft: 70, marginRight: 70}} onClick={() => {
              history.push('/')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Home
            </Nav.Link>
            {process.env.REACT_APP_STORE_ENABLE !== "false" && 
              <Nav.Link className="text header-color margin-left-right" onClick={() => {
                history.push('/shop')
                setExpanded(false)
                }}  style={{cursor:'pointer',fontSize: NORMAL}}>
                Shop on Wedlite
              </Nav.Link>
            }
            
            <Nav.Link className="text header-color margin-left-right" onClick={() => {
              history.push('/cart')
              setExpanded(false)
              }}  style={{cursor:'pointer',fontSize: NORMAL}}>
              Cart({shop.get('cart').size})
            </Nav.Link>
            <NavDropdown
              className="text header-color margin-left-right" 
              style={{cursor:'pointer',fontSize: NORMAL, color: 'gray'}} 
              title={
                <span style={{color: 'gray', marginLeft: -5}}>Profile</span>
              } 
              // id="collasible-nav-dropdown"
              id={`dropdown-variants-primary`}
            >
              <NavDropdown.Item
               className="text header-color margin-left-right" 
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
              <NavDropdown.Item className="text header-color margin-left-right" onClick={() => {
                logout()
                setExpanded(false)
                }}  style={{cursor:'pointer',fontSize: NORMAL}}>
                Logout
              </NavDropdown.Item>
              
            </NavDropdown>
            
        </Drawer>
        }
        {!isLoggedIn ? <img src={Cart} alt="logo" className="cart" /> : <div className="cart" style={{marginRight: 40}} />}
        
      </Navbar>
      }
      
    </div>
  ) 
  
  const executeScroll = () => scrollToRef(children)
  
  return (
    <React.Fragment>
      {header()}
      <div>
        {showSearchBar && 
        <Carousel>
          
          {/* <Carousel.Item>
            <div className="carousel-absolute">
              <ExerciseComponent />
            </div>
            <img
              className="d-block w-100"
              src={Exercise}
              alt="First slide"
            />
            
            
            <div className="carousel-search-bar">
              <ExerciseComponent />
            </div>

        </Carousel.Item> */}
          <Carousel.Item style={{backgroundColor: 'rgb(248,248,250)'}}>
            <div className="carousel-absolute">
              <InvitationComponent />
            </div>
            <img
              className="invitation-dashboard"
              src={Invitation}
              alt="First slide"
            />
            <div className="carousel-search-bar">
              <InvitationComponent />
            </div>
        </Carousel.Item>
        {/* <Carousel.Item>
          <div className="carousel-absolute">
            <HoroscopeComponent />
          </div>
          <img
            className="d-block w-100"
            src={Horoscope}
            alt="First slide"
          />
      
          
          <div className="carousel-search-bar">
            <HoroscopeComponent />
          </div>
        </Carousel.Item> */}
        <Carousel.Item >
          <div className="carousel-absolute">
            <SearchBar
              executeScroll={executeScroll}
              handleSearch={handleSearch}
              defaultSelectedCity={defaultSelectedCity}
              defaultSelectedCategory={defaultSelectedCategory}
            />   
          </div>
          <img
            className="d-block w-100"
            src={Wedding}
            alt="First slide"
          />
          
          
          
          <div className="carousel-search-bar">
            <SearchBar
              executeScroll={executeScroll}
              handleSearch={handleSearch}
              defaultSelectedCity={defaultSelectedCity}
              defaultSelectedCategory={defaultSelectedCategory}
            />   
          </div>
          
          
        </Carousel.Item>

        {
          process.env.REACT_APP_STORE_ENABLE !=='false' && 
          <Carousel.Item>
        
            <div className="carousel-absolute">
              <GiftsComponent />
            </div>
            <img
              className="d-block w-100"
              src={Gifts}
              alt="First slide"
            />
            
            <div className="carousel-search-bar">
              <GiftsComponent />   
            </div>
            
            
          </Carousel.Item>
        }
        
        <Carousel.Item>
          <div className="carousel-absolute">
            <FashionComponent />
          </div>
          <img
            className="d-block w-100"
            src={Gifts}
            alt="First slide"
          />
          
          <div className="carousel-search-bar">
            <FashionComponent />   
          </div>
          
          
        </Carousel.Item>
      </Carousel>}
      
      </div>

      <div ref={children}>
        {props.children}
      </div>
      
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
