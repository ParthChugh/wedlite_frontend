import React from 'react'
import Header  from '../Header';

const Layout = (props) => {  
  const {headerComponent, children} = props;
  return (
    <div>
      <Header>
        {headerComponent}
      </Header>
      {children}
    </div>
    
  )
}

export default (Layout);
