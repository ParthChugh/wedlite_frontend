import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import {  toast } from 'react-toastify';
import * as LoginActionCreators from '../../actions/loginActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {CITY_LIST_API, CATEGORIES} from '../../urls';
import './SearchBar.css';
const SearchBar = (props) => {
  const [addressDefinitions, updateAddressDefinitions] = useState([]);
  const [addressDefinitionsCategories, updateCategories] = useState([]);
  const [selectedCategory, updateCategory] = useState('');
  const [selectedCity, updateCity] = useState('');
  const { defaultSelectedCity, 
    defaultSelectedCategory, 
    LoginActions: {updateCities}
  } = props;
  
  const fetchCities = () => {
    fetch(CITY_LIST_API, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            updateAddressDefinitions(json);
            updateCities(json);
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {

    });
  }

  const fetchCategories = () => {
    fetch(CATEGORIES, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((json) => {
            updateCategories(json);
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {
    });
  }
  useEffect(() => {
    fetchCities();
    fetchCategories();
  },[]);


  const cityOptions = addressDefinitions.map((element, index) => ({
    key: element.id,
    text: element.city,
    value: element.id,
  }))

  const categoriesData = addressDefinitionsCategories.map((element, index) => ({
    key: element.id,
    text: element.type,
    value: element.id,
  }))


  const handleGoClick = () => {
    if(selectedCity !== '' && selectedCategory !== '') {
      props.handleSearch(selectedCity, selectedCategory);
    }
  }
  
  const updateSelectedCity = (event, data) => { 
    const newData = addressDefinitions.filter(el => el["id"] === data.value); 
    updateCity(newData[0])
  } 

  const updateSelectedCategory = (event, data) => {
    const newData = addressDefinitionsCategories.filter(el => el["id"] === data.value); 
    updateCategory(newData[0])
  } 

  return (
    <div className='searchbar-container'>
      <form onSubmit={e => e.preventDefault()} className="align-items-center">
        <Dropdown 
          className="dropdown"
          placeholder='cities' 
          defaultValue={defaultSelectedCity ? parseInt(defaultSelectedCity) : defaultSelectedCity}
          search selection
          onChange={updateSelectedCity} 
          options={cityOptions} 
        />
        <Dropdown 
          className="dropdown"
          placeholder='Categories' 
          defaultValue={defaultSelectedCategory ? parseInt(defaultSelectedCategory): defaultSelectedCategory}
          search selection
          onChange={updateSelectedCategory} 
          options={categoriesData} 
        />
        {/* <input
          type='text'
          className="searchbar"
          placeholder='Search for gardern, vatika, Banquet halls or a place'
          onChange={handleSearchData}
          value={search} /> */}
        <button
          type='submit'
          className="button"
          onClick={handleGoClick}
          >
          <span>
            Search
          </span>
          </button>
      </form>
    </div>
  )
  
}

const mapStateToProps = state => {
  // const { auth } = state;
  // return { auth };
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
