import React, { Component } from 'react'
import './SearchBar.css';
class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    }
  }  

  render () {
    const handleSearchData = (e) => {
      this.setState({ search: e.target.value })
    }
  
    const handleGoClick = () => {
      console.log(this.state.search);
      this.props.handleSearch(this.state.search);
    }
    return (
      <div className='searchbar-container'>
        <form onSubmit={e => e.preventDefault()} className="align-items-center">
          <input
            type='text'
            className="searchbar"
            size='100'
            placeholder='Search for gardern, vatika, Banquet halls or a place'
            onChange={handleSearchData}
            value={this.state.search} />
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
}

export default SearchBar