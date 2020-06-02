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
    <React.Fragment>
        <Header
          defaultSelectedCity={defaultSelectedCity}
          defaultSelectedCategory={defaultSelectedCategory}
          handleSearch={handleSearch}
          showLogo={showLogo}
          showSearchBar={showSearchBar}
        >
          {headerComponent}
        </Header>
      <div style={{ marginTop: 70, minHeight: '100vh' }}>
        {children}      
      </div>
      
      <Footer />
    </React.Fragment>
  )
}

export default (Layout);
