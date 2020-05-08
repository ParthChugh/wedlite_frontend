import React, {useState} from 'react';
import logo from './wedlite.png';
import './App.css';
import SearchBar from './Components/common/SearchBar';
import {LOGO_FONT, CATEGORY, NORMAL} from './constants';
// import background from '';


const App = () => {
  const appName = "Wedlite"
  const defaultPlace = 'Udaipur'
  const [place, updatePlace] = useState(defaultPlace);
  
  const goToAppLink = () => {
    console.log("App link is clicked")
  }
  
  const header = () => {
    return (
      <div className="row space-around color-white">
        <a  onClick={goToAppLink} style={{cursor:'pointer', fontSize: 14}}>
          Get the App
        </a>
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
  return (
    <div className="image-background">
      <div>
        {header()}
        <div className="text-align-center margin-top-150 color-white" >
          {/* <span style={{fontSize: LOGO_FONT}} className="font-bold color-white "> */}
            <img src={logo} className="App-logo" />
          {/* </span> */}
          <div>
            <span style={{fontSize: CATEGORY}}>
              Search the next place with your loved ones in  <span className="font-bold ">{place === '' ? defaultPlace: place}</span>
            </span>
            <SearchBar
              handleSearch={handleSearch}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
