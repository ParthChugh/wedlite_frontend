import React, { useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import * as LoginActionCreators from '../../actions/loginActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faChevronCircleDown, faPencilRuler } from '@fortawesome/free-solid-svg-icons'
import { bindActionCreators } from 'redux';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import Layout from '../Layout';
import Frame1 from '../../assets/Frame1.png'
import Frame2 from '../../assets/Frame2.png'
import Frame3 from '../../assets/Frame3.png'
import Frame4 from '../../assets/Frame4.png'
import './styles.css';

const Invitation = (props) => {
  const history = useHistory();
  const invitationCards = [
    { image: Frame1, price: 5, id: 1, name: "Olive velvet floral card" },
    { image: Frame2, price: 5, id: 2, name: "Floral design card" },
    { image: Frame3, price: 5, id: 3, name: "Green floral card" },
    { image: Frame4, price: 5, id: 4, name: "Red green floral card" },
    { image: Frame2, price: 5, id: 2, name: "Floral design card" },
    { image: Frame3, price: 5, id: 3, name: "Green floral card" },
    { image: Frame4, price: 5, id: 4, name: "Red green floral card" },
  ]
  return (
    <Layout
      showSearchBar={false}
    >
      <div style={{ backgroundColor: '#F8F8F8' }}>
        <div className="d-flex flex-row " style={{ alignItems: 'center', marginLeft: 20, paddingTop: 20}}>
          <FontAwesomeIcon onClick={() => { }} className="icon-outer font-icon" size={24} icon={faIdCard} size="3x" color="#A63A67" style={{ marginLeft: 20, marginRight: 20 }} />
          <div>
            <div className="text-invitation">
              Select Card Design
            </div>
            <div style={{ color: "#808080" }} className="text-invitation-sub">
              Select any of the card which suitable for your wedding
            </div>
          </div>
        </div>

        <div className="invitation-container" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <div className="heading-invitation">
                Wedding Cards
              </div>
              <p className="sub-heading-invitation">
                Varied type cards of listed below select any of the cards<br /> which suits your wedding theme
              </p>
            </div>

            <div>
              <div className="border-dropdown-container d-flex flex-row" style={{ alignItems: 'center' }}>
                <div className="border-dropdown">
                  Types of card
                </div>
                <div>
                  <FontAwesomeIcon onClick={() => { }} size={24} icon={faChevronCircleDown} size="1x" color="#000000" style={{ margin: 20 }} />
                </div>
              </div>
            </div>

          </div>
          <div className="d-flex flex-row flex-wrap " style={{ marginTop: 20 }}>
            {invitationCards.map(el => (
              <div className="d-flex flex-column" key={el.id} style={{ marginLeft: 20, marginRight: 20, marginTop: 20, }}>
                <img style={{ width: 170, height: 170 }} alt={el.name} src={el.image} />

                <span className="name-invitation">{el.name}</span>
                <span style={{ color: "#A63A67", fontSize: 14 }}>₹ {el.price} per card</span>
                <button
                  className="fill-button"

                  style={{ marginLeft: 10, }}
                  onClick={() => {

                  }}>
                  <span style={{ fontSize: 12 }}>
                    Select card
                    </span>

                </button>
              </div>
            ))}
          </div>
          
        </div>
        <div className="d-flex flex-row " style={{ alignItems: 'center', marginLeft: 20, paddingTop: 20}}>
          <FontAwesomeIcon onClick={() => { }} className="icon-outer font-icon" size={24} icon={faPencilRuler} size="3x" color="#A63A67" style={{ marginLeft: 20, marginRight: 20 }} />
          <div>
            <div className="text-invitation">
                Enter Details
            </div>
            <div style={{ color: "#808080" }} className="text-invitation-sub">
                Enter details which will be displayed over the card 
            </div>
          </div>
        </div>
        <div className="invitation-container" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <div className="heading-invitation">
                Wedding Card Information
              </div>
              <p className="sub-heading-invitation">
                It holds the basic information of the wedding card  which includes <br/>name of the couple , venue , date & time etc 
              </p>
            </div>
          </div>
        </div>
        <div className="invitation-container" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
          <div className="d-flex flex-row justify-content-between">
            <div>
              <div className="heading-invitation">
                Guest Information
              </div>
              <p className="sub-heading-invitation">
              It holds the basic information of the guest who are invited<br/>for the wedding 
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => {
  const { auth } = state;
  return { auth: auth };
};

const mapDispatchToProps = dispatch => {
  return {
    LoginActions: bindActionCreators(LoginActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Invitation);
