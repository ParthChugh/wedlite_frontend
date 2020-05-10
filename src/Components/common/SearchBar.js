import React, { useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import {  toast } from 'react-toastify';
import {CITY_LIST_API} from '../../urls';
import './SearchBar.css';
const SearchBar = (props) => {
  const [addressDefinitions, updateAddressDefinitions] = useState([]);
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
            updateAddressDefinitions(json);
          })
        } else {
          toast("Contact Support")
        }
      })
      .catch(() => {

    });
  }
  useEffect(() => {
    fetchCities()
  },[]);


  const [search, updateSearch] = useState('');  
  const cityOptions = addressDefinitions.map((element, index) => ({
    key: element.id,
    text: element.city,
    value: element.id,
  }))
  
  const handleSearchData = (e) => {
    updateSearch(e.target.value);
  }

  const handleGoClick = () => {
    props.handleSearch(selectedCity);
  }
  
  const updateSelectedCity = (event, data) => {
    const newData = addressDefinitions.filter(el => el[data.value] === el.value);
    updateCity(newData[0].city)
  } 

  return (
    <div className='searchbar-container'>
      <form onSubmit={e => e.preventDefault()} className="align-items-center">
        <Dropdown 
          className="dropdown"
          placeholder='cities' 
          search selection
          onChange={updateSelectedCity} 
          options={cityOptions} />
        <input
          type='text'
          className="searchbar"
          placeholder='Search for gardern, vatika, Banquet halls or a place'
          onChange={handleSearchData}
          value={search} />
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