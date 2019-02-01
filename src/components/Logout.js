import React from 'react';
import { Redirect } from 'react-router';

class Logout extends React.Component {

    constructor(props){
        super(props);
        console.log('Logout hit')
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('lines');
        localStorage.removeItem('selectedLine');
        this.props.toggleLogin();
    };
  
  
    render(){
        console.log("Logout Rendered...");
        return (
            <div className='logout'>
                <Redirect to='/settings' />
            </div>
        )
    }
  
  };
  

  export default Logout;