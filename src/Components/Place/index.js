import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch, useHistory} from 'react-router-dom';
import {  toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { ToastContainer } from 'react-toastify';
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import ImageUploader from "react-images-upload";
import { Segment, Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { Carousel, Card } from 'react-bootstrap';
// import {Carousel} from 'react-responsive-carousel';
import { VENUE_CATEGORY_CITY } from '../../urls'
import Layout from '../Layout';
import './Place.css';
import paragraph from '../../assets/paragraph.png'
import ButtonRB from 'react-bootstrap/Button';

const Venue = (props) => {
  const url = useRouteMatch().url;
  const [state, updateState] = useState(false);
  const history = useHistory()
  const {auth, LoginActions: {uploadPicture, claimBusiness, likeDislikeBusiness}} = props;
  const isLoggedIn = auth.get('isLoggedIn');
  const data = useParams() 
  const [place, updatePlace] = useState({});
  const [pictures, setPictures] = useState([]);
  const [guid, setGuid] = useState(0);
  
  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  const calFn = () => {
    updateState(!state);
  }

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
          toast("Contact Support")
        }
      })
      .catch(() => {
    });
  }
  
  const getGuid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  };
  
  useEffect(() => {
    fetchPlace();
  },[auth.getIn([
    'response', 'token'
  ]), guid, isLoggedIn, state]);

  
  const callbackFunction = () => {
    const data = getGuid()
    setGuid(data)
  }

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
      <div className="container" style={{ height: '100%', padding: 0 }}>
        <ToastContainer />
          {
            Object.values(place).length > 0 ?
          <div>
              { place.photos.length > 0 &&
              <Carousel activeIndex={index} onSelect={handleSelect} style={{height: 400, width: '100%'}}>
                {
                  place.photos.map((el) => (
                    <Carousel.Item>
                      <img 
                        alt="carousel-image"
                        className="d-block w-100"
                        src={el.path} 
                      />
                    </Carousel.Item>
                  ))
                }
              </Carousel>
            }
            <div>
              <div className="row space-between" style={{padding: 10}}>
                <h1 style={{marginLeft: 20}} >{place.name}</h1>
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
                <Card className="flex-container" style={{width:'70%', padding: 22, boxShadow: 0, elevation: 0 }}>
                  <h2 style={{ fontColor:"gray", textAlign: 'center', marginBottom: 15 }}>About</h2>
                  <h5>Address:</h5>
                  <p>{place.formatted_address}</p>
                  <h5 style={{ marginTop: 10 }}>Ratings ({place.user_ratings_total}):</h5>
                  <p><StarRatings
                    rating={parseInt(place.rating)}
                    starDimension="20px"
                    starSpacing="10px"
                    numberOfStars={5}
                    name='rating'
                  /></p>
                  <h5 style={{ marginTop: 10 }}>Contact:</h5>
                  <p>{place.formatted_phone_number}</p>
                  <h5 style={{ marginTop: 10 }}>Website:</h5>
                  <a target="blank" href={`${place.website}`}>{place.website ? place.website : "Not available"}</a>
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
                </Card>
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
          </div>
          : 
          <div className="row space-around" style={{ marginTop: 'auto' }}>
            <Segment attached>
            <img alt="loading" src={paragraph} />
            </Segment>
            {/* <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            /> */}
          </div>
          }
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
