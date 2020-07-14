import React, { useEffect, useState } from 'react'
import Layout from '../Layout';
import { VENUE_CATEGORY_CITY } from '../../urls';
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import { Segment } from 'semantic-ui-react'
import './Profile.css';
import {  toast } from 'react-toastify';
import StarRatings from 'react-star-ratings';
import { Card } from 'react-bootstrap';
import paragraph from '../../assets/paragraph.png'


const Profile = (props) => {
  const history = useHistory();
  const { auth } = props;
  const [venues, updateVenus] = useState([]);
  const [nextUrl, updateNextUrl] = useState('');
  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }
  const fetchData = (url) => {
    fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            updateNextUrl(json.next);
            updateVenus(searches => searches.concat(json.results))
          })
        } else {
        }
      })
      .catch(() => {
    });
  }
  const getMoreData = () => {
    fetchData(nextUrl);
  }
  useEffect(()=> {
    fetchData(`${VENUE_CATEGORY_CITY}?user=owner`)
  },[])
  
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
                  
                  style={{ marginBottom: 20 ,width: '28rem', borderRadius: 10,elevation: 5, cursor: 'pointer' }}
                  key={index}
                  onClick={() => navigateToPlace(card.place_id)}  
                >
                  { card.display_photo ?
                    <Card.Img 
                      variant="top" 
                      src={ card.display_photo.path} style={{height: 400, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
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
)(Profile);