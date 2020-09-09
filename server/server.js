const path=require('path');
const fs=require('fs');
const express=require('express');
const React=require('react');
const ReactDOMServer=require('react-dom/server');
import App from '../src/App'
import Login from '../src/Components/Login'
import Cart from '../src/Components/Shop/Cart';
import Place from '../src/Components/Place';
import Venue from '../src/Components/Venue';
import { Provider } from 'react-redux'
import store, { persistor } from "../src/store";
import { PersistGate } from 'redux-persist/integration/react'
import TextPage from '../src/Components/TextPage'
import VendorRegistration from '../src/Components/VendorRegistration'
import Contact from '../src/Components/Contact';
import Profile from '../src/Components/Profile';
import Layout from '../src/Components/Layout';
import UpdateData from '../src/Components/UpdateData';
import VenueLocation from '../src/Components/VenueLocation';
import Shop from '../src/Components/Shop';
import Products from '../src/Components/Shop/Products';
import ShopSingleDetail from '../src/Components/Shop/ShopSingleDetail';

import ConfirmOrder from '../src/Components/Shop/ConfirmOrder';
import PlaceOrder from '../src/Components/PlaceOrder';
import SignUp from '../src/Components/SignUp';

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

const PORT = 8080
const app = express()
const router = express.Router()

const CommonLayout = (props) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        {props.children}
      </React.StrictMode>
    </PersistGate>
  </Provider>
)

const Blog = () => (
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
)

const serverRenderer = (req, res, next, Component) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(
          <CommonLayout>
            <Component />
          </CommonLayout>
        )}</div>`
      )
    )
  })
}

const Career = () => (
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
)
router.use('^/$', (req, res, next) => serverRenderer(req, res, next, () => <App />))
router.use('^/login', (req, res, next) => serverRenderer(req, res, next, () => <Login />))
router.use('^/cart', (req, res, next) => serverRenderer(req, res, next, () => <Cart />))
router.use('^/shop/products', (req, res, next) => serverRenderer(req, res, next, () => <Products />))
router.use('^/shop/:id', (req, res, next) => serverRenderer(req, res, next, () => <ShopSingleDetail />))
router.use('^/ecommerce/payments/confirm', (req, res, next) => serverRenderer(req, res, next, () => <ConfirmOrder />))
router.use('^/shop', (req, res, next) => serverRenderer(req, res, next, () => <Shop />))
router.use('^/terms-and-conditions', (req, res, next) => serverRenderer(req, res, next, () => <TextPage 
  slug="terms-and-conditions"
  />
))
router.use('^/blog', (req, res, next) => serverRenderer(req, res, next, () => <Blog />))
router.use('^/my-venues', (req, res, next) => serverRenderer(req, res, next, () => <Profile />))
router.use('^/about-us', (req, res, next) => serverRenderer(req, res, next, () => <TextPage
  slug="about-us"
/>
))
router.use('^/vendor-registration', (req, res, next) => serverRenderer(req, res, next, () =><VendorRegistration
  slug="about-us"
/>))
router.use('^/place-order', (req, res, next) => serverRenderer(req, res, next, () => <PlaceOrder />))
router.use('^/sign-up', (req, res, next) => serverRenderer(req, res, next, () => <SignUp />))
router.use('^/careers', (req, res, next) => serverRenderer(req, res, next, () => <Career />))
router.use('^/contact-us', (req, res, next) => serverRenderer(req, res, next, () => <Contact />))
router.use('^/venue/place/:placeId/edit', (req, res, next) => serverRenderer(req, res, next, () => <UpdateData />))
router.use('^/venue/place/:placeId', (req, res, next) => serverRenderer(req, res, next, () => <Place />))
router.use('^/venue-by-group/location/:cityId/group/:groupName', (req, res, next) => serverRenderer(req, res, next, () => <VenueLocation />))
router.use('^/venue/category/:categoryId/city/:cityId', (req, res, next) => serverRenderer(req, res, next, () => <Venue />))

// router.use('*', (req, res, next) => serverRenderer(req, res, next, () => <NoMatchPage />))
router.use(
  express.static(path.resolve(__dirname, '..', 'build'))
)


app.use(router)

app.use((req, res, next)  => serverRenderer(req, res, next, () => <NoMatchPage />))

app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})


{/* 
        
  <Route path="">
    <Venue />
  </Route>

  
  <Route component={NoMatchPage} /> 
*/}