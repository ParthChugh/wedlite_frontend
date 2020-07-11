import React, {  useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import * as LoginActionCreators from '../../actions/loginActions';
import * as ShopActionsCreator from '../../actions/shopActions';
import { useForm } from "react-hook-form";
import { Card } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import { PAYMENT_GATEWAY, ADDRESS_CREATE } from '../../urls';
import {connect} from 'react-redux';
import Layout from '../Layout';
import './PlaceOrder.css';
// import paragraph from '../../assets/paragraph.png'

const PlaceOrder = (props) => {
  const {shop, ShopActions: {getCartItems, createAddress}} = props;
  // const address = shop.get('address').toJS();
  const [addAddressState, updateAddAddressState] = useState(true);
  const [paymentPopUp, updatePyamentPopUp] = useState('')
  const [totalAmount, updateTotalAmount] = useState(0)
  const [paymentMethod, updatePaymentMethod] = useState(null)
  const [pincodeError, updatePincodeError] = useState('');
  
  let getTotalAmount = 0;
  const callbackFunction = (json) => {
    json.map((el) => {
      getTotalAmount+= el.product.price
    })
    updateTotalAmount(getTotalAmount)
  }

  const { handleSubmit, register, errors } = useForm();
  
  const {auth, LoginActions: {uploadPicture, claimBusiness, likeDislikeBusiness}} = props;

  const deliveryAddressCallbackFunction = () => {
    updateAddAddressState(false)
  }

  const onSubmit = values => {
    if(['No Pincode Matched', 'Length of Pincode should be 6 digits'].includes(pincodeError)) {
      return null;
    } else {
      updateAddAddressState(false) 
      createAddress({
        data: {...values, city: pincodeError.split(',')[0], state: pincodeError.split(',')[1], country: "India" },
        callbackFunction: () => deliveryAddressCallbackFunction()
      })
    }
  };


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
      })
      .catch(() => {
    });
  }
  
  useEffect(()=> {
    goToPaymentPage()
    getCartItems({callbackFunction})
  })
  
  return (
    <Layout
      showLogo={false}
      showSearchBar={false}
    >
      <div style={{paddingTop: 50,paddingLeft: 20}}>
        <ToastContainer />
        <div className="row space-around">
          <div>
          <div style={{fontSize: '20px'}}>
            Delivery address
          </div>
          {
            addAddressState ?
              <button 
                className="blank-button" 
                style={{paddingLeft: 10, paddingRight: 10}}
                onClick={() => {
                  updateAddAddressState(false)
                }}>
                  Add Address
              </button> :
              <Card 
                style={{ marginTop: 20,marginBottom: 20, padding: 20,width: '28rem', borderRadius: 10,elevation: 5, cursor: 'pointer' }}
              >
                <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label>Address Line 1</label>
                    <input
                      name="address_line_1"
                      className="form-control"
                      placeholder="Address Line 1"
                      ref={register({
                        required: "Address Line 1 is Required",
                      })}
                    />
                    <span style={{color: 'red'}}>
                      {errors.address_line_1 && errors.address_line_1.message}  
                    </span>
                    
                  </div>
                  <div style={{marginTop: 10}}>
                    <label>Address Line 2</label>
                    <input
                      name="address_line_2"
                      placeholder="Address Line 2"
                      className="form-control"
                      ref={register({
                        required: "Address Line 2 is Required",
                      })}
                    />
                    <span style={{color: 'red'}}>
                      {errors.address_line_2 && errors.address_line_2.message}
                    </span>
                    
                  </div>
                  <div style={{marginTop: 10}}>
                    <label>Landmark</label>
                    <input
                      name="landmark"
                      className="form-control"
                      placeholder="Landmark"
                      ref={register({
                        required: "Landmark is Required",
                      })}
                    />
                    <span style={{color: 'red'}}>
                      {errors.landmark && errors.landmark.message}
                    </span>
                    
                  </div>
                  <div style={{marginTop: 10}}>
                    <label>Pincode</label>
                    <input
                      name="pincode"
                      placeholder="Pincode"
                      className="form-control"
                      onChange={(item) => onChangePinCode(item)}
                      ref={register({
                        required: "Pincode is Required",
                      })}
                    />
                    <span style={{color: 'red'}}>
                      {errors.pincode && errors.pincode.message}
                      <span style={{color: ['No Pincode Matched', 'Length of Pincode should be 6 digits'].includes(pincodeError) ? 'red' : 'green'}}>
                        {pincodeError}
                        </span>
                    </span>
                  </div>
                  <div style={{flex: 1, display: 'flex', justifyContent: 'center', paddingTop: 10 }}>
                    <button 
                      type="submit"
                      className="blank-button" 
                      style={{paddingLeft: 10, paddingRight: 10}}
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </Card>
          }
            
          </div>
          <div style={{flex: 1/3,}}>
            <span>Payment Method</span>
            <div>
              <input type="radio" value={paymentMethod} onChange={() => { updatePaymentMethod('razor') }}/>
              <span>
                Pay with Razor Pay
              </span>
            </div>
          </div>
          {paymentMethod &&
          <div style={{ flex: 1/3, display: 'flex', flexDirection: 'column'}}>
            <div style={{ display: 'flex', flexDirection: 'column', border: '0.5px solid #707070', borderRadius: 10, padding: 10 }}>
              <div style={{fontSize: '20px', fontWeight: 'bold', paddingBottom: 20}}>
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
          }
          </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  const { auth, shop } = state;
  return { auth, shop };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
    ShopActions: bindActionCreators(ShopActionsCreator, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaceOrder);
