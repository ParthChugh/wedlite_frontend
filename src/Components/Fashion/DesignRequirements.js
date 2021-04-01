import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import { useForm } from 'react-hook-form';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import Upload from '../../assets/icons8-upload-64.png'
import './styles.css';

const DesignRequirements = (props) => {
  const history = useHistory();
  const { auth, LoginActions } = props;
  const [state, setState] = useState(3)
  const onPress = (value) => {
    setState(value)
  }


  return (
    <div>
        <div className='requirements-head-content' >What is your requirements in designing the dresses for the selected occassions ? Upload any picture of the dress which is related to your design idea</div>
        <div >
            <div className='requirements-form'>
                <textarea className='requirements' />
                <div className='img-input-requirements'><img src={ Upload }/></div>
            </div>
            <div className='requirements-btn'>
                <button style={{ marginRight:20 }} className='requirements-back-btn' >Back</button>
                <button style={{ marginLeft:20 }} className='requirements-next-btn' onClick={ () => onPress(4) } >Next</button>
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
)(DesignRequirements);
