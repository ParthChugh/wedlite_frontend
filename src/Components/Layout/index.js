import React from 'react'
import Header  from '../Header';
import Footer from '../Footer';
import './Layout.css'

const Layout = (props) => {  

  const {
    headerComponent, 
    children, 
    handleSearch, 
    defaultSelectedCity, 
    defaultSelectedCategory,
    showLogo,
    showSearchBar
  } = props;
  return (
    <div style={{ height:"100vh" }}>
      <div>
        <Header
          defaultSelectedCity={defaultSelectedCity}
          defaultSelectedCategory={defaultSelectedCategory}
          handleSearch={handleSearch}
          showLogo={showLogo}
          showSearchBar={showSearchBar}
        >
          {headerComponent}
        </Header>
      </div>
      <div>
        {children}
      </div>
      <Footer />
    </div>
    
  )
}

export default (Layout);
