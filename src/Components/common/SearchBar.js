import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom'
import './SearchBar.css';

const SearchBar = (props) => {
  const history = useHistory();
  const {auth, executeScroll} = props;
  const cities = auth.get('cities');
  const categories = auth.get('categories');
  const [selectedCategory, updateCategory] = useState('');
  const [selectedCity, updateCity] = useState('');
  const { defaultSelectedCity, 
    defaultSelectedCategory
  } = props;
  
  const cityOptions = cities.map((element, index) => ({
    key: element.id,
    text: element.city,
    value: element.id,
  }))

  const categoriesData = categories.map((element, index) => ({
    key: element.id,
    text: element.type,
    value: element.id,
  }))


  const handleGoClick = () => {
    if((selectedCity !== '' && selectedCategory !== '')) {
      props.handleSearch(selectedCity, selectedCategory);
      executeScroll()
    } else if((typeof defaultSelectedCity !== 'undefined' && typeof defaultSelectedCategory !== 'undefined')) {
      props.handleSearch(selectedCity ? selectedCity : {id: defaultSelectedCity},selectedCategory ? selectedCategory : {id: defaultSelectedCategory});
      executeScroll()
    }
  }
  
  const updateSelectedCity = (event, data) => { 
    const newData = cities.filter(el => el["id"] === data.value); 
    updateCity(newData[0])
  } 

  const updateSelectedCategory = (event, data) => {
    const newData = categories.filter(el => el["id"] === data.value); 
    updateCategory(newData[0])
  } 

  return (
    <div className='d-flex flex-column' >
      {(cities.length > 0 && categories.length >0) ?
      <form className="d-flex justify-content-lg-center flex-column bar-tab" style={{zIndex: 999, paddingLeft: 20}} onSubmit={e => e.preventDefault()}>
        <div className="top-tagline">Wedding</div>
        <div className="tagline"><span>Commission free wedding planning</span></div>
        <div style={{fontSize: 20}}>
          <div className="tagline-info" style={{fontSize: 15}}>Find, compare and book wedding venues<br/> and services hassle-free and commission-free</div>
        </div>
        <div className="d-flex flex-row" style={{ marginTop: 18}}>
          <Dropdown 
            className="dropdown"
            placeholder='Select City' 
            defaultValue={defaultSelectedCity ? parseInt(defaultSelectedCity) : defaultSelectedCity}
            search selection
            onChange={updateSelectedCity} 
            options={cityOptions} 
          />
          <Dropdown 
            className="dropdown"
            placeholder='Select Category' 
            defaultValue={defaultSelectedCategory ? parseInt(defaultSelectedCategory): defaultSelectedCategory}
            search selection
            onChange={updateSelectedCategory} 
            options={categoriesData} 
          />
          <button
            type='submit'
            className="fill-button-let-begin"
            onClick={handleGoClick}
            >
            
            Let's Begin
            
          </button>
        </div>
        {/* { window.innerWidth > 550 &&
          <div>  
            <div style={{marginTop: 40, marginBottom: 40}} className="horizontal-line"><span>OR</span></div>
            <div style={{flex: 1, display: 'flex', justifyContent: 'center'}} className="class-hidden">
              <button 
                className="blank-button"
                style={{padding: 20, borderRadius: 20}}
                onClick={() => {
                  history.push('/shop')
                }}>
                  Shop on Wedlite
              </button>
            </div>
          </div>
        } */}
      </form> : <div />
      }
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
)(SearchBar);
