import React, {useState} from 'react';
import logo from './wedlite.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import SearchBar from './Components/common/SearchBar';
// import 'semantic-ui-css/semantic.min.css';
import {Card, Modal, Button} from 'react-bootstrap';
import {  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CATEGORY, NORMAL} from './constants';
import { REGISTER_API, LOGIN_API } from './urls';

const App = () => {
  const defaultPlace = 'Udaipur'
  
  const [place, updatePlace] = useState(defaultPlace);
  
  const { register, handleSubmit, errors } = useForm()

  const [SignUpShow, setSignUpShow] = useState(false);

  const goToAppLink = () => {
    console.log("App link is clicked")
  }

  const RegisterUser = (data) => {
    fetch(REGISTER_API, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 201) {
          response.json().then((json) => {
            toast("Welcome")
          })
        } else {
          toast("Some problem please contact supportas")
        }
      })
      .catch(() => {

    });
  }
  const loginUser = (data) => {
    fetch(LOGIN_API, {
      method: 'POST', 
      body: JSON.stringify(data),
    })
      .then((response) => response.json().then((json) => {
        console.log(json);
      }))
      .catch(() => {
    });
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
            Commission free wedding planner in  <span className="font-bold ">{place === '' ? defaultPlace: place}</span>
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

  const showSignUpModal = () => (
    <Modal show={SignUpShow}  onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <form className="container margin-top-10" onSubmit={handleSubmit(RegisterUser)}>  
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
        <label>Password</label>
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
          {errors.password && <span style={{color: 'red'}}>Please enter a valid password</span>}    
        </div>
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
        <div className="forgot-password row container margin-vertical-10" >
          Already Registered? &nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleShow}>Login</div>
        </div>        
      </form>
    </Modal>
  )

  const showLoginModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="font-bold" style={{fontSize: CATEGORY}} closeButton>
        <div>Login</div>
      </Modal.Header>
      <form className="container margin-top-10" onSubmit={handleSubmit(loginUser)}>  
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
        <label>Password</label>
          <input  type="password" className="form-control" name="password" placeholder="Password" autoComplete="current-password" ref={register({required: true})} />
          {errors.password && <span style={{color: 'red'}}>Please enter a valid password</span>}    
        </div>
        <Button className="btn btn-primary btn-block" type="submit" variant="outline-dark">
          Submit
        </Button>
        <div className="forgot-password row container margin-vertical-10" >
          New to WedLite? &nbsp;
          <div style={{cursor:'pointer', color: '#3366BB'}} onClick={handleSignUpShow}>Create Account</div>
        </div>        
      </form>
    </Modal>
  )
  return (
    <div>
      <div className="image-background">
        <div>
          {header()}
          {LogoSearchBar()}
        </div>
      </div>
      {showLoginModal()}
      {showSignUpModal()}
      <ToastContainer />
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
