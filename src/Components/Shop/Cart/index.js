import React, {  useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import '../Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {CART_ITEMS, PAYMENT_GATEWAY} from '../../../urls';
import {bindActionCreators} from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import * as ShopActionsCreator from '../../../actions/shopActions';
import { Segment, Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import Layout from '../../Layout';
import paragraph from '../../../assets/paragraph.png'

const Home = (props) =>  {
  const { ShopActions: {getCartItems}, shop, auth } = props;
  const items = shop.get('cart');
  
  const [paymentPopUp, updatePyamentPopUp] = useState('')
  const [totalAmount, updateTotalAmount] = useState(0)
  let getTotalAmount = 0;
  const callbackFunction = (json) => {
    json.map((el) => {
      getTotalAmount+= el.product.price
    })
    updateTotalAmount(getTotalAmount)
  }
  useEffect(() => {
    getCartItems({callbackFunction})
    goToPaymentPage()
  },[]);
  
  const deleteItem = (id) => {
    fetch(CART_ITEMS, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      },
      body: JSON.stringify({
        "product_id": id
      })
    })
      .then((response) => {
        // console.log(response);
        getCartItems({callbackFunction})
        // if(response.status === 204) {
        //   response.json().then((json) => {
        //     console.log(json);
        //     toast('Item removed')
        //   })
        // } else {
        //   toast('Some Issue')
        // }
        
      })
      .catch(() => {
    });
  
  }

  const goToPaymentPage = () => {
    fetch(PAYMENT_GATEWAY, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`,
      }
    })
      .then((response) => {
        response.text().then((json) => {
          updatePyamentPopUp(json);
        })
        // if(response.status === 204) {
        //   response.json().then((json) => {
        //     console.log(json);
        //     toast('Item removed')
        //   })
        // } else {
        //   toast('Some Issue')
        // }
        
      })
      .catch(() => {
    });
  }
  
  return (
    <Layout
      showSearchBar={false}
    >
      <div>
        <ToastContainer />
        <div style={{marginLeft: 20, marginRight: 20}}>
          <div>
            <div>
              {
                items.size > 0 ? 
                <div>
                  <div style={{fontSize: 30, marginTop: 30, marginBottom: 20}}>
                    Your Shopping Cart ( {items.size} item ) :
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row' }}>
                    <div style={{flex: 3/4, marginRight: 20}}>
                      {
                        items.map((el) => {
                          return(
                            <div style={{flex: 1,display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '0.5px solid #707070', borderRadius: 10, padding: 10 }}>
                              <div style={{flex: 1,display: 'flex', justifyContent: 'space-between',alignItems: 'center'}}>
                                <div style={{fontSize: 25, fontWeight: 'bold'}}>{el.getIn(['product', 'name'])}</div>
                                <div>
                                  <p>₹ {el.getIn(['product', 'price'])}</p>
                                </div>
                              </div>
                              <div>
                                <div style={{flex: 1,display: 'flex', justifyContent: 'space-between',}}>
                                  <p>Qty:  {el.get('quantity')}</p>
                                </div>
                                <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                                  <div  style={{color: '#A63A67', paddingRight: 5}}>
                                    <a onClick={() => deleteItem(el.getIn(['product','id']))}>Delete</a>
                                  </div>
                                  <FontAwesomeIcon onClick={() => deleteItem(el.getIn(['product','id']))} className="font-icon" size={18} icon={faTrash} size="1x" />
                                </div>
                              </div>  
                            </div>
                          )
                        })
                      }
                      <div style={{display:'flex', justifyContent: 'flex-end', fontSize: 30}}>
                        Total: ₹ {totalAmount}
                      </div>
                    </div>
                    
                    <div style={{flex: 1/4, display: 'flex', flexDirection: 'column'}}>
                      <div style={{flex: 1, display: 'flex', flexDirection: 'column', border: '0.5px solid #707070', borderRadius: 10, padding: 10 }}>
                        <div style={{fontSize: 25, fontWeight: 'bold', paddingBottom: 20}}>
                          Order details
                        </div>
                        <div style={{display:'flex', justifyContent: 'space-between', paddingBottom: 10}}>
                          <span>Cart Total</span>
                          <span>₹ {totalAmount}</span>
                        </div>
                        <div style={{display:'flex', justifyContent: 'space-between', paddingBottom: 10}}>
                          <span>Discount</span>
                          <span>- 0 %</span>
                        </div>
                        <div style={{display:'flex', justifyContent: 'space-between', paddingBottom: 10}}>
                          <span>Order Total</span>
                          <span>₹ {totalAmount}</span>
                        </div>
                        <div style={{display:'flex', justifyContent: 'space-between', paddingBottom: 10}}>
                          <span>Delivery charges</span>
                          <span style={{color: '#A63A67'}}>FREE</span>
                        </div>
                      </div>
                      <div style={{flex: 1, display: 'flex' ,justifyContent: 'center'}}>
                          <div dangerouslySetInnerHTML={{
                            __html: paymentPopUp
                          }}/>
                        </div>
                      </div>
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

          </div>
        </div>
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
