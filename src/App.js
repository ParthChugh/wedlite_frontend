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
import Layout from './Components/Layout';
import './App.css';

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
      <div className="text-align-center  color-white" >
        <img src={logo} alt="logo" className="App-logo" />
        <div>
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
    <div style={{marginBottom: 40}}>
      <ToastContainer />
        <div className="row space-around" >
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
                  : "Coming Soon"}
                </Card.Body>
              </Card>
            )
          }
          )}
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

