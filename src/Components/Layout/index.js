import React from 'react'
import Header  from '../Header';
import { MDBContainer, MDBFooter } from "mdbreact";

const Layout = (props) => {  
  const {headerComponent, children} = props;
  return (
    <div>
      <Header>
        {headerComponent}
      </Header>
      {children}
      <MDBFooter color="blue" className="font-small pt-4 mt-4">
        <div className="footer-copyright text-center py-3">
          <MDBContainer fluid >
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.wedlite.in"> WedLite.in</a>
          </MDBContainer>
        </div>
      </MDBFooter>
    </div>
    
  )
}

export default (Layout);
