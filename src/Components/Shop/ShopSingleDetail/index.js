import React, { useState, useEffect, useRef } from 'react';
import {bindActionCreators} from 'redux';
import { useParams } from 'react-router-dom';
import * as ShopActionsCreator from '../../../actions/shopActions';
import { Button } from 'react-bootstrap';
import { PRODUCT_DETAIL,CART_ITEMS } from '../../../urls';
import {connect} from 'react-redux';
// import {faShoppingBasket} from '@fortawesome/free-solid-svg-icons'
import Pincode from "react-pincode";
import { ToastContainer, toast } from 'react-toastify';
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
      toast('Please Login')
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
    thumbWidth: 100,
    selectedItem:  0,
    interval: 3000,
    transitionTime: 150,
    swipeScrollTolerance: 5,
  });

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
      <div className="container" style={{ height: '100%', paddingTop: 50 }}>
        <ToastContainer />
        {
          Object.values(detail).length > 0 ?
          <div style={{display:'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <div style={{flex: 1/2}}>
              { detail.photos.length > 0 &&
              <Carousel {...getConfigurableProps()}>
                 {
                   detail.photos.map((el) => (
                      <div >
                        <img alt="detail-image" src={el.path} onDragStart={handleOnDragStart} style={{borderRadius: 20}} className="d-block w-100"/>
                      </div>   
                    )
                  )
                 } 
              </Carousel>
              }
            </div>
            <div style={{flex: 1/2, paddingLeft: 30, paddingRight: 30}}>
              <h3 style={{fontWeight: 'bold', marginBottom: 20}}>{detail.name}</h3>
              <div>
                <h3 style={{fontWeight: 'bold', marginBottom: 20}} className="price">₹ {detail.price}</h3>
                <h5 style={{color: '#B6484D', marginBottom: 20}}>+ 18% GST+ </h5>
                <button 
                  style={{ marginBottom: 20}}
                  className="fill-button" 
                  onClick={addToCart}>
                    Add to Cart
                </button>
                <div className="common-size-text">Delivery Options</div>
                <div style={{flexDirection: 'column', flex: 1, display: 'flex'}}>
                  <input style={{height: 50, borderRadius: 10, borderColor: 'gray', paddingLeft: 10}} placeholder="Enter PIN" onChange={(item) => onChangePinCode(item)} />
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
                <h5><span style={{fontWeight: 'bold'}}>Material: </span>{detail.material}</h5>
                <h5 style={{marginBottom: 30}}><span style={{fontWeight: 'bold'}}>Description: </span>{detail.description}</h5>
                {/* <FontAwesomeIcon icon={faShoppingBasket} size="1x" style={{position: 'absolute', right: 0,margin: 10, opacity: 2}} /> */}
                <div style={{flexDirection: 'row', flex: 1, display: 'flex'}}>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20}}>
                    <img style={{height: 50, width: 50}} alt="purchase" src={purchase} />
                    <span>10 days returnable</span>
                  </div>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img style={{height: 50, width: 50}} alt="warrenty" src={warrenty} />
                    <span>1 year warranty</span>
                  </div>
                </div>
              </div>
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
