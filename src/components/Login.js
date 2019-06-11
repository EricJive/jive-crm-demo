import React from 'react';
import MyWindowPortal from './MyWindowPortal';
import { Redirect } from 'react-router';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            showWindowPortal: true
        };

        this.toggleWindowPortal = this.toggleWindowPortal.bind(this);

        this.timerID = null;
    };

    checkForLogin(){

        console.log('Check login hit');

        if (localStorage.getItem('token')){
            this.toggleWindowPortal();
        }
    }


    componentDidMount() {

        this.timerID = setInterval(
            () => this.checkForLogin(), 2000
        );
    }

    componentWillUnmount(){

        clearInterval(this.timerID);
    }

    toggleWindowPortal() {

        this.setState(state => ({
            ...state,
            showWindowPortal: false
        }));
    }
    
    render(){

        if (!this.state.showWindowPortal) {

            console.log('Login Redirecting to settings...')
            return <Redirect to='/settings' />
        }

        else {
            console.log("Login Portal rendered...");
            localStorage.clear();
            return (
                <div className='login'>
                    <p>Logging in...</p>
                    <div className='test'>
                        <MyWindowPortal></MyWindowPortal>
                    </div>
                </div>
            )
        }
        
    }
  
  };

  export default Login;