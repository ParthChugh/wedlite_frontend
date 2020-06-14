import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {bindActionCreators} from 'redux';
import { Card, Carousel } from 'react-bootstrap';
import { useParams,  useHistory} from 'react-router-dom';
import * as ShopActionsCreator from '../../../actions/shopActions';
import {PRODUCT_DETAIL} from '../../../urls';
import {connect} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Segment } from 'semantic-ui-react'
// import {Carousel} from 'react-responsive-carousel';
import Layout from '../../Layout';

const Home = (props) =>  {
  const { shop } = props;
  const history = useHistory();
  const data = useParams();
  const [detail, updateDetail] = useState({});
  const getItem = () => {
    console.log(`${PRODUCT_DETAIL}${data.id}`);
    fetch(`${PRODUCT_DETAIL}${data.id}`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        response.json().then((json) => {
          console.log(json);
          updateDetail(json);
        })
      })
      .catch(() => {
    });
  }
  useEffect(() => {
    getItem()
  },[]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Layout
      showSearchBar={false}
    >
      <div className="container" style={{ height: '100%', padding: 0 }}>
        <ToastContainer />
          {
            Object.values(detail).length > 0 ?
          <div>
              { detail.photos.length > 0 &&
              <Carousel activeIndex={index} onSelect={handleSelect} style={{height: 400, width: '100%'}}>
                {
                  detail.photos.map((el) => (
                    <Carousel.Item>
                      <img 
                        className="d-block w-100"
                        src={el.path} 
                      />
                    </Carousel.Item>
                  ))
                }
              </Carousel>
            }
            <div>
              <h1 style={{marginLeft: 20}} >{detail.name}</h1>
              <div className="row space-between">
                <Card className="flex-container" style={{width:'70%', padding: 22, boxShadow: 0, elevation: 0 }}>
                  <h5>₹ {detail.price}</h5>
                  <h6>{JSON.stringify(detail)}</h6>
                </Card>
              </div>
            </div>     
          </div>
          : 
          <div className="row space-around" style={{ marginTop: 'auto' }}>
            <Segment attached>
              <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment>
          </div>
          }
      </div>
    </Layout>
  )    
}

const mapStateToProps = (state) => {
  const { shop } = state;
  return { shop };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ShopActions: bindActionCreators(ShopActionsCreator, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
