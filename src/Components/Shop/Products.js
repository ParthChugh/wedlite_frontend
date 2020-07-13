import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import './Shop.css'
import {bindActionCreators} from 'redux';
import * as ShopActionsCreator from '../../actions/shopActions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Segment } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from '../Layout';
import paragraph from '../../assets/paragraph.png'

const Home = (props) =>  {
  const { ShopActions: {getItems}, shop } = props;
  const items = shop.getIn(['items', 'results']);
  const history = useHistory();
  useEffect(() => {
    getItems()
  },[]);

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
            <div 
              className="card-category"
              style={{ 
                margin: 10, 
                width: '21rem', 
                borderRadius: 5,
                cursor: 'pointer', 
                borderRadius: 20,
              }}  
              key={index}
              onClick={() => goToNextScreen(el[1].get('id'))}  
            >
              <LazyLoadImage
                style={{width: '100%',height: 200, display: 'flex', borderRadius: 20}}
                className="image-category"
                alt="display photo"
                effect="blur"
                src={el[1].getIn(['photos', 0,'path'])} 
              />
              <div style={{paddingLeft: 10}}>
                <div>
                  {el[1].getIn(['name'])}                
                </div>
                <div>
                  <div style={{flex: 1, justifyContent: 'center'}}>
                    ₹ {el[1].getIn(['price'])}
                  </div>
              </div>              
              </div>
            </div>
          )
        }
      ):
       <div className="row space-around" style={{ marginTop: 'auto' }}>
          <Segment attached>
            <img alt="loading" src={paragraph} />
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
