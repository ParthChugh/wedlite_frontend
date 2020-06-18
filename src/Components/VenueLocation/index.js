import React, { useEffect, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import { VENUE_CATEGORY_CITY } from '../../urls'
import StarRatings from 'react-star-ratings';
import { Card } from 'react-bootstrap';
import { Segment } from 'semantic-ui-react'
import Layout from '../Layout';
import paragraph from '../../assets/paragraph.png';

const VenueLocation = () => {
  const data = useParams()
  const history = useHistory();
  const [venues, updateVenus] = useState([]);
  const [nextUrl, updateNextUrl] = useState('');
  const fetchVenue = (url) => {
    fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            updateNextUrl(json.next);
            updateVenus(searches => searches.concat(json.results))
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
    });
  }
  
  useEffect(() => {
    fetchVenue(`${VENUE_CATEGORY_CITY}?location=${data.cityId}&group=${data.groupName}`);
  },[data.groupName, data.cityId]);

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }

  const getMoreData = () => {
    fetchVenue(nextUrl);
  }

  return (
    <Layout
      showLogo={false}
      showSearchBar={false}
    >
      <>
      <h1 style={{marginLeft: 40}}>Search Results</h1>  
      {
      venues.length > 0 ? 
      <div>  
        <div className="row space-around">        
          {
            venues.map((card, index) => {
              return(
                <Card 
                  className="card"
                  style={{ marginBottom: 20 ,width: '28rem', borderRadius: 10,elevation: 5, cursor: 'pointer' }}
                  key={index}
                  onClick={() => navigateToPlace(card.place_id)}  
                >
                  { card.display_photo ?
                    <Card.Img 
                      variant="top" 
                      src={ card.display_photo.path } style={{height: 400, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                    />
                    : <div />
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
        {
          nextUrl !== null ?
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button className="see-more-button" onClick={getMoreData}>
              See More
            </button>
          </div> : <div />
        }
      </div>
      : 
      <div className="row space-around">
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
    </>
    </Layout>
  )
  
}

export default VenueLocation