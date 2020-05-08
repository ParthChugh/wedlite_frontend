import React, {useState} from 'react';
import logo from './wedlite.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './Components/common/SearchBar';
import Card from 'react-bootstrap/Card';
import { CATEGORY, NORMAL} from './constants';

const App = () => {
  const defaultPlace = 'Udaipur'
  const [place, updatePlace] = useState(defaultPlace);
  
  const goToAppLink = () => {
    console.log("App link is clicked")
  }
  
  const header = () => {
    return (
      <div className="row space-around color-white">
        <div  onClick={goToAppLink} style={{cursor:'pointer', fontSize: 14}}>
          Get the App
        </div>
        <div className="row ">
          <div className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
            Login
          </div>
          <div className="margin-left-right-10 color-white" style={{cursor:'pointer',fontSize: NORMAL}}>
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

  return (
    <div>
      <div className="image-background">
        <div>
          {header()}
          {LogoSearchBar()}
        </div>
      </div>
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
