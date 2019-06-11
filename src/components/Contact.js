import React from 'react';
import ClickToCall from './ClickToCall';
import ContactAPI from '../api';

const Contact = (props) => {

    const contact = ContactAPI.get(
        parseInt(props.match.params.number, 10)
    );

    if (!contact) {
        return <div className='contact'>Sorry, but no contact was not found</div>
    }

    return (
        <div className='contact'>
            <h3>Contact Info</h3>
            <p>{contact.firstname} {contact.lastname}</p>  
            <div className="callbox">
                <div className='left'>
                    {contact.phone}
                </div>
                <div className='right'>
                    <ClickToCall dialString={contact.phone}/>
                </div>
            </div>
        </div>
    )  
};

export default Contact;