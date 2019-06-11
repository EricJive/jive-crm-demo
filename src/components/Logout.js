import React from 'react';
import { Redirect } from 'react-router';

class Logout extends React.Component {

    constructor(props){
        super(props);
        console.log('Logout hit')
        localStorage.clear();
        this.props.toggleLogin();
        if (this.props.socketOpen){

            this.props.toggleSocket();
        }
        
    };
  
  
    render(){
        
        return (
            <div className='logout'>
                <Redirect to='/settings' />
            </div>
        )
    }
  
  };
  
  export default Logout;