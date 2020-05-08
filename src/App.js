import React, {useState} from 'react';
import logo from './wedlite.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/common/SearchBar';
import {Card, Modal} from 'react-bootstrap';
import { CATEGORY, NORMAL} from './constants';
import { REGISTER_API } from './urls';

const App = () => {
  const defaultPlace = 'Udaipur'
  const [place, updatePlace] = useState(defaultPlace);
  const [SignUpShow, setSignUpShow] = useState(false);
  const goToAppLink = () => {
    console.log("App link is clicked")
  }

  const RegisterUser = () => {
    console.log('yahan aaya ')
    const formData = {
      "email": "user@example.com",
      "password": "string"
    };
    fetch(REGISTER_API, {
      method: 'POST', 
      body: formData,
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json().then((json) => {
        console.log(json);
      }))
      .catch(() => {
        
    });
  }
  const loginUser = (event) => {
    console.log(event);
    // fetch(LOGIN_API, {
    //   method: 'POST', 
    //   body: data,
    // })
    //   .then((response) => response.json().then((json) => {

    //   }))
    //   .catch(() => {
    // });
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
  
  const header = () => {
    return (
      <div className="row space-around color-white">
        <div  onClick={goToAppLink} style={{cursor:'pointer', fontSize: 14}}>
          Get the App
        </div>
        <div className="row ">
          <div onClick={handleShow} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}} to="/login">
            Login
          </div>
          <div onClick={handleSignUpShow} className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Sign up
          </div>
        </div>
      </div>
    )
  }

  const handleSearch = (data) => {
    updatePlace(data);
  }

  const LogoSearchBar = () => {
    return (
      <div className="text-align-center margin-top-150 color-white" >
        <img src={logo} alt="logo" className="App-logo" />
        <div style={{marginTop: -50}}>
          <span style={{fontSize: CATEGORY}}>
            Search the next place with your loved ones in  <span className="font-bold ">{place === '' ? defaultPlace: place}</span>
          </span>
          <SearchBar
            handleSearch={handleSearch}
          />
        </div>
      </div>
    )
  }

  const cards = [
    {image: require("./assets/1.jpg"),title: "Plan your wedding at home"},
    {image: require("./assets/2.jpg"),title: "Get 10% discount on 1st marriage*"},
    {image: require("./assets/3.jpg"),title: "Get amazing offers on your doorstep"},
    {image: require("./assets/4.jpg"),title: "Book Now"}
  ];

  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="image-background">
        <div>
          {header()}
          {LogoSearchBar()}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="font-bold" style={{fontSize: CATEGORY}} closeButton>
          <div>Login</div>
        </Modal.Header>
        <form className="container margin-top-10" onSubmit={loginUser}>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
              <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          
          <div className="forgot-password row container margin-vertical-10" >
            
            New to WedLite? &nbsp;
          
            <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleSignUpShow}>Create Account</div>
            
          </div>          
        </form>
      </Modal>
      <Modal show={SignUpShow}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <form className="container margin-top-10" onSubmit={RegisterUser}>
          <div className="form-group">
              <label>Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          
          
            <div className="forgot-password row container margin-vertical-10" >
              <div>
              Already registered &nbsp;
              </div>
              <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleShow}>
                Sign in?
              </div>
            </div>          
        </form>
      </Modal>
      <div className="row space-around" style={{marginLeft: 100, marginRight: 100, marginTop: 50, marginBottom: 50}}>
        {cards.map((card, index) => (
          <Card style={{ width: '18rem', borderRadius: 10,elevation: 5 }} key={index}>
            <Card.Img variant="top" src={card.image} style={{height: 300, borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
