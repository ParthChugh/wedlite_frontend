import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import Home from './App';
import Venue from './Components/Venue';
import Place from './Components/Place';
import TextPage from './Components/TextPage'
import VendorRegistration from './Components/VendorRegistration'
import Contact from './Components/Contact'
import Profile from './Components/Profile'
import Layout from './Components/Layout'

export default function App() {
  
  const NoMatchPage = () => {
    const history = useHistory();
    const handleSearch = (cityObject, categoryObject) => {
      history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
    }
    return (
      <Layout
        handleSearch={handleSearch}
      >
        <h1>Page not found</h1>
      </Layout>
    );
  };
  
 

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
        <Route path="/profile">
          <Profile />
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
        <Layout
          showSearchBar={false}
        >
          <div >
            <h3 style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
              Please write us at carrer@wedlite.in with your cv to get more information about career at wedlite.in .
            </h3>
          </div>
         </Layout> 
        </Route>
        <Route path="/contact-us">
          <Contact />
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route component={NoMatchPage} />
      </Switch>
    </Router>
  );
}
