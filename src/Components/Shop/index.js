import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import './Shop.css'
import {bindActionCreators} from 'redux';
import * as ShopActionsCreator from '../../actions/shopActions';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from '../Layout';
import diya from './assets/diya.png'
import sketch from './assets/sketch.png'

const Home = (props) =>  {
  const history = useHistory();
    
  return (
    <Layout
      showSearchBar={false}
    >
      <>
      <div className="d-flex flex-column" style={{marginBottom: 20}}>
        <div className="grid-item-1">
          <p className="title">Welcome to WedLite store</p>
        </div>
        <div className="d-flex flex-wrap">
          <div style={{flex: 1, marginRight: 10,marginTop: 10, marginLeft: 10}} className="grid-item row justify-content-between">
            <div style={{flex: 3/4, marginTop: 10}}>
              <p className="item-title">Get Sketched</p>
              <p className="item-desc">Tailor made sketches to revive your walls</p>
              <a className="order-button">Order Now</a>
            </div>
            <div style={{flex: 1/4}}>
              <img src={sketch} style={{height: 400, width: 300}} />
            </div>
          </div>
          <div style={{flex: 1, marginRight: 10,marginTop: 10, marginLeft: 10}} className="grid-item grid-item-3 row">
            <div style={{flex: 3/4, marginTop: 10}}>
              <p className="item-title">Exquisite marble articles</p>
              <p className="item-desc">Starting from &#8377; 500</p>

              <a className="order-button" onClick={() => history.push('/shop/products?material=marble')} >Shop Now</a>
            </div>
            <div style={{flex: 1/4}}>
              <img src={diya} height="310" width="352" />  
            </div>
          </div>
          
        </div>
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex flex-wrap">
          <div style={{flex: 1/2, width: '50em', marginRight: 10, marginLeft: 20}} className="grid-item row justify-content-between">
            <div style={{flex: 3/4, marginTop: 10}}>
            <p className="item-title">Wooden articles</p>
              <p className="item-desc">Starting from &#8377; 500</p>
              <a className="order-button">Order Now</a>
            </div>
            {/* <div style={{flex: 1/4}}>
              <img src={sketch} style={{height: 400, width: 300}} />
            </div> */}
          </div>
          <div style={{flex: 1/2, marginRight: 20, marginLeft: 10, paddingBottom: 10}} className="grid-item grid-item-3 row">
            <div style={{flex: 3/4, marginTop: 10}}>
              <p className="item-title">Epoxy articles</p>
              <p className="item-desc">Starting from &#8377; 500</p>

              <a className="order-button" onClick={() => history.push('/shop/products')} >Shop Now</a>
            </div>
            {/* <div style={{flex: 1/4}}>
              <img src={diya} height="310" width="352" />  
            </div> */}
          </div>
        </div>
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
