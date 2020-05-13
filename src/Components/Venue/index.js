import React, { useEffect, useState } from 'react'
import SearchBar from '../common/SearchBar';
import {useHistory, useParams} from 'react-router-dom';
import {  toast } from 'react-toastify';
import { VENUE_CATEGORY_CITY, BASE_URL} from '../../urls'
import StarRatings from 'react-star-ratings';
import { Card } from 'react-bootstrap';
import './Venue.css';


const Venue = () => {
  const data = useParams()
  const history = useHistory();
  const [venues, updateVenus] = useState([]);
  const fetchVenue = () => {
    fetch(`${VENUE_CATEGORY_CITY}?category=${data.categoryId}&location=${data.cityId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            console.log(json);
            updateVenus(json.results);
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
    });
  }
  
  useEffect(() => {
    fetchVenue();
  },[data]);

  const handleSearch = (cityObject, categoryObject) => {
    history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
  }

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }
  return (
    <div className='Venue'>
      <SearchBar
        handleSearch={handleSearch}
      />
      {
      venues.length > 0 ? 
        <div className="row space-around">
          {
            venues.map((card, index) => {
              return(
                <Card 
                  style={{ marginTop: 10,marginBottom: 10 ,width: '28rem', borderRadius: 10,elevation: 5 }}
                  key={index}
                  onClick={() => navigateToPlace(card.place_id)}  
                >
                  {card.photos.length > 0 ?
                    <Card.Img variant="top" src={ `${BASE_URL}${card.photos[0].path}`} style={{height: 400, borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
                  : <div/>
                  }
                  
                  <Card.Body>
                  <StarRatings
                    rating={parseInt(card.rating)}
                    starDimension="20px"
                    starSpacing="10px"
                    numberOfStars={5}
                    name='rating'
                  />
                    <Card.Title>{card.name}</Card.Title>
                    <Card.Text>
                      {card.formatted_address}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )
            }
            )
          }
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