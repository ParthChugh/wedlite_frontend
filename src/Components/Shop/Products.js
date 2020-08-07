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
import paragraph from '../../assets/Spinner.gif'

const urlParams = new URLSearchParams(window.location.search);
const Home = (props) =>  {
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
    // getItems()
    if (urlParams.get('material')){
      getShopItems(GET_SHOP_DATA + '?material=' + urlParams.get('material'));
    } else {
      getShopItems(GET_SHOP_DATA);
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
        <div className="row space-around">
          {
            items.length > 0  ? items.map((el, index) => {
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
                  onClick={() => goToNextScreen(el.id)}  
                >
                  <LazyLoadImage
                    style={{width: '100%',height: 200, display: 'flex', borderRadius: 20}}
                    className="image-category"
                    alt="display photo"
                    effect="blur"
                    src={el.photos[0].path} 
                  />
                  <div style={{paddingLeft: 10}}>
                    <div>
                      {el['name']}                
                    </div>
                    <div>
                      <div style={{flex: 1, justifyContent: 'center'}}>
                        ₹ {el['price']}
                      </div>
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
