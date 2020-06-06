import React, {useEffect, useRef, useState} from 'react';
import { ToastContainer } from 'react-toastify';
import * as LoginActionCreators from './actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {faLock} from '@fortawesome/free-solid-svg-icons'
import { Button } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Card} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout';
import './App.css';

const App = (props) => {
  const {auth, LoginActions: {fetchPopularVenues, likeDislikeBusiness}} = props;
  const venue = useRef(null);
  const isLoggedIn = auth.get('isLoggedIn');
  const [state, updateState] = useState(false);

  useEffect(()=> {
    fetchPopularVenues(1);
  },[isLoggedIn, state]);

  const cities = auth.get('cities');
  const venues = auth.get('popularVenues');
  const history = useHistory();
  const handleSearch = (cityObject, categoryObject) => {
    history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
  }

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }

  const callbackFunction = () => {
    updateState(!state);
  }

  const likeUpdate = (placeId) => {
    likeDislikeBusiness({placeId, like: true, callbackFunction})
  }

  return (
    <Layout
      handleSearch={handleSearch}
    >        
      <div className="container" style={{marginBottom: 40}}>
        <ToastContainer />
          <div className="row space-around" >
            {cities.map((card, index) => {
              return (
                <Card 
                  className="app-card" 
                  style={{ marginTop: 10, marginBottom: 10, width: '15rem', borderRadius: 10,elevation: 2 }} 
                  key={index}
                >
                  <Card.Img 
                    variant="top"
                    className="card-image"
                    style={{borderRadius: 10, opacity: card.is_data_available? 1 : 0.5}}
                    src={card.photo} 
                  />
                  {
                    !card.is_data_available && (
                      <FontAwesomeIcon icon={faLock} size="1x" style={{position: 'absolute', right: 0,margin: 10, opacity: 2}} />
                    )
                  }
                  
                  <Card.Body>
                    <Card.Title>
                      {card.city}
                    </Card.Title>
                    {
                    card.is_data_available ? 
                    <div className = "row">
                      <div 
                        style={{paddingLeft: 10,fontWeight: 'bold' , cursor: 'pointer'}}
                        onClick={()=> {history.push(`/venue-by-group/location/${card.id}/group/vendors`)}}>
                          Vendors
                        </div>
                        | 
                        <div 
                          style={{fontWeight: 'bold' , cursor: 'pointer'}} 
                          onClick={()=> {history.push(`/venue-by-group/location/${card.id}/group/venue`)}}
                        >
                          Venue
                        </div>
                    </div>
                    : <div className="coming-soon">Coming Soon!</div>
                    }
                  </Card.Body>
                </Card>
              )
            }
            )}
          </div>
          <div className="row container" style={{alignItems: 'center', flex: 1}}>
            <h3 style={{padding: 10, marginLeft: 20 }}>Popular Vendors and Venues in Udaipur</h3>
          </div>
          <div className="row space-around" ref={venue}>        
            {
              venues.map((card, index) => {
                return(
                  <Card className="app-card" style={{ marginTop: 10, marginBottom: 10, width: '15rem', borderRadius: 10,elevation: 2, cursor: 'pointer' }} key={index}>
                    { card.display_photo ?
                        <Card.Img 
                          onClick={()=> navigateToPlace(card.place_id)}
                          className="card-image"
                          variant="top" 
                          src={card.display_photo.path} style={{borderRadius: 10, minHeight: 300}}
                        />
                      : <div />
                    }
                    <Card.Body>
                      <Card.Title onClick={() => navigateToPlace(card.place_id)}>{card.name}</Card.Title>
                      <Card.Text>
                        {card.formatted_address}
                      </Card.Text>
                      {
                        isLoggedIn && typeof card.likes !== 'undefined' &&
                        <div>
                          <Button
                            color='red'
                            onClick={() => likeUpdate(card.place_id)}
                            content='Like'
                            icon='heart'
                            label={{ basic: true, color: 'red', pointing: 'left', content: `${card.likes.total}` }}
                          />
                        </div>
                      }
                    </Card.Body>
                  </Card>
                )
              }
              )
            }
          </div>  
          <div>
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
        </div>
    </Layout>
  );
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

