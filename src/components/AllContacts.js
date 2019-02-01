import React from 'react';
import { Link } from 'react-router-dom';
import ContactAPI from '../api';

class AllContacts extends React.Component {
    
    render() {
      return (
        <div className="allContacts">
          <h3>Contacts</h3>
          <ul>
              {
                  ContactAPI.all().map(p => (
                      <li key={p.contactId}>
                        <Link to={`/contact/${p.contactId}`}>{p.lastname}, {p.firstname}</Link>
                      </li>
                  ))
              }
          </ul>
        </div>
      )
    };
  
  };

  export default AllContacts;