import React, {  useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
import '../Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {CART_ITEMS, PAYMENT_GATEWAY} from '../../../urls';
import {bindActionCreators} from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import {useHistory} from 'react-router-dom';
import * as ShopActionsCreator from '../../../actions/shopActions';
import { Segment, Button } from 'semantic-ui-react'
import {connect} from 'react-redux';
import Layout from '../../Layout';
import paragraph from '../../../assets/Spinner.gif'

const Home = (props) =>  {
  const { ShopActions: {getCartItems}, shop, auth } = props;
  const items = shop.get('cart');
  const history = useHistory();
  const [paymentPopUp, updatePyamentPopUp] = useState('')
  const [totalAmount, updateTotalAmount] = useState(0)
  let getTotalAmount = 0;
  const callbackFunction = (json) => {
    json.map((el) => {
      getTotalAmount+= parseFloat((el.quantity * 1.18 * el.product.price).toFixed(2))
    })
    updateTotalAmount(getTotalAmount.toFixed(2))
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
        getCartItems({callbackFunction})
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
  console.log(items.toJS())
  
  return (
    <Layout
      showSearchBar={false}
    >
        <ToastContainer />
        <div className="d-flex flex-column container">
          <div style={{ fontSize: 30, marginTop: 30, marginBottom: 20 }}>
            Your Shopping Cart ( {items.size} item ) :
          </div>
        <div>
      
          {
            items.size > 0 ? 
            <div className="d-flex flex-wrap container">
              <div className="bd-highlight width-container">
                <div className="cart-items-container">
                  {
                    items.map((el) => {
                      return(
                        <div style={{borderRadius: 10, padding: 10 }}>
                          <div className="d-flex cart-container" style={{borderRadius: 10,}}>
                            <img src={el.getIn(['product', 'photos', '0', 'path'])} className="image-cart" />  
                            <div classNmae="d-flex flex-row">
                              <div>
                                <div style={{fontSize: 25, fontWeight: 'bold'}}>{el.getIn(['product', 'name'])}</div>
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
                              <div style={{flexDirection: 'row', display: 'flex' }}>
                                <p>{ el.get('quantity')} x ( {  el.getIn(['product', 'price'])} + 18% GST )  = </p>
                                <p>&nbsp; ₹ { (el.get('quantity') * 1.18 *el.getIn(['product', 'price'])).toFixed(2) }</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div style={{display:'flex', justifyContent: 'flex-end', fontSize: 30}}>
                  Total: ₹ {totalAmount}
                </div>
              </div>
          
              <div className="width-container-place-order align-items-center flex-column">
                <div className="d-flex flex-column cart-items-container" style={{ borderRadius: 10, padding: 10, marginLeft: 20 }}> 
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
                <button 
                  className="blank-button"
                  style={{marginTop: 20, paddingLeft: 20, paddingRight: 20,}}
                  onClick={() => {
                    history.push('/place-order')
                  }}>
                    Place Order
                </button>
              </div>  
            </div>
            : 
            <div className="row space-around" style={{ marginTop: 'auto' }}>
              <div style={{ fontSize: 30, marginTop: 30, marginBottom: 20 }}>
                No Items in the cart
              </div>
            </div>
          }
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
