import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './App';
import {Helmet} from "react-helmet";
import Venue from './Components/Venue';
import Place from './Components/Place';
import TextPage from './Components/TextPage'
import VendorRegistration from './Components/VendorRegistration'
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
import Contact from './Components/Contact';
import Profile from './Components/Profile';
import Layout from './Components/Layout';
import UpdateData from './Components/UpdateData';
import VenueLocation from './Components/VenueLocation';
import Shop from './Components/Shop';
import Products from './Components/Shop/Products';
import ShopSingleDetail from './Components/Shop/ShopSingleDetail';
import Cart from './Components/Shop/Cart';
import ConfirmOrder from './Components/Shop/ConfirmOrder';
import PlaceOrder from './Components/PlaceOrder';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import FitnessForm from './Components/FitnessForm';
import HoroscopeForm from './Components/HoroscopeForm';

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
        <div style={{flex: 1,height: window.innerHeight, display: 'flex',alignItems: 'center' , justifyContent: 'center'}}>
          <h1>Page not found, please return to <Link to="/">Home</Link> Page</h1>
        </div>
      </Layout>
    );
  };
  
 

  return (
    <Router>
      <Switch>
        <Route path="/cart">
          <Helmet>
            <title>Wedlite Shop</title>
            <meta name="description" content="Only one click away to get our exciting gift hamper with your products" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Cart />
        </Route>
        <Route path="/shop/products">
          <Helmet>
            <title>Products you might like</title>
            <meta name="title" content="Products you might like" />
            <meta name="description" content="Easily get your weddding things at one place" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Products />
        </Route>
        <Route path="/shop/:id">
          <ShopSingleDetail />
        </Route>
        <Route path="/ecommerce/payments/confirm">
          <ConfirmOrder />
        </Route>
        <Route path="/shop">
          <Helmet>
            <title>Categories</title>
            <meta name="title" content="Choose from our categories" />
            <meta name="description" content="Easily get your weddding things at one place" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Shop />
        </Route>
        <Route path="/blog">
          <Helmet>
            <title>What is WedLite?</title>
            <meta name="title" content="What is WedLite?" />
            <meta name="description" content="Wedding is soulful affix which everyone dreams of. All dreams wrapped up in the wish box unfolds on the big day. Weddings are fun. Sure a lot of work goes into throwing the perfect shower and then there are all those hours of planning the so - special rustic wedding is just the right barn venue." />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Layout 
            showLogo={false}
            showSearchBar={false}
          >
            <div className="container">
              <h1>What is WedLite?</h1>
              <h5>Wedding is soulful affix which everyone dreams of. All dreams wrapped up in the wish box unfolds on the big day. Weddings are fun. Sure a lot of work goes into throwing the perfect shower and then there are all those hours of planning the so - special rustic wedding is just the right barn venue.  Here are some best ways to wind up your happy day more cost effective yet alluring and magnificent.</h5>

              <h5>Don&rsquo;t rush with the mass.</h5>

              <h5> In the peak season from hotels to culinary, everything goes up. Luxury seems to be more affordable when it is just &ldquo;Normal&rdquo;. So to avoid any highs and lows in your budget and jubilation as well, avoid booking your wedding in the peak season.  Go out of box to turn your dream wedding into more cheerful joy bank by saving the date which falls in range of less expected muhurts. This also calls for less of unwanted rush and scramble. Also, hiked expenses in the booming season may bring down your luxurious honeymoon budget down. So go off beat to rock!!</h5>

              <h5>Don&rsquo;t get married on weekends.</h5>

              <h5>Though we love our near and dear ones to be part of our wedding and auspicious ceremonies but it is hard to deny that weekend or holiday weddings always calls for those who barely matters us. Planning an event at in weekends, vacations and holidays is expected to come with the turbulence in the budget. In all, to end up in more captivating affair keep away your wedding dates far away from holidays and weekends.</h5>

              <h5>Take your own time</h5>

              <h5>&ldquo;Well planned is half done&rdquo;. Early bookings always saves tons of money hereby enriching more the event; and so the happiness. Planning an auspicious occasion few months prior always helps overcoming the drastic expenses which any arbitrarily planned wedding would bring. Never the less, marriage is a word to say but soulful journey to begin with so why hurry, Isn&rsquo;t it??</h5>

              <h5>Why you? Let us do it all It&rsquo;s your big day</h5>

              <h5>It&rsquo;s time to sit back and relax. After all you deserve all the pampering and coddle. Wedlite takes all the pleasure to turn your wedding into a grand venture without hiking up your bills. A good choice of wedding planner is all you have to do to make your D-day all wondering and awful. Just put forward the choices and rest back and invest all your time in grooming and glowing. Why to compromise your precious time in deliberations.</h5>

              <h5>Ditch Brokers</h5>

              <h5>Happiness is contagious and why to ruin it because of third party. Wedlite promises complete NO BROKER policy which keeps everything intact between just two people; You and Us. We ensure to keep your budget well planned by keeping away all unnecessary hefty amount. We aim to come up with all the details and information in just a single click which is direct connect between us.</h5>

              <h5>Together is a wonderful place to be.  Happily ever after starts now!!!</h5>
            </div>
          </Layout>
        </Route>
        <Route path="/terms-and-conditions">
          <TextPage 
            slug="terms-and-conditions"
          />
        </Route>
        <Route path="/my-venues">
          <Helmet>
            <title>Venue Booking</title>
            <meta name="title" content="Venue Booking" />
            <meta name="description" content="Book your wedding place now, and get huge discount" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Profile />
        </Route>
        <Route path="/about-us">
          <TextPage
            slug="about-us"
          />
        </Route>
        <Route path="/vendor-registration">
          <Helmet>
            <title>Register with us</title>
            <meta name="title" content="Register with us" />
            <meta name="description" content="Let others know about your company" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <VendorRegistration
            slug="about-us"
          />
        </Route>
        <Route path="/place-order">
          <PlaceOrder />
        </Route>
        <Route path="/login">
          <Helmet>
            <title>Login</title>
            <meta name="title" content="Login" />
            <meta name="description" content="Login with us to get great deals and discounts" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Login />
        </Route>
        <Route path="/sign-up">
          <Helmet>
            <title>Sign Up</title>
            <meta name="title" content="Sign Up" />
            <meta name="description" content="Sign Up with us to get great deals and discounts" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <SignUp />
        </Route>
        <Route path="/fitness">
          <Helmet>
            <title>Fitness</title>
            <meta name="title" content="Fitness" />
            <meta name="description" content="Body fitness makes life better" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <FitnessForm />
        </Route>
        <Route path="/horoscope">
          <Helmet>
            <title>Fitness</title>
            <meta name="title" content="Fitness" />
            <meta name="description" content="Body fitness makes life better" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <HoroscopeForm />
        </Route>
        <Route path="/careers">
          <Helmet>
            <title>Careers at Wedlite</title>
            <meta name="title" content="Careers at Wedlite" />
            <meta name="description" content="Want to be part of wedlite, follow the steps to get more information" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
        <Layout
          showSearchBar={false}
        >
          <center>
          <div className="container" style={{ width: '70%', flex: 1, flexDirection: 'column', height: window.innerHeight, paddingTop: 100}}>
            <div>
              <h1>Our Hiring <span style={{fontWeight: 'bold'}}>Process</span></h1>
            </div>
            
            <h5>
            At Wedlite , we're looking for hard working and passionate people to help us gift joy and happiness to many in India. Just follow the steps below and be the part of young and enthusiastic team of Wedlite
            </h5>
            <h5>
              A 3-Step Process to Grow with WedLite
            </h5>
            <div style={{flex: 1, display: 'flex'}}>
              <div style={{flex: 1/3, padding: 10}}>
                <span className="dot">1</span>                  
                <h2>Send your Resume</h2>
                <h5>
                  Upload your updated resume with desired qualifications. Passion is utmost requirement.
                </h5>
              </div>
              <div style={{flex: 1/3, padding: 10}}>
                <span className="dot">2</span>
                <h2>Interview</h2>
                <h5>                
                  Short listed candidates will be approached by recruiter team through mail or call.
                </h5>
              </div>
              <div style={{flex: 1/3, padding: 10}}>
                <span className="dot">3</span>
                <h2>You are hired</h2>
                <h5>
                Finally, In-person interview with the management commitee to assure the compatibility of role as per your interests and necessity of team Wedlite.
                </h5>
              </div>
            </div>
            <h5 style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
              Please write us at carrer@wedlite.in with your CV to get more information about career at wedlite.in .
            </h5>
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
          <Helmet>
            <title>Wedlite</title>
            <meta name="title" content="Wedlite" />
            <meta name="description" content="Wedding planning platform" />
            <link rel="canonical" href={window.location.href} />
          </Helmet>
          <Home />
        </Route>
        <Route component={NoMatchPage} />
      </Switch>
    </Router>
  );
}
