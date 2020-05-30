import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import {  toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import RUG from 'react-upload-gallery';
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Carousel} from 'react-responsive-carousel';
import { VENUE_CATEGORY_CITY, BASE_URL } from '../../urls'
import Layout from '../Layout';
import Loader from 'react-loader-spinner'
import './Place.css';

const Venue = (props) => {
  const {auth} = props;
  const isLoggedIn = auth.get('isLoggedIn');
  const data = useParams() 
  const [place, updatePlace] = useState({});
  const fetchPlace = () => {
    fetch(`${VENUE_CATEGORY_CITY}${data.placeId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
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
  
  useEffect(() => {
    fetchPlace();
  },[]);

  return (
    <Layout className='Venue container' 
    showLogo={false}
    showSearchBar={false}
    >
      <div className="row space-around">
        {
          Object.values(place).length > 0 ?
          <div>
            { place.photos.length > 0 ?
            <Carousel>
              {
                place.photos.map((el) => (
                  <div>
                    <img src={`${BASE_URL}${el.path}`} />
                  </div>
                ))
              }
            </Carousel> : <div/>
            }
            {/* {
            place.photos.length > 0 ?
              
            : <div/>
            } */}
            <div className="container row space-between">
              <div >
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
              </div>
              {
                isLoggedIn ?
                <RUG
                  action="/api/upload"
                  onConfirmDelete={() => {
                    return window.confirm('Are you sure you want to delete?')
                  }}
                  // customRequest={(file, data) => customRequest(data)}
                  accept={['jpg', 'jpeg', 'png', 'gif']}
                /> : <div />

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
