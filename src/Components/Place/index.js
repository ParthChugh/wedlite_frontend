import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import {  toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import {Carousel} from 'react-responsive-carousel';
import { VENUE_CATEGORY_CITY, BASE_URL } from '../../urls'
import './Place.css';

const Venue = () => {
  const data = useParams() 
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
    <div className='Venue'>
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
          <div className="container">
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