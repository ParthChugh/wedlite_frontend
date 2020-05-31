import React, {useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import {BASE_URL} from './urls';
import * as LoginActionCreators from './actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {faCheck, faLock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Card} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Components/Layout';
import './App.css';

const App = (props) => {
  const {auth, LoginActions: {fetchPopularVenues}} = props;
  useEffect(()=> {
    fetchPopularVenues(1);
  },[]);


  const cities = auth.get('cities');
  const venues = auth.get('popularVenues');
  const history = useHistory();
  const handleSearch = (cityObject, categoryObject) => {
    history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
  }

  const navigateToPlace = (placeId) => {
    history.push(`/venue/place/${placeId}`)
  }

  return (
    <Layout
      handleSearch={handleSearch}
    >        
      <div className="container" style={{marginBottom: 40}}>
        <ToastContainer />
          <div className="row space-around" >
            {cities.map((card, index) => {
              return (
                <Card 
                  className="app-card" 
                  style={{ marginTop: 10, marginBottom: 10, width: '15rem', borderRadius: 10,elevation: 2, opacity: card.is_data_available? 1 : 0.5 }} 
                  key={index}
                >
                  <Card.Img 
                    variant="top"
                    style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} 
                    src={`${BASE_URL}/${card.photo}`} 
                  />
                  {
                    !card.is_data_available && (
                      <FontAwesomeIcon icon={faLock} size="1x" style={{position: 'absolute', right: 0,margin: 10, opacity: 2}} />
                    )
                  }
                  
                  <Card.Body>
                    <Card.Title>
                      {card.city}
                    </Card.Title>
                    {
                    card.is_data_available ? 
                    <div>
                      <a href="/">Vendors</a> | <a href="/">Venue</a>
                    </div>
                    : <div className="coming-soon">Coming Soon!</div>
                    }
                  </Card.Body>
                </Card>
              )
            }
            )}
          </div>
          <div className="row container" style={{alignItems: 'center', flex: 1}}>
            <h3 style={{padding: 10, marginLeft: 20 }}>Popular Vendors and Venues in Udaipur</h3>
            <div style={{flex: 1, justifyContent: 'flex-end', display: 'flex', alignItems: 'center'}}>
              <FontAwesomeIcon icon={faCheck} size="xs" style={{marginLeft: 5, marginRight: 5, color: 'green'}} />
              Featured
            </div>
          </div>
          
          <div className="row space-around">        
          
          {
            venues.map((card, index) => {
              return(
                <Card className="app-card" style={{ marginTop: 10, marginBottom: 10, width: '15rem', borderRadius: 10,elevation: 2 }} key={index}
                  onClick={() => navigateToPlace(card.place_id)}  
                >
                  { card.display_photo ?
                    <Card.Img 
                      variant="top" 
                      src={ `${BASE_URL}${card.display_photo.path}`} style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, minHeight: 200}}
                    />
                    : <div />
                  }
                  <Card.Body>
                    <Card.Title>{card.name}</Card.Title>
                    <p>
                      {card.formatted_address}
                    </p>
                  </Card.Body>
                </Card>
              )
            }
            )
          }
        </div> 
      </div>
    </Layout>
  );
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
)(App);

