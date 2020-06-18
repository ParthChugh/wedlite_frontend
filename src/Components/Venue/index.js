import React, { useEffect, useState } from 'react'
import {useHistory, useParams } from 'react-router-dom';
import * as LoginActionCreators from '../../actions/loginActions';
import {  toast } from 'react-toastify';
import { VENUE_CATEGORY_CITY} from '../../urls'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Segment, Button } from 'semantic-ui-react'
import { Card } from 'react-bootstrap';
import Loader from 'react-loader-spinner'
import Layout from '../Layout';
import './Venue.css';
import paragraph from '../../assets/paragraph.png'

const Venue = (props) => {
  const { auth, LoginActions: { likeDislikeBusiness } } = props;
  const isLoggedIn = auth.get('isLoggedIn')

  const data = useParams()

  const history = useHistory();
  const [state, updateState] = useState(false);
  const [visible, updateVisible] = useState(false);
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
            updateVisible(false);
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

  const likeUpdate = (placeId, like) => {
    likeDislikeBusiness({placeId, like, callbackFunction})
  }

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }

  const getMoreData = () => {
    updateVisible(true);
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
      <div className="container">
        <h1 style={{marginLeft: 40}}>Search Results</h1>  
        <div className="row space-around">        
          {
            venues.map((card, index) => {
              return(
                <Card 
                  className="card"
                  style={{ marginBottom: 20 ,width: '22rem', borderRadius: 10,elevation: 5, cursor: 'pointer' }}
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
            }
            )
          }
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Loader visible={visible} type="Oval" color='#EA555D' height={80} width={80} />
        </div> 
        
        {
          nextUrl !== null && !visible ?
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button className="see-more-button" onClick={getMoreData}>
              See More
            </button>
          </div> : <div />
        }
      </div>
      : 
      <div className="container">
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
