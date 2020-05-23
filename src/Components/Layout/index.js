import React from 'react'
import Header  from '../Header';
import Footer from '../Footer';
import './Layout.css'

const Layout = (props) => {  

  const {headerComponent, children} = props;
  return (
    <div>
      <div className="image-background">
        <Header>
          {headerComponent}
        </Header>
      </div>
      {children}
      <Footer />
    </div>
    
  )
}

export default (Layout);
