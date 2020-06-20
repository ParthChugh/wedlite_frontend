import React, { useState, useEffect, useRef } from 'react';
import {bindActionCreators} from 'redux';
import { useParams } from 'react-router-dom';
import * as ShopActionsCreator from '../../../actions/shopActions';
import { Button } from 'react-bootstrap';
import {PRODUCT_DETAIL,CART_ITEMS} from '../../../urls';
import {connect} from 'react-redux';
// import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import AliceCarousel from 'react-alice-carousel'
import { Segment } from 'semantic-ui-react'
// import {Carousel} from 'react-responsive-carousel';
import Layout from '../../Layout';
import paragraph from '../../../assets/paragraph.png'

const Home = (props) =>  {
  const handleOnDragStart = (e) => e.preventDefault()
  const Carousel = useRef(null);
  const { auth, ShopActions: {getCartItems} } = props;
  const data = useParams();
  const [detail, updateDetail] = useState({});
  const getItem = () => {
    fetch(`${PRODUCT_DETAIL}${data.id}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        response.json().then((json) => {
          updateDetail(json);
        })
      })
      .catch(() => {
    });
  }
  
  const addToCart = () => {
    if(auth.get('isLoggedIn')) {
      fetch(CART_ITEMS, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Token ${auth.getIn([
            'response', 'token'
          ])}`,
        },
        body: JSON.stringify({
          "quantity": 1,
          "product_id": data.id
        })
      })
        .then((response) => {
          console.log(response);
          if(response.status === 201) {
            response.json().then((json) => {
              getCartItems()
              toast('Added')
            })
          } else {
            toast('Some Issue')
          }
          
        })
        .catch(() => {
      });
    } else {
      toast('Please Login')
    }
  }
  const thumbItem = (item, i) => (
    <span key={item} onClick={() => Carousel.slideTo(i)}>
      *{' '}
    </span>
  )

  useEffect(() => {
    getItem()
  },[]);

  return (
    <Layout
      showSearchBar={false}
    >
      <div className="container" style={{ height: '100%', padding: 0 }}>
        <ToastContainer />
        {
          Object.values(detail).length > 0 ?
          <div style={{display:'flex', flexDirection: 'row'}}>
            <div style={{width: '40%'}}>
              { detail.photos.length > 0 &&
              <AliceCarousel 
                items={detail.photos.map((el) => {
                  return(
                    <img alt="detail-image" src={el.path} onDragStart={handleOnDragStart} className="d-block w-100"/>
                  )
                })}
                // mouseTrackingEnabled 
                ref={Carousel}       
              >
              </AliceCarousel>
              }
            </div>
            <div style={{paddingLeft: 30, paddingRight: 30}}>
              <h2>{detail.name}</h2>
              <div>
                <h5>Price: ₹ {detail.price}</h5>
                <h4>Inclusive of all taxes</h4>
                {/* <FontAwesomeIcon icon={faShoppingBasket} size="1x" style={{position: 'absolute', right: 0,margin: 10, opacity: 2}} /> */}
              </div>
            </div>
              <div>
                <Button onClick={addToCart}>
                  Add to Cart
                </Button>
              </div>
            <div>
            </div>     
          </div>
          : 
          <div className="row space-around" style={{ marginTop: 'auto' }}>
            <Segment attached>
              <img alt="loading" src={paragraph} />
            </Segment>
          </div>
          }
      </div>
    </Layout>
  )    
}

const mapStateToProps = (state) => {
  const { shop, auth } = state;
  return { shop, auth };
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
