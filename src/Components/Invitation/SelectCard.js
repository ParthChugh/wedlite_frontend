import React, { useState, useEffect, useRef } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';



const SelectCardView = (props) => {
  const history = useHistory();
  const {setSelectedCard, executeScroll, selectCard, invitationCards,  childrenRef, card} = props;
  console.log('card133113',card)
  console.log('11card133113',invitationCards?.results?.map(el => el.id))
  return (
    <div>
      <div className="d-flex flex-row " style={{ alignItems: 'center', marginLeft: 20, paddingTop: 20 }}>
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

          {/* <div>
            <div className="border-dropdown-container d-flex flex-row" style={{ alignItems: 'center' }}>
              <div className="border-dropdown">
                Types of card
                </div>
              <div>
                <FontAwesomeIcon onClick={() => { }} size={24} icon={faChevronCircleDown} size="1x" color="#000000" style={{ margin: 20 }} />
              </div>
            </div>
          </div> */}

        </div>
        <div className="d-flex flex-row flex-wrap " style={{ marginTop: 20 }}>
          {invitationCards?.results?.map(el => (
            <div className="d-flex flex-column" key={el.id} style={{ marginLeft: 20, marginRight: 20, marginTop: 20, }}>
              <img style={{ width: 170, height: 170 }} alt={el.name} src={el.card_thumbnail_image} />
              <span className="name-invitation">{el.card_name}</span>
              <span style={{ color: "#A63A67", fontSize: 14 }}>₹ {el.product.price} per card</span>
              {card !== el.id ?
                <button
                  className="fill-button"
                  style={{ marginLeft: 10, }}
                  onClick={() => {
                    console.log('el313131', el)
                    selectCard(el.id, history)
                    executeScroll(childrenRef)
                    setSelectedCard(el.id)
                  }}>

                  <span style={{ fontSize: 12 }}>
                    Select card
                    </span>
                </button>
                :
                <button
                  className="blank-button"
                  style={{ marginLeft: 10, marginTop: 10 }}
                  onClick={() => {

                  }}>
                  <span style={{ fontSize: 12 }}>
                    Selected Card
                    </span>
                </button>
              }
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => {
  const { auth, invitation } = state;
  return { auth, invitation: invitation.toJS() };
};

const mapDispatchToProps = dispatch => {
  return {
    InvitationActions: bindActionCreators(InvitationActionsCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectCardView);