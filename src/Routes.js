import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './App';
import Venue from './Components/Venue';
import Place from './Components/Place';
import TextPage from './Components/TextPage'
import VendorRegistration from './Components/VendorRegistration'

export default function App() {
  return (
    <Router>
      <Switch>
        {/* <Route path="/login">
          <Login />
        </Route> */}
        <Route path="/terms-and-conditions">
          <TextPage 
            slug="terms-and-conditions"
          />
        </Route>
        <Route path="/about-us">
          <TextPage
            slug="about-us"
          />
        </Route>
        <Route path="/vendor-registration">
          <VendorRegistration
            slug="about-us"
          />
        </Route>
        <Route path="/careers">
          <div>
            COMING SOON
          </div>
        </Route>
        <Route path="/contact-us">
          <div>
            COMING SOON
          </div>
        </Route>
        <Route path="/venue/place/:placeId">
          <Place />
        </Route>
        <Route path="/venue/place/:placeId">
          <Place />
        </Route>
        <Route path="/venue/category/:categoryId/city/:cityId">
          <Venue />
        </Route>
        <Route path="/">
          <Home />
        </Route>
        
      </Switch>
    </Router>
  );
}
