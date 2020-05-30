import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './SearchBar.css';

const SearchBar = (props) => {
  const {auth} = props;
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
    } else if((typeof defaultSelectedCity !== 'undefined' && typeof defaultSelectedCategory !== 'undefined')) {
      props.handleSearch(selectedCity ? selectedCity : {id: defaultSelectedCity},selectedCategory ? selectedCategory : {id: defaultSelectedCategory});
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
    <div className='searchbar-container'>
      {(cities.length > 0 && categories.length >0) ?
      <form onSubmit={e => e.preventDefault()} className="align-items-center">
        <Dropdown 
          className="dropdown"
          placeholder='Select your City' 
          defaultValue={defaultSelectedCity ? parseInt(defaultSelectedCity) : defaultSelectedCity}
          search selection
          onChange={updateSelectedCity} 
          options={cityOptions} 
        />
        <Dropdown 
          className="dropdown"
          placeholder='Select your Category' 
          defaultValue={defaultSelectedCategory ? parseInt(defaultSelectedCategory): defaultSelectedCategory}
          search selection
          onChange={updateSelectedCategory} 
          options={categoriesData} 
        />
        <button
          type='submit'
          className="button"
          onClick={handleGoClick}
          >
          <span>
            Search
          </span>
          </button>
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
