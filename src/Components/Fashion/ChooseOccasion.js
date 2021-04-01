import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import DatePicker from "react-datepicker";
import Check from '../../assets/check.png'
import Wedding from '../../assets/wedding-couple.png'
import Couple from '../../assets/couple.png'
import Mehendi from '../../assets/mehendi.png'
import Dance from '../../assets/dance.png'
import Haldi from '../../assets/wedding-1.png'
import Layout from '../Layout';
import './styles.css';

const ChooseOccasion = (props) => {
  const history = useHistory();
  const { auth, LoginActions } = props;
  const [state, setState] = useState(2)
  const onPress = (value) => {
    setState(value)
  }


  return (
        <div className='choose-occasion-contents'>
          <div className='occasion-head-content'>What are the occasions you are planning to use the dress we design ?<br/> please select any of them from the below options.</div>
          <div>
            <div className='occasion-select-row-1' >
                <div className='occasion-img-container'><img className='occasion-img' src={ Wedding } alt="logo"/></div>
                <div className='occasion-img-container'><img className='occasion-img' src={ Couple } alt="logo"/></div>
                <div className='occasion-img-container'><img className='occasion-img' src={ Mehendi } alt="logo"/></div><br/>                
            </div>
            <div className='occasion-select-row-2' >
                <div className='occasion-img-container'><img className='occasion-img' src={ Dance } alt="logo"/></div>
                <div className='occasion-img-container'><img className='occasion-img' src={ Haldi } alt="logo"/></div>
            </div>
            <div className='occasion-choose-btn' >
                <button type='submit' style={{ marginRight:20 }} className='occasion-choose-back-btn' >Back</button>
                <button style={{ marginLeft:0 }} className='occasion-choose-next-btn' onClick={ () => onPress(3) } >Next</button>
            </div>
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
)(ChooseOccasion);
