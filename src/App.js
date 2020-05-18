import React, {useState} from 'react';
import logo from './logo.png';
import { ToastContainer } from 'react-toastify';
import {BASE_URL} from './urls';
import * as LoginActionCreators from './actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import SearchBar from './Components/common/SearchBar';
import {Card} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { CATEGORY } from './constants';
import Layout from './Components/Layout';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
  const defaultPlace = 'Udaipur'
  const [place, updatePlace] = useState(defaultPlace);
  const {auth} = props;
  const cities = auth.get('cities');
  const categories = auth.get('categories');
  const history = useHistory();
  const handleSearch = (cityObject, categoryObject) => {
    updatePlace(cityObject.city);
    history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
  }

  const LogoSearchBar = () => {
    return (
      <div className="text-align-center margin-top-150 color-white" >
        <img src={logo} alt="logo" className="App-logo" />
        <div>
          <span style={{fontSize: CATEGORY}}>
            Commission free venue booking in  <span className="font-bold ">{place === '' ? defaultPlace: place}</span>
          </span>
          {
            <SearchBar
              handleSearch={handleSearch}
            />
          }           
        </div>
      </div>
    )
  }

  return (
    <Layout
      headerComponent={LogoSearchBar()}
    >        
      <ToastContainer />
      <div className="row space-around" style={{marginLeft: 100, marginRight: 100, marginTop: 50, marginBottom: 50}}>
        {cities.map((card, index) => {
          return (
            <Card style={{ width: '20rem', borderRadius: 10,elevation: 5 }} key={index}>
              <Card.Img variant="top" src={`${BASE_URL}/${card.photo}`} />
              <Card.Body>
                <Card.Title>
                  {card.city}
                </Card.Title>
                
                {card.is_data_available ? 
                <div>
                  <a href="/">Vendors</a> | <a href="/">Venue</a>
                </div>
                : "No Data Available"}
              </Card.Body>
            </Card>
          )
        }
        )}
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

