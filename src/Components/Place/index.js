import React, { useEffect, useState } from 'react'
import { useParams, useRouteMatch, useHistory} from 'react-router-dom';
import {  toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { ToastContainer } from 'react-toastify';
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import ImageUploader from "react-images-upload";
import {connect} from 'react-redux';
import { Carousel } from 'react-bootstrap';
// import {Carousel} from 'react-responsive-carousel';
import { VENUE_CATEGORY_CITY, BASE_URL } from '../../urls'
import Layout from '../Layout';
import Loader from 'react-loader-spinner'
import './Place.css';
import { Button } from 'react-bootstrap';

const Venue = (props) => {
  const url = useRouteMatch().url;
  const history = useHistory()
  const {auth, LoginActions: {uploadPicture}} = props;
  const isLoggedIn = auth.get('isLoggedIn');
  const data = useParams() 
  const [place, updatePlace] = useState({});
  const [pictures, setPictures] = useState([]);
  const [guid, setGuid] = useState(0);
  
  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

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
  ]), guid, isLoggedIn]);

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
      <div className="Venue container" style={{ minHeight: '100vh', padding: 0 }}>
        <ToastContainer />
<<<<<<< HEAD
        <div className="row space-around">
          {
            Object.values(place).length > 0 ?
            <div>
              { place.photos.length > 0 ?
              <Carousel activeIndex={index} onSelect={handleSelect} style={{height: 400, width: '100%'}}>
                {
                  place.photos.map((el) => (
                    <Carousel.Item>
                      <img 
                        className="d-block w-100"
                        src={el.path} 
                      />
                    </Carousel.Item>
                  ))
                }
              </Carousel>
               : <div/>
            }
            <div className="row space-between">
              <h1>{place.name}</h1>
              <h3>{place.category.type}</h3>
              <h5>{place.formatted_address}</h5>
              <StarRatings
                rating={parseInt(place.rating)}
                starDimension="20px"
                starSpacing="10px"
                numberOfStars={5}
                name='rating'
              />
              <p>User Rating Total: {place.user_ratings_total}</p>
              <p>Phone Number: {place.formatted_phone_number}</p>
              Website: <a target="blank" href={`${place.website}`}>{place.website}</a>
              
              {
                isLoggedIn && place.editable &&
                <div style={{flex: 0.25}}>
                  <Button onClick={() => {history.push(`${url}/edit`)}}>
                    Edit Registered Data
                  </Button>
                  <ImageUploader
                    {...props}
                    withIcon={true}
                    // withPreview={true}
                    onChange={onDrop}
                    imgExtension={[".jpg", ".gif", ".png", ".gif"]}
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
          : 
          <div className="row space-around" >
            <Loader
              type="Puff"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
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
