import React, { useState, useEffect, useRef } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddGuest from './AddGuest'
import EnterDetails from './EnterDetails'
import SelectCardView from './SelectCard'
import GuestList from './GuestList'
import Layout from '../Layout';
import './styles.css';

const Invitation = (props) => {
  const scrollToRef = (ref) => window.scrollTo(
    {
      top: ref.current.offsetTop,
      left: 0,
      behavior: 'smooth'
    }  
  )   
  
  const children = useRef(null)
  const { InvitationActions: { getSelectCard, getCustomEvents, getWeddingCards, selectCard, }, invitation: { invitationCards, events, selectedCard, personalInvitation } } = props;
  const executeScroll = (ref) => scrollToRef(ref)

  
  const [card, setSelectedCard] = useState(null)
  const [weddingEvents, setWeddingEvents] = useState({})

  useEffect(() => {
    setWeddingEvents(events)
  }, [events])

  useEffect(() => {
    setSelectedCard(selectedCard.theme_card)
  }, [selectedCard])

  // const personalInvitation = {
  //   bride_name: "bride",
  //   grand_event: 44,
  //   groom_name: "Groom name",
  //   guest_invitee_name: "guest",
  //   id: 6
  // }


  useEffect(() => {
    getWeddingCards()
    getSelectCard()
  }, [])

  return (
    <Layout
      showSearchBar={false}
    >
      <div style={{ backgroundColor: '#F8F8F8' }}>
        <SelectCardView 
          setSelectedCard={setSelectedCard}
          executeScroll={executeScroll}
          invitationCards={invitationCards}
          selectedCard={selectedCard}
          selectCard={selectCard}
          card={card}
          childrenRef={children}
        />
        <div ref={children}>
          {card && 
          <EnterDetails card={card} weddingEvents={weddingEvents} /> }
        </div>
        <div className="invitation-container flex-column" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
          <div>
            <div className="heading-invitation">
              Guest Information
            </div>
            <p className="sub-heading-invitation">
              It holds the basic information of the guest who are invited<br />for the wedding
            </p>
          </div>
          {card && 
            <AddGuest weddingEvents={weddingEvents}/>
          }
          { 
            card && Object.values(weddingEvents).length > 0 && 
            <GuestList 
              card={card} 
              weddingEvents={weddingEvents}
            />
          }
          
        </div>
      </div>
    </Layout>
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
)(Invitation);
// <div className="d-flex flex-row justify-content-between">
