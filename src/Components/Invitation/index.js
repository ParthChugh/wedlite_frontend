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
            <div className='wedding-invitation'>
            <div>
              <div className="heading-invitation">
                Wedding Card Information
              </div>
              <p className="sub-heading-invitation">
                It holds the basic information of the wedding card  which includes <br/>name of the couple , venue , date & time etc
              </p>
            <div>
                <div className='add-event'>
                    <h5 className='heading'>Add Event</h5>
                    <form>
                        <label for='event-name' className='text'>Event Name</label><br/>
                        <select className='event-form' name='event-name'>
                          <option value='Wedding' >Wedding</option>
                          <option value='Reception' >Reception</option>
                          <option value='Sangeet' >Sangeet</option>
                          <option value='Mehendi' >Mehendi</option>
                        </select>
                        <button type='submit' className='event-add-btn' style={{ marginLeft: 40, marginRight: 40 }} backgroundColor='#A63A67'>Add</button>
                      </form>
                  </div>
                <div className='invitation-details'>
                  <h5>Invitation Details</h5>
                  <div><form>
                        <div width='466px'>
                          <label for='couple-name'>Wedding Couple Name</label><br/>
                          <input className='couple-name' name='couple-name' type='text' placeholder='Groom name' />
                          <input className='couple-name' name='couple-name' type='text' placeholder='Bride name' style={{ marginLeft:19, marginRight:0 }}/><br/>
                          <label for='dateNtime'>Date & time</label><br/>
                          <input className='date' name='dateNtime' type='date' placeholder='date here'/>
                          <input className='time' name='dateNtime' type='time' placeholder='time here' style={{ marginLeft: 32, marginRight:0}}/><br/>
                          <label for='venue'>Venue</label><br/>
                          <input className='venue' name='venue' type='text' placeholder='e.g. Hotel Fortune'/><br/>
                          <label for='venue-address'>Venue Address</label><br/>
                          <textarea  className='venue-address' name='venue-address' rows='3' cols='30'></textarea><br/>
                        </div>
                          <button className='submit-btn' type='submit' style={{ marginTop:50, marginLeft:290 }}>Submit</button>
                          <button className='remove-event-btn'>Remove Event</button>
                        </form></div>
                  </div>
                </div>
              </div>
              <div>
                <div className='card-heading' align='center'>Preview of the selected card</div>
                <div className='card-preview'>
                  <img src='src/assets/wedding-card.png'/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="invitation-container" style={{ padding: 20, marginLeft: 40, marginRight: 40, marginTop: 20 }}>
            <div>
              <div className="heading-invitation">
                Guest Information
              </div>
              <p className="sub-heading-invitation">
              It holds the basic information of the guest who are invited<br/>for the wedding
              </p>
              </div>
                <div className='add-guest'>
                  <h5 >Add Guest</h5>
                  <p className='sub-heading-invitation'>Add the guest name with their<br/>contact information</p>
                  <form align='left'>
                    <section>
                      <span className='guest-input-span'>
                        <label className='guest-label' for='guest_name'>Guest Name</label>
                        <input className='guest-input' type='text' name='guest_name' placeholder='Guest Name'/>
                      </span>
                      <span className='guest-input-span'>
                        <label className='guest-label' for='members_invited'>Members Invited</label>
                        <select className='guest-input' name='event-name' placeholder='Select'>
                          <option value='Family' >Family</option>
                          <option value='Couple' >Couple</option>
                          <option value='Single' >Single</option>
                        </select>
                      </span>
                      <span className='guest-input-span'>
                        <label className='guest-label' for='phone_number'>Ph- Number</label>
                        <input className='guest-input' type='text' name='phone_number' placeholder='phone_number'/>
                      </span>
                      <span className='guest-input-span'>
                        <label className='guest-label' for='email'>Email-id</label>
                        <input className='guest-input' type='email' name='email' placeholder='name@example.com' style={{ padding:10 }}/>
                      </span>
                    </section>
                        <button type='submit' className='event-add-btn' style={{ marginLeft: 20, marginRight: 5 }} >Add</button>
                  </form>
                </div>
                <div className='list-container'>
                  <div className='guest-list'>
                    <div className='guest-list-heading'>
                      <div><h5>Guest List</h5>
                      <p className='sub-heading-invitation'>List of guest for the wedding</p></div>
                      <div><button className='delete-btn'>Delete All</button></div>
                    </div>
                    <table className='guest-list-table'>
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
                        <td>+91 994433821</td>
                        <td>dave@gmail.com</td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                  <div className='event-groups'>
                    <h5>Event Groups</h5>
                    <p className='sub-heading-invitation'>Drag & Drop the guest or click Add to option to<br/>add the guest for invitation card.</p>
                    <table className='guest-list-table' style={{ marginLeft:5 }}>
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
// <div className="d-flex flex-row justify-content-between">
