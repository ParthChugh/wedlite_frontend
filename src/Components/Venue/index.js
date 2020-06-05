import React, { useEffect, useState } from 'react'
import SearchBar from '../common/SearchBar';
import {useHistory, useParams, useRouteMatch} from 'react-router-dom';
import * as LoginActionCreators from '../../actions/loginActions';
import {  toast } from 'react-toastify';
import { VENUE_CATEGORY_CITY, BASE_URL} from '../../urls'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Segment, Button } from 'semantic-ui-react'
import { Card } from 'react-bootstrap';
import Loader from 'react-loader-spinner'
import Layout from '../Layout';
import './Venue.css';

const Venue = (props) => {
  const { auth, LoginActions: { likeDislikeBusiness } } = props;
  const isLoggedIn = auth.get('isLoggedIn')

  const data = useParams()
  const url = useRouteMatch().url;
  const history = useHistory();
  const [state, updateState] = useState(false);
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
    fetchVenue(`${VENUE_CATEGORY_CITY}?category=${data.categoryId}&location=${data.cityId}`);
  },[data.categoryId, data.cityId, state]);

  const handleSearch = (cityObject, categoryObject) => {
    if(data.categoryId !== categoryObject.id || data.categoryId !== cityObject.id) {
      updateVenus([]);
      history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
    }
  }

  const callbackFunction = () => {
    updateState(!state);
  }

  const likeUpdate = (placeId) => {
    likeDislikeBusiness({placeId, like: true, callbackFunction})
  }

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }

  const getMoreData = () => {
    fetchVenue(nextUrl);
  }

  return (
    <Layout
      defaultSelectedCity={data.cityId}
      defaultSelectedCategory={data.categoryId} 
      handleSearch={handleSearch}
      showLogo={false}
    >
      {
      venues.length > 0 ? 
      <div>
        <h1 style={{marginLeft: 40}}>Search Results</h1>  
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
                    {
                        isLoggedIn && typeof card.likes !== 'undefined' &&
                        <div>
                          <Button
                            color='red'
                            onClick={() => likeUpdate(card.place_id)}
                            content='Like'
                            icon='heart'
                            label={{ basic: true, color: 'red', pointing: 'left', content: `${card.likes.total}` }}
                          />
                        </div>
                      }
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
          <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </div>
    }
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
