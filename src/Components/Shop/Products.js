import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import './Shop.css'
import {bindActionCreators} from 'redux';
import * as ShopActionsCreator from '../../actions/shopActions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Segment } from 'semantic-ui-react'
import Loader from 'react-loader-spinner'
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from '../Layout';
import { GET_SHOP_DATA } from '../../urls';
import paragraph from '../../assets/Spinner.gif';
import {Helmet} from "react-helmet";

const Home = (props) =>  {
  const urlParams = new URLSearchParams(window.location.search);
  const { ShopActions: {getItems}, shop } = props;
  // const items = shop.getIn(['items', 'results']);
  const [visible, updateVisible] = useState(false);
  const [items, updateItems] = useState([]);
  const [nextUrl, updateNextUrl] = useState('');
  const history = useHistory();
  const getShopItems = (url) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        response.json().then((json) => { 
          updateNextUrl(json.next);
          updateItems(searches => searches.concat(json.results))
          updateVisible(false);
        })
      })
      .catch(() => {
    });
  }

  useEffect(() => {
    if (urlParams.get('material')){
      getShopItems(GET_SHOP_DATA + '?material=' + urlParams.get('material'));
    } else {
      getShopItems(GET_SHOP_DATA);
    }
    return() => {
      console.log('mai yahan par gya')
      updateItems([]);
    }
  },[]);

  const goToNextScreen = (id) => {
    history.push(`/shop/${id}`)
  }

  const getMoreData = () => {
    updateVisible(true);
    getShopItems(nextUrl);
  }
    
  return (
    <Layout
      showSearchBar={false}
    >
      <>
      <div>
        <div className="products-category d-flex flex-row flex-wrap">
          {
            items.length > 0  ? items.map((el, index) => {
              return (  
                <div 
                  className="card-category"
                  style={{ 
                    margin: 10, 
                    borderRadius: 5,
                    cursor: 'pointer', 
                    borderRadius: 20,
                  }}  
                  key={index}
                  onClick={() => goToNextScreen(el.id)}  
                >
                  <LazyLoadImage
                    className="image-category"
                    alt="display photo"
                    effect="blur"
                    src={el.photos[0].path} 
                  />
                  <div style={{paddingLeft: 10}}>
                    <div>
                      <span>
                        {el['name']}                
                      </span>
                    </div>
                    <div>
                      <h2>
                        ₹ {el['price']}
                      </h2>
                  </div>              
                  </div>
                </div>
              )
            }
          ) :
          <div className="row space-around" style={{ marginTop: 'auto' }}>
              <Segment attached>
                <img alt="loading" src={paragraph} />
              </Segment>
            </div>
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
