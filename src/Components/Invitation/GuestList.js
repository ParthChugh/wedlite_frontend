import React, { useState, useEffect, useRef } from 'react'
import * as InvitationActionsCreators from '../../actions/invitationActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import RenderTable from "../common/RenderTable";

const GuestList = (props) => {
  const { weddingEvents, InvitationActions: { getGuestList, updateGuest }, invitation: {  guestList, selectedCard } } = props;
  console.log("weddingEvents1331", weddingEvents)
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('false');
  useEffect(() => {
    getGuestList(selectedCard.id)
  }, [])

  // const guestList = {
  //   "3": [],
  //   "109": [
  //     {
  //       "id": 4,
  //       "guest_name": "gurst name",
  //       "members_invited": "Single",
  //       "phone_number": "8149404001",
  //       "email": "asd@asd.com",
  //       "grand_event": 109,
  //       "event_invited": []
  //     }
  //   ]
  // }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const renderEditable = (props, el, data) => {
    console.log('el133131', props)
    return (
    ['event_invited'].includes(el) ?
      <div>
        {Object.values(weddingEvents).map((element, index) =>
          <div key={index} className='d-flex flex-row'>
            <input type="checkbox" defaultChecked={props.includes(element.id)} onChange={(value) => {
              updateGuest({guest_id: data.id, event_id: element.id}, !value.target.checked)
            }} />
            <span style={{marginLeft: 10}}>{element.name}</span>
          </div>
        )}
      </div>

    :
      <span>{props}</span>
    )
  }
  const deleteItem = (value) => {

    return (
      <FontAwesomeIcon
        onClick={() => {
          openModal(value)
          setSelectedId(value)
        }}
        className="icon-outer font-icon"
        size={24}
        icon={faTrash}
        size="3x"
        color="#A63A67"
        style={{ marginLeft: 20, marginRight: 20 }}
      />
    )
  }
  const updatedColumn = (data) => {
    return [...Object.keys(data).map((el, index) => {
      return {
        Header: capitalize(`${el.replace('_', ' ')}`),
        accessor: (d) => d[el],
        Cell: ({ value }) => renderEditable(value, el, data)
      };
    }),
    {
      Header: "Action",
      accessor: (d) => d['id'],
      Cell: ({ value }) => (deleteItem(value))
    }];
  }

  function openModal(value) {
    setIsOpen(true);
    console.log('value133113', value)
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      alignItems: 'center'
    }
  };

  const deleteGuest = (id) => {
    console.log('selectedId', id)

  }
  return (
    <div className='list-container flex-wrap'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <div>
          <span>Do you want to delete this guest?</span>
          <div className="d-flex flex-row" >
            <button className="fill-button" style={{ paddingLeft: 20, paddingRight: 20, }} onClick={() => deleteGuest(selectedId)}>
              <span>
                Yes
            </span>
            </button>
            <div style={{ marginTop: 10 }}>
              <button
                className="blank-button"
                style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 3, paddingBottom: 3 }}
                onClick={closeModal}
              >
                <span>
                  No
              </span>

              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className='guest-list'>
        <div className='guest-list-heading'>
          <div><h5>Guest List</h5>
            <p className='sub-heading-invitation'>List of guest for the wedding</p>
          </div>
          {
          guestList[selectedCard.id]?.length > 0 && 
            <div>
              <button className='delete-btn'>
                Delete All
              </button>
            </div>
          }

        </div>
        {
        guestList[selectedCard.id]?.length > 0 ?
          <RenderTable
            columns={updatedColumn(guestList[selectedCard.id][0])}
            data={guestList[selectedCard.id]}
            showPagination={false}
            showFilter
            header={"Guest"}
            showTableToolbar
          />  
        : 
        <span>No Guest Invited</span>
      }
        
        {/* <table className='guest-list-table'>
          <thead>
            <th>S. no.</th>
            <th>Name </th>
            <th>Ph-number</th>
            <th>Email-id</th>
            <th>Action</th>
            <th>Add to</th>
          </thead>
          <tr>
            <td>1.</td>
            <td>Maddy</td>
            <td>+91 993344723</td>
            <td>maddy@gmail.com</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Dave</td>
            <td>+91 994433821</td>dd
                <td>dave@gmail.com</td>
            <td></td>
            <td></td>
          </tr>
        </table> */}
      </div>
      <div className='event-groups'>
        <h5>Event Groups</h5>
        <p className='sub-heading-invitation'>Drag & Drop the guest or click Add to option to<br />add the guest for invitation card.</p>
        <table className='guest-list-table' style={{ marginLeft: 5 }}>
          <thead>
            <th>S. no.</th>
            <th>Name </th>
            <th>Ph-number</th>
            <th>Email-id</th>
            <th>Action</th>
          </thead>
          <tr>
            <td>1.</td>
            <td>Maddy</td>
            <td>+91 993344723</td>
            <td>maddy@gmail.com</td>
            <td></td>
          </tr>
        </table>
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
)(GuestList);