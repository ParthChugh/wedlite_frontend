import React from 'react';
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
  const {auth} = props;
  const cities = auth.get('cities');
  const history = useHistory();
  const handleSearch = (cityObject, categoryObject) => {
    history.push(`/venue/category/${categoryObject.id}/city/${cityObject.id}`)
  }

  return (
    <Layout
      handleSearch={handleSearch}
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

