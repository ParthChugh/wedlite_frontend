import React, { useEffect, useState } from 'react'
import * as LoginActionCreators from '../../actions/loginActions';
import { toast, ToastContainer } from 'react-toastify';
import { VENUE_CATEGORY_CITY } from '../../urls'
import { useParams } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import { Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap';
import Layout from '../Layout';
import ShowForm from './ShowForm';
import paragraph from '../../assets/paragraph.png'

const VendorRegistration = (props) => {
  
  const { auth } = props;
  const data = useParams() 

  const [place, updatePlace] = useState({});
  const [guid, setGuid] = useState(0);
  
  const fetchPlace = () => {
    fetch(`${VENUE_CATEGORY_CITY}${data.placeId}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`
      }
    })
      .then((response) => {
        if(response.status === 200) {
          response.json().then((place) => {
            updatePlace(place);
          })
        } else {
        }
      })
      .catch(() => {
    });
  }
 
  const getGuid = () => {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  };  
  const callbackFunction = () => {
    const data = getGuid()
    setGuid(data)
  }

  const deletePhoto = (photoId) => {
    fetch(`${VENUE_CATEGORY_CITY}${data.placeId}/photos/${photoId}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Token ${auth.getIn([
          'response', 'token'
        ])}`
      }
    })
      .then((response) => {
        toast("Photo Deleted");
        callbackFunction();
      })
      .catch(() => {
    });
  }

  useEffect(()=> {
    fetchPlace()    
  },[guid]);
  
  return(
    <Layout
      showSearchBar={false}
      showLogo={false}
    >
      <div className="container"  >
        <ToastContainer />
        {Object.values(place).length > 0 ?
        <div>
          <ShowForm 
            place={place}
            placeId={data.placeId}
          />
          <div className="row">
            {
              place.photos.map((photo ,index) => (
                <div key={index} style={{flexDirection: 'column', display: 'flex'}}>
                  <img alt="photo" src={photo.path} style={{height: 100}}/>
                  <Button onClick={() => {
                    const deleteItem = window.confirm('Are you sure you want to delete this?');
                    if (deleteItem === true) {
                      deletePhoto(photo.id)
                    }
                  }}>Delete</Button>
                </div>
              ))
            }
          </div>
        </div> 
        :
        <div className="row space-around" >
          <Segment attached>
            <img alt="loading" src={paragraph} />
          </Segment>
          {/* <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          /> */}
        </div>
        
        }
      </div>
    </Layout>
    
  )
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VendorRegistration);
