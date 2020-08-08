import React, { useEffect, useState } from 'react';
import './Shop.css'
import {bindActionCreators} from 'redux';
import * as ShopActionsCreator from '../../actions/shopActions';
import { Segment } from 'semantic-ui-react'
import {useHistory, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Layout from '../Layout';
import paragraph from '../../assets/Spinner.gif'
import {PAYMENT_GATEWAY_SUCCESS} from '../../urls';
import { toast, ToastContainer } from 'react-toastify';

const ConfirmOrder = (props) =>  {
  const { auth, shop } = props;
  // const params = useParams();
  // console.log(params);
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString);
  const [data, updateData] = useState({});
  const history = useHistory();
  const getOrderDetail = () => {
    fetch(PAYMENT_GATEWAY_SUCCESS, {
      method: 'POST', 
      body: JSON.stringify(urlParams.get('order_id')),
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`
      }
    })
      .then((response) => {
        response.json().then((json) => {          
          updateData(json);
          toast(json.result);

        })
      })
      .catch(() => {
    });
  }

  useEffect(() => {
    getOrderDetail();
  },[]);

  return (
    <Layout
      showSearchBar={false}
    >
      <>
        <ToastContainer />
        <div className="row space-around">
        
          {
            Object.values(data).length > 0 ? 
            <div style={{flex: 1,height: window.innerHeight, display: 'flex',alignItems: 'center' , justifyContent: 'center'}}>
              <h1>Page under construction, please return to <Link to="/">Home</Link> Page</h1>
            </div>
            : <Segment attached>
              <img alt="loading" src={paragraph} />
            </Segment>

          }
          
        
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
)(ConfirmOrder);
