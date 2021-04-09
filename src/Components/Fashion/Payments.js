import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import DatePicker from "react-datepicker";
import Check from '../../assets/check.png'
import card from '../../assets/Icon awesome-credit-card.png'
import mobile from '../../assets/Icon material-phone-iphone.png'
import Layout from '../Layout';
import './styles.css';

const Payments = (props) => {
  const history = useHistory();
  const { auth, LoginActions } = props;
  const [state, setState] = useState(0)
  const onPress = (value) => {
    setState(value)
  }


  return (
    <div className='payments'>
        <div className='payment-head-content' >Payments Method</div>
        <div className='payment-head2-content'>Please select any one of the payment method to complete the form successfully</div>
        <div className='payment-total'>
          <div className='payment-title'>Consultation Fee :</div>
          <div className='payment-amount'>₹1000</div>
        </div>
        <div className='payment-type-container'>
          <div className='payment-type'>
            <div className='payment-type-title'>Select payment type :</div><hr/>
            <div className='payment-type-options'>
              <div className='card-fashion'><div>Credit Card</div></div>{/*<img className='card-img' src={card}/>*/}
              <div className='card-fashion'><div>Debit Card</div></div>{/*<img className='card-img' src={card}/>*/}
              <div className='card-fashion'><div>UPI</div></div>{/*<img className='card-img' src={mobile}/>*/}
            </div>
          </div>
          <div className='payment-cards'>
            <div className='payment-cards-title'>My Cards :</div><hr/>
          </div>
        </div>
        <div className='payment-btn'>
            <button style={{ marginRight:20 }} className='personal-info-back-btn' >Back</button>
            <button style={{ marginLeft:20 }} className='personal-info-next-btn' onClick={ () => onPress(2) } >Next</button>
        </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth: auth };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payments);
