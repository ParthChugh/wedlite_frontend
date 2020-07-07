import React, {useEffect, useRef, useState} from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import * as LoginActionCreators from './actions/loginActions';
import * as ShopActionsCreators from './actions/shopActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import paragraph from './assets/paragraph.png'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Segment } from 'semantic-ui-react'
import Box from '@material-ui/core/Box';
import {Card} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import 'animate.css/animate.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Layout from './Components/Layout';
import './App.css';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import {
//   faStar, faHeart, faPhone, faEnvelope, faSearch, faUtensils,
//   faThumbsUp, faSortAlphaDown, faUserMinus, faDollarSign, faAngleDoubleRight, faPlus,
//   faConciergeBell, faCommentAlt, faInfoCircle, faShoppingBasket, faTimes, faSpinner, faTruck, faTasks,
// } from '@fortawesome/free-solid-svg-icons';

// library.add(faStar, faHeart, faPhone, faEnvelope, faSearch, faUtensils,
//   faThumbsUp, faSortAlphaDown, faUserMinus, faDollarSign, faAngleDoubleRight, faPlus,
//   faConciergeBell, faCommentAlt, faInfoCircle, faShoppingBasket, faTimes, faSpinner, faTruck, faTasks,)


// function a11yProps(index) {
//   return {
//     id: `full-width-tab-${index}`,
//     'aria-controls': `full-width-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// }));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const App = (props) => {
  const {auth, 
    LoginActions: {fetchPopularVenues, likeDislikeBusiness}, 
    ShopActions: {getItems},
    shop
  } = props;
  const items = shop.getIn(['items', 'results']);
  const theme = useTheme();
  const venue = useRef(null);
  const isLoggedIn = auth.get('isLoggedIn');
  const [state, updateState] = useState(false);
  const [value, setValue] = React.useState(0);

  useEffect(()=> {
    fetchPopularVenues(1);
    getItems(4);
  },[isLoggedIn, state]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

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

  const likeUpdate = (placeId, like) => {
    likeDislikeBusiness({placeId, like, callbackFunction})
  }

  const categories = venues.map(el => {  
    return el.category
  })
  let selectedCategories = [];
  
  if(Object.values(categories).length > 0 && categories.length > 0) {
    selectedCategories = Array.from(new Set(categories.map((s) => s.id)))
    .map((id) => {
      return {
        id,
        category: categories.find(s => s.id === id)
      }
    })
  }

  const goToNextScreen = (id) => {
    history.push(`/shop/${id}`)
  }
  
  return (
    <Layout
      handleSearch={handleSearch}
    >        
      <div style={{marginLeft: 50, marginRight: 50, marginBottom: 40, flex: 1,display: 'flex', flexDirection:'column'}}>
        <ToastContainer />
          {/* <div className="row space-around" >
            {cities.map((card, index) => {
              return ( 
                  <Card 
                    className="app-card" 
                    style={{ marginTop: 10, marginBottom: 10, width: '14rem', borderRadius: 10,elevation: 2 }} 
                    key={index}
                  >
                    <LazyLoadImage
                      variant="top"
                      // className="card-image"
                      style={{height: 250, width: '14rem', borderRadius: 10, opacity: card.is_data_available? 1 : 0.5}}
                      alt="city"
                      effect="blur"
                      src={card.photo} 
                    />
                    
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
          </div> */}
          <div className="popular-selection">
            Popular Selections
          </div>
          <AppBar elevation={0} position="static" color="white">
            <Tabs
              value={value}
              onChange={handleChange}

              aria-label="full width tabs example"
            >
              {selectedCategories.map((data) => {
              return(
                <Tab label={data.category.type} />
                )
              })
              }
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            {selectedCategories.map((data, index) => {
              const selectedVenues = venues.filter(el => el.category.id === data.id);
              return(
                <TabPanel value={value}  index={index} dir={theme.direction}>
                  <div className="row space-around" style={{flexWrap: 'wrap'}} >
                  {
                    selectedVenues.map((card, index) => {
                      return(
                          <Card className="categories" style={{ margin: 10,width: '25%',elevation: 2, cursor: 'pointer' }} key={index}>
                            { card.display_photo ?
                                <LazyLoadImage
                                  variant="top"
                                  onClick={()=> navigateToPlace(card.place_id)}
                                  style={{width: '100%',height: 200, display: 'flex'}}
                                  alt="display photo"
                                  effect="blur"
                                  src={card.display_photo.path} 
                                />
                              : <div />
                            }
                            <Card.Body>
                              <Card.Title onClick={() => navigateToPlace(card.place_id)}>{card.name}</Card.Title>
                              <Card.Text>
                                {card.location.city}, {card.location.state} 
                              </Card.Text>
                              {
                                isLoggedIn && typeof card.likes !== 'undefined' &&
                                <div>
                                  <Button
                                    color='red'
                                    onClick={() => likeUpdate(card.place_id, !card.likes.current_user_likes)}
                                    content={card.likes.current_user_likes ? 'Unlike' : 'Like'}
                                    icon='heart'
                                    label={{ basic: true, color: 'red', pointing: 'left', content: `${card.likes.total}` }}
                                  />
                                </div>
                              }
                            </Card.Body>
                          </Card>
                      )
                    })
                  }
                  </div>
                </TabPanel>
                )
              })
              }
            </SwipeableViews>
            <div>
              <div className="popular-selection">
                From Wedlite Store
              </div>
              <div>
                Articles and gifts as exquisite as you
              </div>
              <>
                <div className="row space-around">
                {
                  items.size > 0 ? items.entrySeq().map((el, index) => {
                    return (
                      <Card 
                        className="app-card" 
                        style={{ margin: 10, width: '21rem', borderRadius: 42,elevation: 2, cursor: 'pointer' }} 
                        onClick={() => goToNextScreen(el[1].get('id'))}
                        key={index}
                      >
                        <LazyLoadImage
                          style={{borderRadius: 42, height: 250,  width: '21rem', opacity: 0.4}}
                          className="card-image"
                          alt="display photo"
                          effect="blur"
                          src={el[1].getIn(['photos', 0,'path'])} 
                        />
                        <Card.Body className="title-shop" style={{position: 'absolute', color: 'white', bottom: 0,right: 0, left: 0,  flex: 1, alignItems: 'center'}}>
                          <div style={{flex: 1,display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center',}}>
                            <Card.Title style={{fontWeight: 'bold'}}>
                              {el[1].getIn(['name'])}                
                            </Card.Title>
                            <div>
                              <div style={{flex: 1, justifyContent: 'center', fontWeight: 'bold'}}>
                                ₹ {el[1].getIn(['price'])}
                              </div>
                            </div>
                            <button 
                              className="common-fill-button" 
                              onClick={() => {
                              }}>
                                Add to Cart
                            </button>              
                          </div>
                        </Card.Body>
                      </Card>
                    )
                  }
                ):
                <div className="row space-around" style={{ marginTop: 'auto' }}>
                    <Segment attached>
                      <img alt="loading" src={paragraph} />
                    </Segment>
                  </div>
                }
                </div>
                </>
            </div>
            <div>
              Realistic portraits tailor-made for you
            </div>
            <div className="align-center">
              <button 
                className="fill-button" 
                  onClick={() => {
                    history.push('/shop')
                  }}>
                    View more on Wedlite store
              </button>
            </div>
            
        </div>
    </Layout>
  );
}

const mapStateToProps = state => {
  const { auth, shop } = state;
  return { auth, shop };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
    ShopActions: bindActionCreators(ShopActionsCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

