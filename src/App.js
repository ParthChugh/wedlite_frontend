import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import * as LoginActionCreators from './actions/loginActions';
import * as ShopActionsCreators from './actions/shopActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import paragraph from './assets/Spinner.gif'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Segment } from 'semantic-ui-react'
import { Card } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import 'react-alice-carousel/lib/alice-carousel.css';
import 'animate.css/animate.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Layout from './Components/Layout';
import './App.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const App = (props) => {
  const { auth,
    LoginActions: { fetchPopularVenues, likeDislikeBusiness },
    ShopActions: { getItems },
    shop
  } = props;
  const items = shop.getIn(['items', 'results']);
  const theme = useTheme();
  const venue = useRef(null);
  const history = useHistory();
  useEffect(() => {
    let path = localStorage.getItem('path');
    if(path) {
      localStorage.removeItem('path');
      history.push(path)
    }
  },[])
  const isLoggedIn = auth.get('isLoggedIn');
  const [state, updateState] = useState(false);
  const [value, setValue] = React.useState(0);
  const [categoryHover, setCategoryHover] = React.useState({ show: false, category: -1 });

  const categoriesList = [
    { id: "marble", name: "Exquisite marble articles", subList: [{ name: "" }, {}, {}] },
    { id: "wooden", name: "Wooden articles", subList: [{}, {}, {}] },
    { id: "epoxy", name: "Epoxy articles", subList: [{}, {}, {}] }
  ]

  console.log('process.env.REACT_APP_STORE_ENABLE !== "false"1331', process.env.REACT_APP_STORE_ENABLE !== "false")

  useEffect(() => {
    fetchPopularVenues(1);
    getItems(4);
  }, [isLoggedIn, state]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const cities = auth.get('cities');
  const venues = auth.get('popularVenues');
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
    likeDislikeBusiness({ placeId, like, callbackFunction })
  }

  const categories = venues.map(el => {
    return el.category
  })
  let selectedCategories = [];

  if (Object.values(categories).length > 0 && categories.length > 0) {
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
      <div className="d-flex flex-column" >
        <ToastContainer />
        <div >
          <div className="popular-selection" >
            Popular Selections
            </div>

          <Tabs
            value={value}
            style={{ marginLeft: 20 }}
            onChange={handleChange}
            aria-label="full width tabs example"
          >
            {selectedCategories.map((data) => {
              return (
                <Tab label={data.category.type} />
              )
            })
            }
          </Tabs>

        </div>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          {selectedCategories.map((data, index) => {
            const selectedVenues = venues.filter(el => el.category.id === data.id);
            return (
              <TabPanel value={value} index={index} dir={theme.direction}>
                <div className="d-flex shop-home">
                  {
                    selectedVenues.map((card, index) => {
                      return (
                        <Card className="category" key={index}>
                          { card.display_photo ?
                            <LazyLoadImage
                              className="category-card-image"
                              variant="top"
                              onClick={() => navigateToPlace(card.place_id)}

                              alt="display photo"
                              effect="blur"
                              src={card.display_photo.path}
                            />
                            : <div />
                          }
                          <Card.Body>
                            <Card.Title style={{ fontSize: 16 }} onClick={() => navigateToPlace(card.place_id)}>{card.name}</Card.Title>
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
        {process.env.REACT_APP_STORE_ENABLE !== "false" &&
          <div>
            <div className="popular-selection">
              From Wedlite Store
            </div>
            <div className="subheading">
              Articles and gifts as exquisite as you
            </div>
            <>
              <div className="d-flex shop-home">
                {
                  items.size > 0 ? items.entrySeq().map((el, index) => {
                    return (
                      <Card
                        className="app-card"
                        onClick={() => goToNextScreen(el[1].get('id'))}
                        key={index}
                      >
                        <LazyLoadImage
                          className="card-image"
                          alt="display photo"
                          effect="blur"
                          src={el[1].getIn(['photos', 0, 'path'])}
                        />
                        <Card.Body className="title-shop" style={{ position: 'absolute', color: 'white', bottom: 0, right: 0, left: 0, flex: 1, alignItems: 'center' }}>
                          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
                            <Card.Title style={{ fontWeight: 'bold' }}>
                              {el[1].getIn(['name'])}
                            </Card.Title>
                            <div>
                              <div style={{ flex: 1, justifyContent: 'center', fontWeight: 'bold' }}>
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
                  ) :
                    <div className="row space-around" style={{ marginTop: 'auto' }}>
                      <Segment attached>
                        <img alt="loading" src={paragraph} />
                      </Segment>
                    </div>
                }
              </div>
            </>
            <div className="align-center">
            <button
              className="fill-button"
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onClick={() => {
                history.push('/shop')
              }}>
              <span>
                View more on Wedlite store
                      </span>

            </button>
          </div>
          </div>

        }

        

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

