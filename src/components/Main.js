import React, { Component } from 'react';
import logo from '../crm.png';
import '../App.css';
import Contact from './Contact';
import {Switch, Route} from 'react-router-dom';
import { Link } from 'react-router-dom'; 
import AllContacts from './AllContacts';
import Settings from './Settings';
import Home from './Home';
import RedirectURI from './RedirectURI';
import Logout from './Logout';
import Login from './Login';
import WebSock from './WebSock';
import CallBox from './CallBox';

class Main extends Component {

    constructor(props){

        super(props);

        this.state = {
            loggedIn : false,
            socketOpen: false
        };

        this.toggleLogin = this.toggleLogin.bind(this);
    };

    toggleLogin() {
        
        this.setState({loggedIn: !this.state.loggedIn}, function () {});

    }

    toggleSocket() {
        
        this.setState({socketOpen: !this.state.socketOpen}, function () {});

    }

    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <CallBox></CallBox>
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
                            render={(props) => <Login {...props} isLoggedIn = {this.state.loggedIn} />}
                        />
                        <Route path='/contact/:number' component={Contact}/>
                        <Route 
                            path='/logout' 
                            render={(props) => <Logout {...props} toggleLogin = {this.toggleLogin}/>}
                        />
                        <Route 
                            path='/jiveauth.php' 
                            render={(props) => <RedirectURI {...props} isLoggedIn = {this.state.loggedIn} toggleLogin = {this.toggleLogin}/>}
                        /> 
                    </Switch> 
                </div>
                <footer className='websocket'>
                    <WebSock></WebSock>
                </footer>
            </div>
        );
    }
};

export default Main;
