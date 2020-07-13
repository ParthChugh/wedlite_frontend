import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import './Shop.css'
import {bindActionCreators} from 'redux';
import {Card} from 'react-bootstrap';
import * as ShopActionsCreator from '../../actions/shopActions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Segment } from 'semantic-ui-react'
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from '../Layout';
import paragraph from '../../assets/paragraph.png'
import diya from './assets/diya.png'
import sketch from './assets/sketch.png'

const Home = (props) =>  {
  const history = useHistory();
    
  return (
    <Layout
      showSearchBar={false}
    >
      <>
      <div className="grid-container">
        <div className="grid-item-1">
          <p className="title">Welcome to WedLite store</p>
        </div>
        <div className="grid-item grid-item-2">
          <p className="item-title">Get Sketched</p>
          <p className="item-desc">Tailor made sketches to revive your walls</p>
          <a className="order-button">Order Now</a>
          <img src={sketch} height="364" width="282"/>
        </div>
        <div className="grid-item grid-item-3">
          <p className="item-title">Exquisite marble articles</p>
          <p className="item-desc">Starting from &#8377; 500</p>
          <a className="order-button" onClick={() => history.push('/shop/products')} >Shop Now</a>
          <img src={diya} height="310" width="352"></img>
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
