import React, { useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom';
import {  toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { VENUE_CATEGORY_CITY, BASE_URL } from '../../urls'
import './Place.css';

const Venue = () => {
  const data = useParams()
  const history = useHistory();
  const [place, updatePlace] = useState({});
  const fetchPlace = () => {
    console.log(`${VENUE_CATEGORY_CITY}${data.placeId}`);
    fetch(`${VENUE_CATEGORY_CITY}${data.placeId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            console.log(json);
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

  const handleSearch = (cityObject, categoryObject) => {
    history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
  }

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }
  return (
    <div className='Venue'>
      {
        Object.values(place).length > 0 ?
        <div>
          {
          place.photos.length > 0 ?
            <img src={`${BASE_URL}${place.photos[0].path}`} style={{width: '100%', height: 500}} />
          : <div/>
          }
          <div className="container">
            <h1>{place.name}</h1>
            <h5>{place.formatted_address}</h5>
            <StarRatings
              rating={parseInt(place.rating)}
              starDimension="20px"
              starSpacing="10px"
              numberOfStars={5}
              name='rating'
            />
            <p>User Rating Total: {place.user_ratings_total}</p>
          </div>     
        </div>
        : 
        <span>
          Loading
        </span>
      }
    </div>
  )
  
}

export default Venue