import React from 'react';
import MyWindowPortal from './MyWindowPortal';
import { Redirect } from 'react-router';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showWindowPortal: false
        };

        this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    };


    componentDidMount() {

        console.log('Login Did Mount and main Login state is ');

        if (this.props.isLoggedIn){
            this.toggleWindowPortal();
        }
    }

    toggleWindowPortal() {
        console.log('Toggle Window hit')
        this.setState(state => ({
            ...state,
            showWindowPortal: !state.showWindowPortal,
        }));
    }
    
    render(){

        console.log('Login render method called');

        if (localStorage.getItem('token')) {

            console.log('Login Redirecting to settings...')
            return <Redirect to='/settings' />
        }

        else {
            console.log("Login Portal rendered...");
            return (
                <div className='login'>
                    <div className='test'>
                        <MyWindowPortal></MyWindowPortal>
                    </div>
                </div>
            )
        }
        
    }
  
  };

  export default Login;