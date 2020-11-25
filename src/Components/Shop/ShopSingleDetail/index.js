import React, { useState, useEffect, useRef } from 'react';
import {bindActionCreators} from 'redux';
import { useParams } from 'react-router-dom';
import * as ShopActionsCreator from '../../../actions/shopActions';
import { Button } from 'react-bootstrap';
import { PRODUCT_DETAIL,CART_ITEMS } from '../../../urls';
import {connect} from 'react-redux';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'
import { Segment } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel';
import Layout from '../../Layout';
import './ShopSingleDetail.css';
import paragraph from '../../../assets/Spinner.gif'
import purchase from '../../../assets/purchase.png'
import warrenty from '../../../assets/warrenty.png'

const Home = (props) =>  {
  const handleOnDragStart = (e) => e.preventDefault()
  // const Carousel = useRef(null);
  const { auth, ShopActions: {getCartItems} } = props;
  const data = useParams();
  const history = useHistory();
  const [detail, updateDetail] = useState({});
  const [pincodeError, updatePincodeError] = useState('');

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

  const goToCart = () => {
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
          if(response.status === 201) {
            response.json().then((json) => {
              console.log(json);
              getCartItems({callbackFunction: () => {}})
              history.push('/cart')
            })
          } else {
            toast('Some Issue')
          }
          
        })
      
    } else {
      // toast('Please Login')
      history.push('/login')
    }
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
          if(response.status === 201) {
            response.json().then((json) => {
              console.log(json);
              getCartItems({callbackFunction: () => {}})
              toast('Added')
            })
          } else {
            toast('Some Issue')
          }
          
        })
        .catch(() => {
      });
    } else {
      // toast('Please Login')
      history.push('/login')
    }
  }
  
  useEffect(() => {
    getItem()
  },[]);

  const getConfigurableProps = () => ({
    showArrows: true,
    showStatus: true,
    showIndicators: true,
    infiniteLoop: true,
    showThumbs: true,
    useKeyboardArrows: true,
    autoPlay: true,
    stopOnHover: true,
    swipeable: true,
    dynamicHeight: true,
    emulateTouch: true,
    thumbWidth: 50,
    selectedItem:  0,
    interval: 3000,
    transitionTime: 150,
    swipeScrollTolerance: 5,
  });

  const capitalize = (str) => {
    let data = ''
    try {
      data = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    } catch(error) {
      console.log(error)
    }
    return data
  }

  const onChangePinCode = (item) => {
    if (item.target.value.length === 6) {      
      fetch(`https://api.postalpincode.in/pincode/${item.target.value}`, {
        method: 'GET', 
      })
        .then((response) => {
          response.json().then((json) => {
            if(json[0].Status === "Success") {
              updatePincodeError(`${json[0].PostOffice[0].Block}, ${json[0].PostOffice[0].State}`)

            } else {
              updatePincodeError('No Pincode Matched')
            }
          })
        })
        .catch(() => {
      });
    } else {
      updatePincodeError('Length of Pincode should be 6 digits')
    }
  }

  return (
    <Layout
      showSearchBar={false}
    >
      <div className="single-shop-container" style={{ height: '100%', paddingTop: 50 }}>
        <ToastContainer />
        {
          Object.values(detail).length > 0 ?
          <div className="d-flex single-item-shop">
            <div style={{flex: 1/2}}>
              { detail.photos.length > 0 &&
              <Carousel {...getConfigurableProps()} style={{borderRadius: 20,}}>
                 {
                   detail.photos.map((el) => (
                      <img alt="detail-image" src={el.path} onDragStart={handleOnDragStart} style={{borderRadius: 20, backgroundColor: 'white'}} className="w-100"/>
                    )
                  )
                 } 
              </Carousel>
              }
            </div>
            <Helmet>
              <title>{detail.name}</title>
              <meta name="title" content={detail.name} />
              <meta name="description" content={capitalize(detail.description)} />
              <link rel="canonical" href={window.location.href} />
            </Helmet>
            <div style={{flex: 1/2, paddingLeft: 30, paddingRight: 30}}>
              <h4 style={{fontWeight: 'bold', marginBottom: 20}}>{detail.name}</h4>
              <div>
                <h5 style={{fontWeight: 'bold', marginBottom: 20}} className="price">₹ {detail.price}</h5>
                <h7 style={{color: '#B6484D', marginBottom: 20}}>+ 18% GST</h7>
                <div className="d-flex flex-row">
                  <button 
                    style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20}}
                    className="fill-button" 
                    onClick={addToCart}>
                      <span>Add to Cart</span>
                  </button>
                  <button 
                    style={{ marginBottom: 20, paddingLeft: 20, paddingRight: 20}}
                    className="fill-button" 
                    onClick={goToCart}>
                      <span>Checkout</span>
                  </button>
                  
                </div>  
                <div style={{flexDirection: 'row', flex: 1, display: 'flex', marginLeft: 10}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20}}>
                      <img style={{height: 30, width: 30}} alt="purchase" src={purchase} />
                      <span>10 days returnable</span>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <img style={{height: 30, width: 30}} alt="warrenty" src={warrenty} />
                      <span>1 year warranty</span>
                    </div>
                  </div>
                <span className="common-size-text">Delivery Options</span>
                <div style={{flexDirection: 'column', flex: 1, display: 'flex'}}>
                  <input style={{height: 40, borderRadius: 10, borderColor: 'gray', paddingLeft: 10}} placeholder="Enter PIN" onChange={(item) => onChangePinCode(item)} />
                  <span style={{color: 'red'}}>{pincodeError}</span>
                </div>
                {/* <Pincode 
                  Container={{ display: 'flex', flex: 1, flexDirection: 'row' }} 
                  cityContainer={{marginLeft: 10, display: 'none' }} 
                  pincodeInput={{height: 50, borderRadius: 10, borderColor: 'gray', paddingLeft: 10}}
                  districtContainer={{marginLeft: 10, display: 'none'}} 
                  stateContainer={{marginLeft: 10, display: 'none'}} 
                /> */}
                <div style={{ marginBottom: 20, color: '#727272'}}>
                  Enter your pincode to check time of delivery & cash on delivery availability
                </div>
                <h5><span style={{fontWeight: 'bold'}}>Material: </span>{capitalize(detail.material)}</h5>
                <h5 style={{marginBottom: 30}}><span style={{fontWeight: 'bold'}}>Description: </span>{capitalize(detail.description)}</h5>
                {/* <FontAwesomeIcon icon={faShoppingBasket} size="1x" style={{position: 'absolute', right: 0,margin: 10, opacity: 2}} /> */}
                {/* <div style={{flexDirection: 'row', flex: 1, display: 'flex'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20}}>
                    <img style={{height: 50, width: 50}} alt="purchase" src={purchase} />
                    <span>10 days returnable</span>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img style={{height: 50, width: 50}} alt="warrenty" src={warrenty} />
                    <span>1 year warranty</span>
                  </div>
                </div> */}
              </div>
            </div>
            <div>
            </div>     
          </div>
          : 
          <div className="row space-around" style={{ marginTop: 'auto' }}>
            <img alt="loading" src={paragraph} />
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
