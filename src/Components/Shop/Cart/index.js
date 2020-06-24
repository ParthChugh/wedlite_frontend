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
  useEffect(() => {
    getCartItems()
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
        getCartItems()
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
      <>
        <ToastContainer />
        <div className="row space-around">
          <div className="row space-around" style={{ marginTop: 'auto' }}>
            <div>
              {
                items.size > 0 ? 
                <div>
                {
                  items.map((el) => {
                    return(
                      <div className="container" style={{flex: 1,display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <h3>{el.getIn(['product', 'name'])}</h3>
                        <div>
                          <div style={{flex: 1,display: 'flex', justifyContent: 'space-between',}}>
                            <p>Quantity:  {el.get('quantity')}</p>
                            <div>
                              <p>Price: {el.getIn(['product', 'price'])}</p>
                            </div>
                          </div>
                          
                          <FontAwesomeIcon onClick={() => deleteItem(el.getIn(['product','id']))} className="font-icon" size={18} icon={faTrash} size="1x" />
                        </div>  
                        
                        <hr/>
                      </div>
                    )
                  })
                }
                <div style={{flex: 1, display: 'flex' ,justifyContent: 'center'}}>
                  <div dangerouslySetInnerHTML={{
                    __html: paymentPopUp
                  }}>

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
      </>
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
