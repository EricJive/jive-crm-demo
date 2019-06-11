import React from 'react';
import Websocket from 'react-websocket';
import axios from 'axios';
import MessageParser from './MessageParser';


class WebSock extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

          showSocket: false,
          socketConnected: false,
          currentMessage: '',
          lineSubscribed: false,
          url: ''
        };

        this.timer = null;
        this.keepAliveTimer= null;
    }

    subscribeLine() {

        var url = localStorage.getItem('subscriptions');
        var token = localStorage.getItem('token');
        var lineID = localStorage.getItem('selectedLineID');
        var accountID = localStorage.getItem('organizationID');
        var ext = localStorage.getItem('selectedLine');

        if (lineID) {

            console.log('Attempting to subscribe to line ' + lineID);

            var headers = {

                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            };

            var reqBody = JSON.stringify(
                [
                    {
                        id : ext,
                        type: "dialog",
                        entity : {
                            id : lineID,
                            type: "line",
                            account: accountID
                        }
                    }
                ]
            )

            axios.post(url,reqBody,{headers: headers})
            .then(response => {
                console.log(response.data);
                this.setState({lineSubscribed: true})
            })
            .catch(error => {
                    console.log(error);
                    //alert("An error occurred, Subscription request failed. Please try again later or logout from Jive");
                    if (error.response) {
        
                        return error.response;
                    }
                    else {
        
                        return error;
                    }
            })
        }
    }

    getSession() {

        console.log('Getting session info...');

        var token = localStorage.getItem('token');

        var headers = {
            "Authorization": "Bearer " + token
        };

        return axios.post('https://realtime.jive.com/v2/session',null,{headers: headers})
        .then(response => { 
            console.log(response)
            return response.data;
          })
          
        .catch(error => {
            console.log(error);
            //alert("An error occurred, Session request failed. Please try again later or logout from Jive");
            if (error.response) {

                return error.response;
            }
            else {

                return error;
            }
        });
    }

    handleData(data) {

        // Stop 60 second timer when frame comes in
        clearInterval(this.keepAliveTimer);

        this.setState({currentMessage: data, socketConnected: true}, function (){
            this.mpref.handleData();

            //start 60 second timer AGAIN after getting last frame from socket
            this.keepAliveTimer = setInterval(
                () => this.websocketError(), 60000
            );
        });
    }


    connectSocket() {

        console.log('Attempting to connect to websocket...');

        //Clear the current subscription info
        localStorage.removeItem('ws');
        localStorage.removeItem('subscriptions');
        localStorage.removeItem('session');

        //Create new session (if line selected)
        if(localStorage.getItem('selectedLineID')) {

            this.getSession().then(data =>{

                if(data.ws) {
    
                    localStorage.setItem('ws', data.ws);
                    localStorage.setItem('subscriptions', data.subscriptions);
                    localStorage.setItem('session', data.self);
                    console.log('Session info saved on reconnect');
    
                    this.setState({socketConnected: true, showSocket: true, url: data.ws}, function () {

                        //Create new subscription
                        this.subscribeLine();

                        this.props.toggleSocket();
                        
                    });
                }
            })
        }

        else {

            console.log('No line selected, unable to connect to socket');
        }
        
    }
  
    checkForWS(){

        console.log('CheckForWS called');

        var ws = localStorage.getItem('ws');
        var line = localStorage.getItem('selectedLineID');

        // Check for line select but no websocket
        if (line && !ws){

            this.connectSocket();

            this.toggleSocket();
        }

        // If line is selecetd and ws has an address
        else if(line && ws) {

            this.toggleSocket();
        }

        else {
            console.log('No line selected');
        }
    }

    websocketError() {

        console.log('No frames for 60 seconds, requesting new session');
        this.setState({socketConnected: false, showSocket: false, url: '', lineSubscribed: false}, function() {

            this.props.toggleSocket();

            if(localStorage.getItem('token')){

                this.connectSocket();
            }
        })
    }

    toggleSocket() {

        console.log("Toggle Socket called");

        this.setState(state => ({
            showSocket: true,
            retryCount: 0,
            socketConnected: true

        }));

        if (!this.state.lineSubscribed) {

            this.subscribeLine()
        }
        
        clearInterval(this.timer);

        this.props.toggleSocket();

        this.keepAliveTimer = setInterval(
            //Checking for keep alives
            () => this.websocketError(), 60000
        );
    }

    componentDidMount() {

        this.timer = setInterval(
            () => this.checkForWS(), 5000
        );

        if(localStorage.getItem('ws')){
            this.setState({url: localStorage.getItem('ws')});
        }
    };

    componentWillUnmount(){

        console.log('WebSock will unmount called')
        if(this.timer) {
            clearInterval(this.timer)
        }

        if (this.keepAliveTimer) {
            clearInterval(this.keepAliveTimer)
        }
    }
  
    render() {

        if (this.props.socketOpen && this.state.url) { 

            return (
                
                <div className='callpop'>
                    <Websocket url={this.state.url} onMessage={this.handleData.bind(this)} />
                    <MessageParser ref={mpref => {this.mpref = mpref}} newMessage={this.state.currentMessage} socketopen = {this.state.showSocket}/>
                </div>        
            )
        }

        else {

            if(localStorage.getItem('token') && localStorage.getItem('selectedLineID')){

                return <p>Trying to connect socket...</p>
            } 

            else {
                return <span></span>
            }
        }
    };
}

export default WebSock;