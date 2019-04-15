import React from 'react';
import Websocket from 'react-websocket';
import axios from 'axios';
import MessageParser from './MessageParser';


class WebSock extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

          showSocket: false,
          currentMessage: '',
          lineSubscribed: false
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
            alert("An error occurred, Session request failed. Please try again later or logout from Jive");
            return error.response.status;
        });
    }

    checkSubscription() {

        console.log('Checking subscription info...');

        var token = localStorage.getItem('token');

        var url = localStorage.getItem('session');

        var headers = {
            "Authorization": "Bearer " + token
        };

        return axios.get(url,{headers: headers})
        .then(response => { 
            console.log(response)
            return response.data;
          })
          
        .catch(error => {
            console.log(error);
            alert("An error occurred, Session info request failed. Please try again later or logout from Jive");
            return error.response.status;
        });
    }

    handleData(data) {

        // Stop 30 second timer when frame comes in

        clearInterval(this.keepAliveTimer);

        this.setState({currentMessage: data}, function (){
            this.mpref.handleData();

            //start 30 second timerAGAIN after getting frame from socket
            console.log('Timer reset');
            this.keepAliveTimer = setInterval(
                () => this.checkForFrames(), 35000
            );
            
        });
    }

    reconnect() {

        console.log('Reconnect function called');

        //Clear the current subscription info
        localStorage.removeItem('ws');
        localStorage.removeItem('subscrtiptions');

        //this.checkSubscription().then(response => {

          //  console.log(response.activeSubscriptions);
        //});

        //Create new session
        this.getSession().then(data =>{

            localStorage.setItem('ws', data.ws);
            localStorage.setItem('subscriptions', data.subscriptions);
            localStorage.setItem('session', data.self);
            console.log('Session info saved');

        })

        //Create new subscription
        this.subscribeLine();

    }
  
    checkForWS(){

        console.log('Check websocket hit');

        if (localStorage.getItem('ws')){
            this.toggleSocket();
        }
    }

    checkForFrames() {

        console.log('No frames for 35 seconds, requesting new session');
        this.reconnect()

    }

    toggleSocket() {

        console.log('Toggle Socket hit')
        this.setState(state => ({
            ...state,
            showSocket: true

        }));

        if (!this.state.lineSubscribed) {

            this.subscribeLine()
        }
        
        clearInterval(this.timer);

        this.keepAliveTimer = setInterval(
            () => this.checkForFrames(), 35000
        );

    }

    componentDidMount() {

        console.log('WebSocket Component Moutned');

        this.timer = setInterval(
            () => this.checkForWS(), 5000
        );
    };

  
    render() {

        var url = localStorage.getItem('ws');

        if (url){ 

            return (
                
                <div className='callpop'>
                    <Websocket url={url} onMessage={this.handleData.bind(this)} />
                    <MessageParser ref={mpref => {this.mpref = mpref}} newMessage={this.state.currentMessage} socketopen = {this.state.showSocket}/>
                </div>        
            )
        }

        else {
            return <span></span>
        }

        
    };
}

export default WebSock;