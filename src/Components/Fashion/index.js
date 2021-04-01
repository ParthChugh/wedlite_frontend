import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import DatePicker from "react-datepicker";
import Check from '../../assets/Group 519.png'
import webshopping from '../../assets/webshopping.png'
import Layout from '../Layout';
import './styles.css';
import Welcome from './Welcome'
import PersonalInfo from './PersonalInfo'
import ChooseOccasion from './ChooseOccasion'
import DesignRequirements from './DesignRequirements'
import Payments from './Payments'

const FashionConsutancy = (props) => {
  const history = useHistory();
  const { auth, LoginActions } = props;
  const [state, setState] = useState(0)
  const onPress = (value) => {
    setState(value)
  }


  return (
    <Layout
      showSearchBar={false}
    >
        <div className='main-container' >
        <div className='sider' >
          <div className='sider-contents'><img src={Check} width='40px' height='40px' onClick={ () => onPress(0) }/> Welcome</div>
          <div className='sider-contents'><img src={Check} width='40px' height='40px' onClick={ () => onPress(1) }/> Personal Information</div>
          <div className='sider-contents'><img src={Check} width='40px' height='40px' onClick={ () => onPress(2) }/> Choose Occasions</div>
          <div className='sider-contents'><img src={Check} width='40px' height='40px' onClick={ () => onPress(3) }/> Design Requirements</div>
          <div className='sider-contents'><img src={Check} width='40px' height='40px' onClick={ () => onPress(4) }/> Payments</div>
        </div>
        { state === 0? <Welcome/> : ''}
        { state === 1? <PersonalInfo/> : ''}
        { state === 2? <ChooseOccasion/> : ''}
        { state === 3? <DesignRequirements/> : ''}
        { state === 4? <Payments/> : ''}
        </div>
    </Layout>
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
)(FashionConsutancy);
