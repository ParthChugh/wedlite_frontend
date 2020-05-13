import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import {  toast } from 'react-toastify';
import {CITY_LIST_API, CATEGORIES} from '../../urls';
import './SearchBar.css';
const SearchBar = (props) => {
  const [addressDefinitions, updateAddressDefinitions] = useState([]);
  const [addressDefinitionsCategories, updateCategories] = useState([]);
  const [selectedCategory, updateCategory] = useState('');
  const [selectedCity, updateCity] = useState('');
  
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
            updateAddressDefinitions(json.results);
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
            updateCategories(json.results);
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
          search selection
          onChange={updateSelectedCity} 
          options={cityOptions} 
        />
        <Dropdown 
          className="dropdown"
          placeholder='Categories' 
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

export default SearchBar