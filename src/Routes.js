import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom";
import Home from './App';
import Venue from './Components/Venue';
import Place from './Components/Place';
import TextPage from './Components/TextPage'
import VendorRegistration from './Components/VendorRegistration'
import Contact from './Components/Contact'
import Profile from './Components/Profile'
import Layout from './Components/Layout'
import UpdateData from './Components/UpdateData'

export default function App() {
  const NoMatchPage = () => {
    const history = useHistory();
    return (
      <Layout
        showSearchBar={false}
      >
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <h1>Page not found, please return to <Link to="/">Home</Link> Page</h1>
        </div>
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
              Please write us at carrer@wedlite.in with your CV to get more information about career at wedlite.in .
            </h3>
          </div>
         </Layout> 
        </Route>
        <Route path="/contact-us">
          <Contact />
        </Route>
        <Route path="/venue/place/:placeId/edit">
          <UpdateData />
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
