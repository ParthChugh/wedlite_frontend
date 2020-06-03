import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './App';
import Venue from './Components/Venue';
import Place from './Components/Place';
import TextPage from './Components/TextPage'
import VendorRegistration from './Components/VendorRegistration'
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import Contact from './Components/Contact'
import Profile from './Components/Profile'
import Layout from './Components/Layout'
import UpdateData from './Components/UpdateData'
import VenueLocation from './Components/VenueLocation'

const history = createBrowserHistory();

// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

export default function App() {
  const NoMatchPage = () => {
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
        <Route path="/my-venues">
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
          <center>
          <div className="container" style={{ width: '70%'}}>
            <div>
              <h1>Our Hiring <span style={{fontWeight: 'bold'}}>Process</span></h1>
            </div>
            
            <h5>
              At WedLite, we believe in hiring talented professionals who will help themselves and the company to grow at each level. So, say hello! We'd love to talk to you.
            </h5>
            <h4>
              A 3-Step Process to Grow with WedLite
            </h4>
            <div style={{flex: 1, display: 'flex'}}>
              <div style={{flex: 1/3, padding: 10}}>
                
                <span className="dot">1</span>                  

                <h2>Apply</h2>
                <h5>
                  You can apply online or send the resume to WedLite recruiter. It's noteworthy that candidates must possess the mentioned qualification, characteristics and experience asked by the company.  
                </h5>
              </div>
              <div style={{flex: 1/3, padding: 10}}>
                <span className="dot">2</span>
                <h2>Interview</h2>
                <h5>                
                  If selected further, you will be contacted by our HR representatives who will further evaluate your interest in the role you have applied for. Also, you will be briefed on how it's like to work at WedLite. 
                </h5>
              </div>
              <div style={{flex: 1/3, padding: 10}}>
                <span className="dot">3</span>
                <h2>Finalize</h2>
                <h5>
                  Next comes the in-person interview with the manager or potential team leader. There, you will be assessed whether you are suited well in the role we are hiring for or not. If selected further, the recruiter will share the feedback given by the hiring team and discuss the next steps.
                </h5>
              </div>
            </div>
            <h3 style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
              Please write us at carrer@wedlite.in with your CV to get more information about career at wedlite.in .
            </h3>
          </div>
          </center>
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
        <Route path="/venue-by-group/location/:cityId/group/:groupName">
          <VenueLocation />
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
