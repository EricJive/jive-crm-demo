import React, { Component } from 'react';
import logo from '../crm.png';
import '../App.css';
import Contact from './Contact';
import {Switch, Route} from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import AllContacts from './AllContacts';
import Settings from './Settings';
import Home from './Home';
import TestWindow from './TestWindow';
import Logout from './Logout';
import Login from './Login';

class Main extends Component {

    constructor(props){

        super(props);

        this.state = {
            loggedIn : false
        };

        this.child = React.createRef();

        this.toggleLogin = this.toggleLogin.bind(this);
    };

    toggleLogin() {
        console.log('Main Toggle Login function hit and current state is ' + this.state.loggedIn);
        
        this.setState({loggedIn: !this.state.loggedIn}, function () {
            console.log('Logged In state is now '+ this.state.loggedIn);
        });

    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <div className='links'>
                    <Link to='/'>Home</Link>
                    <div className='divider'/>
                    <Link to='/contacts'>Contacts</Link>
                    <div className='divider'/>
                    <Link to='/settings'>Settings</Link>
                    </div>
                </header>
                <div className='main'>
                    <Switch> 
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/contacts' component={AllContacts}/> 
                        <Route 
                            exact path='/settings' 
                            render={(props) => <Settings {...props} isLoggedIn = {this.state.loggedIn}/>}
                        />
                        <Route 
                            exact path='/login' 
                            render={(props) => <Login {...props} isLoggedIn = {this.state.loggedIn} ref = {this.child}/>}
                        />
                        <Route path='/contact/:number' component={Contact}/>
                        <Route 
                            path='/logout' 
                            render={(props) => <Logout {...props} toggleLogin = {this.toggleLogin}/>}
                        />
                        <Route 
                            path='/jiveauth.php' 
                            render={(props) => <TestWindow {...props} isLoggedIn = {this.state.loggedIn} toggleLogin = {this.toggleLogin}/>}
                        /> 
                    </Switch> 
                </div>
            </div>
        );
    }
};

export default Main;
