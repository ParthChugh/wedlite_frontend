import React, { Component, useEffect } from 'react';
// import Navbar from '../components/Navbar';
import './Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {bindActionCreators} from 'redux';
import {Card} from 'react-bootstrap';
import * as ShopActionsCreator from '../../actions/shopActions';
import { Segment } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from '../Layout';

const Home = (props) =>  {
  const { ShopActions: {getItems}, shop } = props;
  const items = shop.getIn(['items', 'results']);
  console.log(items);
  const history = useHistory();
  useEffect(() => {
    getItems()
  },[]);

  const { ShopActions, auth } = props;

  const goToNextScreen = (id) => {
    history.push(`/shop/${id}`)
  }
  
  return (
    <Layout
      showSearchBar={false}
    >
      <>
      <div className="row space-around">
      {
        items.size > 0 ? items.entrySeq().map((el, index) => {
          return (
            <Card 
              className="app-card" 
              style={{ marginTop: 10, marginBottom: 10, width: '21rem', borderRadius: 10,elevation: 2, cursor: 'pointer' }} 
              onClick={() => goToNextScreen(el[1].get('id'))}
              key={index}
            >
              <Card.Img 
                variant="top"
                className="card-image"
                
                style={{borderRadius: 10}}
                src={el[1].getIn(['photos', 0,'path'])} 
              />
              <Card.Body>
                <Card.Title>
                  {el[1].getIn(['name'])}                
                </Card.Title>
                <div>
                ₹ {el[1].getIn(['price'])}
                </div>
              </Card.Body>
            </Card>
          )
        }
      ):
       <div className="row space-around" style={{ marginTop: 'auto' }}>
          <Segment attached>
            <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </div>
      }
      </div>
      </>
    </Layout>
  )    
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return { shop };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ShopActions: bindActionCreators(ShopActionsCreator, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
