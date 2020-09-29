import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch, useHistory} from 'react-router-dom';
import {  toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import ImageUploader from "react-images-upload";
import Divider from '@material-ui/core/Divider';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SwipeableViews from 'react-swipeable-views';
import { Segment, Button } from 'semantic-ui-react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import { Card } from 'react-bootstrap';
import {Helmet} from "react-helmet";
import {Carousel} from 'react-responsive-carousel';
import { VENUE_CATEGORY_CITY } from '../../urls'
import Layout from '../Layout';
import './Place.css';
import phone from './icons8-phone.png'
import website from './website.jpg'
import paragraph from '../../assets/Spinner.gif'
import ButtonRB from 'react-bootstrap/Button';

function TabPanel(props) {
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  const { children, value, index, ...other } = props;

  return (
    <div>
      {children}
    </div>
  );
}



const Venue = (props) => {
  const url = useRouteMatch().url;
  const [state, updateState] = useState(false);
  const history = useHistory()
  const {auth, LoginActions: {uploadPicture, claimBusiness, likeDislikeBusiness, fetchPopularVenues}} = props;
  const isLoggedIn = auth.get('isLoggedIn');
  const venues = auth.get('popularVenues');
  const data = useParams() 
  const [place, updatePlace] = useState({});
  const [value, setValue] = React.useState(0);
  const [pictures, setPictures] = useState([]);
  const [guid, setGuid] = useState(0);
  const categories = venues.map(el => {  
    return el.category
  })
  let selectedCategories = [];
  

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }

  if(Object.values(categories).length > 0 && categories.length > 0) {
    selectedCategories = Array.from(new Set(categories.map((s) => s.id)))
    .map((id) => {
      return {
        id,
        category: categories.find(s => s.id === id)
      }
    })
  }
  
  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  const calFn = () => {
    updateState(!state);
  }
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const likeUpdate = (placeId, like) => {
    likeDislikeBusiness({placeId, like, callbackFunction: calFn})
  }
  
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const fetchPlace = () => {
    fetch(`${VENUE_CATEGORY_CITY}${data.placeId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : isLoggedIn ?`Token ${auth.getIn([
          'response', 'token'
        ])}` : ""
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            updatePlace(json);
          })
        } else {
        }
      })
      .catch(() => {
    });
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const getGuid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  };
  
  useEffect(() => {
    fetchPopularVenues(1);
    fetchPlace();
  },[auth.getIn([
    'response', 'token'
  ]), guid, isLoggedIn, state]);

  const getConfigurableProps = () => ({
    showArrows: true,
    showStatus: true,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: true,
    useKeyboardArrows: true,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    thumbWidth: 50,
    selectedItem:  0,
    interval: 3000,
    transitionTime: 150,
    swipeScrollTolerance: 5,
  });

  const callbackFunction = () => {
    const data = getGuid()
    setGuid(data)
  }
  const theme = useTheme();

  const upload = () => {
    pictures[0].map((el, index) => {
      uploadPicture(data.placeId, el, callbackFunction)
    })
    setPictures([]);
  }
  return (
    <Layout
      showLogo={false}
      showSearchBar={false}
    >
      <div>
        <div className="single-shop-container" style={{ height: '100%', paddingTop: 50 }}>
        
         <ToastContainer />
          {
            Object.values(place).length > 0 ?
            <div className="d-flex single-item-shop">
              <div style={{flex: 1/2}}>
                { place.photos.length > 0 &&
                  <Carousel {...getConfigurableProps()}>
                    {
                      place.photos.map((el) => (
                        <div>
                          <img alt="detail-image" src={el.path} style={{borderRadius: 20, backgroundColor: 'white', borderRadius: 0}} className="w-100"/>
                        </div>   
                      )
                    )
                    } 
                  </Carousel>
                }
              </div>
              <div style={{flex: 1/2, paddingLeft: 30, paddingRight: 30}}>
              {
                Object.values(place).length > 0  &&
                <div>
                  <Helmet>
                    <title>{place.name}</title>
                    <meta name="title" content={place.name} />
                    <meta name="description" content={place.website} />
                    <link rel="canonical" href={window.location.href} />
                  </Helmet>
                  <div className="row space-between" style={{padding: 10}}>
                    <h3 style={{fontWeight: 'bold'}}>{place.name}</h3>
                    <p style={{color: '#707070', fontSize: 12}}>{place.formatted_address}</p>
                    {
                      isLoggedIn && place.editable &&
                      <div className="row">
                        <div style={{ marginRight: 20}}>
                          <ButtonRB onClick={() => {history.push(`${url}/edit`)}}>
                            Edit Registered Data
                          </ButtonRB> 
                        </div>
                        <div style={{ marginRight: 20}}>
                        <ButtonRB onClick={() => claimBusiness({placeId: data.placeId})}>
                          Claim your Business
                        </ButtonRB> 
                      </div>
                    </div>
                    }
                  </div>
                  <div className="row space-between">
                    <div className="flex-container" style={{width:'70%', padding: 10, boxShadow: 0, elevation: 0 }}>
                      <h3 style={{ fontColor:"gray", marginBottom: 15, fontSize: 14 }}>About</h3>
                      <h5 style={{ marginTop: 10, fontSize: 12}}>Ratings ({place.user_ratings_total}):</h5>
                      <p><StarRatings
                        rating={parseInt(place.rating)}
                        starDimension="14px"
                        starSpacing="10px"
                        numberOfStars={5}
                        name='rating'
                      /></p>
                      <div className="d-flex flex-row">
                        <img src={phone} alt="logo" style={{height: 30, width: 30}} />
                        <p style={{ fontSize: 12, marginLeft: 10}}>{place.formatted_phone_number || 'Not Available'}</p>
                      </div>
                      <div className="d-flex flex-row">
                      <img src={website} alt="logo" style={{height: 30, width: 30}} />
                      <span style={{marginLeft: 10}}>
                        {place.website ? <a target="blank" href={`${place.website}`}>{place.website}</a> : "Not available"}
                      </span>
                      
                      </div>

                      
                      {
                        isLoggedIn && typeof place.likes !== 'undefined' &&
                        <div>
                          <Button
                            color='red'
                            onClick={() => likeUpdate(place.place_id, !place.likes.current_user_likes)}
                            content={place.likes.current_user_likes ? 'Unlike' : 'Like'}
                            icon='heart'
                            label={{ basic: true, color: 'red', pointing: 'left', content: `${place.likes.total}` }}
                          />
                        </div>
                      }
                    </div>
                    {
                      isLoggedIn && place.editable &&
                      <div>
                        <ImageUploader
                          {...props}
                          withIcon={true}
                          // withPreview={true}
                          onChange={onDrop}
                          imgExtension={[".jpg", ".gif", ".png", ".gif", ".jpeg"]}
                          maxFileSize={5242880}
                        />
                        {
                          pictures.length > 0 &&
                          <div>
                            <Button onClick={() => upload()}>
                              Upload
                            </Button>
                          </div>
                        }   
                      </div>
                    }
                  </div>
              </div>
              }
            </div>
            </div>
            : 
              <div className="row space-around" style={{ marginTop: 'auto',}}>
                <img alt="loading" src={paragraph} />
              </div>
            }
            
            {/* <Tabs
              value={value}
              style={{marginLeft: 20}}
              onChange={handleChange}
              aria-label="full width tabs example"
            >
              {selectedCategories.map((data) => {
                return(
                  <Tab label={data.category.type} />
                  )
                })
              }
            </Tabs> */}
            <Divider />
            <span style={{fontSize: 20, marginLeft: 10}}>People also viewed</span>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              style={{marginTop: 30}}
              onChangeIndex={handleChangeIndex}
            >
              {selectedCategories.map((data, index) => {
                const selectedVenues = venues.filter(el => el.category.id === data.id);
                return(
                  <TabPanel value={value}  index={index} dir={theme.direction}>
                    <div className="d-flex shop-home">
                    {
                      selectedVenues.map((card, index) => {
                        return(
                            <Card className="category" key={index}>
                              { card.display_photo ?
                                  <LazyLoadImage
                                    className="category-card-image"
                                    variant="top"
                                    onClick={()=> navigateToPlace(card.place_id)}
                                    
                                    alt="display photo"
                                    effect="blur"
                                    src={card.display_photo.path} 
                                  />
                                : <div />
                              }
                              <Card.Body>
                                <Card.Title style={{fontSize: 16}} onClick={() => navigateToPlace(card.place_id)}>{card.name}</Card.Title>
                                <Card.Text className="category-card-body">
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
        </div>
        
          </div>
    </Layout>
  )
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
)(Venue);
