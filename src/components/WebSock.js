import React from 'react';
import Websocket from 'react-websocket';
import axios from 'axios';
import CallPop from './CallPop';
import MessageParser from './MessageParser';


class WebSock extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
          frames: [],
          keepalivesCount: 0,
          showSocket: false,
          callEnded: false
        };

        this.timer = null;
        this.clearFrames = this.clearFrames.bind(this);
    }

    timeConverter(UNIX_timestamp){

        var a = new Date(UNIX_timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min =  '0' + a.getMinutes();
        var sec = '0' + a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2) ;
        return time;
      }

    clearFrames(){

        this.setState(
            {frames: []}
        );
    }

    processSocketMessage(result, currentTime, timestamp){

        var message = '';
        var timeOfMessage;
        var callerID;

        if (result.data) {
            callerID = result.data.display;
            timeOfMessage = result.data.created;
        }
    
        switch (result.type) {

            case "announce":
                if (timeOfMessage && ((currentTime - 100000) < timeOfMessage)) {

                    // Call data already exists 
                    if(this.state.frames.length > 0) {

                        this.clearFrames();
                    } 

                    this.setState({callEnded: false});

                    this.popref.openPane();
                    
                    //Handle New Call Announcement
                    if (result.data.direction === 'recipient') {

                        message = "New call incoming from " + callerID + ' @ ' + timestamp;
                    }

                    else {
                        message = "Calling out to " + callerID+ ' started @ ' + timestamp;
                    }
                }

                break;

            case "replace":
                    
                //Handle replace message 
                var callState = result.data.state;
                
                switch (callState) {
                    // the call represented by this state snapshot is initialized
                    case 'trying':
                        //Inbound
                        if (result.data.direction === 'recipient') {
                            message = 'Call incoming from ' + callerID + ' is trying to connect';
                        }
                        //Outbound
                        else {
                            message = 'Call out to ' + callerID + ' is trying to connect';
                        }
                        
                        break;

                    //the call represented by this state snapshot is ringing
                    case 'early':
                        message = 'Call is ringing';
                        
                        break;

                    //the call represented by this state snapshot is answered / connected
                    case 'confirmed':
                        message = "Call Connected @ " + timestamp;
                        break;

                    //No match
                    default:
                        message = 'An error occurred';
                         break;
                    }

                break;

            case "withdraw":
                ///Hande Call End
                this.setState({callEnded: true}, function (){
                    message = 'Call ended @ ' + timestamp;
                });
                break;

            case 'keepalive':
                //keep alive
                message = 'keep alive received';
                break;

            default:
                console.log('An error occurred');
                message = '';
                break;
        }
        
        return message;
    }

    subscribeLine() {

        var url = localStorage.getItem('subscriptions');
        var token = localStorage.getItem('token');
        var lineID = localStorage.getItem('selectedLineID');
        var accountID = localStorage.getItem('organizationID');
        var ext = localStorage.getItem('selectedLine');

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
        .then(response => console.log(response.data));
    }

    handleData(data) {

        var date = new Date();
        var unixtimestamp = date.getTime();

        var timestamp = this.timeConverter(unixtimestamp);

        // Socket has been replied to at least once
        if (this.state.frames.length === 1 ){

            localStorage.setItem('socketOpen', true);

            if (!localStorage.getItem('multipleLines')) {

                this.subscribeLine();
            }
            
        }

        let result = JSON.parse(data);
        var message = '';

        message = this.processSocketMessage(result,unixtimestamp,timestamp);

        //Discard message
        if(message === '') {
            console.log('Socket message discarded');
        }

        //Keep the message
        else if (message !== 'keep alive received'){
            
            this.setState(
                {frames: [...this.state.frames , message]}
            );

            

            if (this.state.frames.length > 10) {
                
                this.clearFrames();
            }
        }

        //Keep alive
        else {
            this.setState(
                {keepalivesCount: this.state.keepalivesCount + 1}
            );
        }
        
    }

    reconnect() {
        //TODO
        //Clear the subscription info
        //Create new subscription

        localStorage.removeItem('ws');
        localStorage.removeItem('subscrtiptions');

    }
  
    checkForWS(){

        console.log('Check websocket hit');

        if (localStorage.getItem('ws')){
            this.toggleSocket();
        }
    }

    toggleSocket() {

        console.log('Toggle Socket hit')
        this.setState(state => ({
            ...state,
            showSocket: true
        }));

        clearInterval(this.timer);
    }

    componentDidMount() {

        console.log('WebSocket Component Moutned');

        this.timer = setInterval(
            () => this.checkForWS(), 5000
        );
    };

    
  
    render() {

        var list = this.state.frames.map((item) =>

            <li key={item.toString()}>{item}</li>
        );

        var url = localStorage.getItem('ws');

        if (url){ 

            return (
                
                <div className='callpop'>
                    <Websocket url={url} onMessage={this.handleData.bind(this)}/>
                    Number of keepalives received: {this.state.keepalivesCount}
                    <div>
                        <button title='Reconnect Socket' className='reconnect' onClick={() => this.reconnect()} type='button'>Reconnect Socket</button>
                    </div>
                    <CallPop ref={popref => {this.popref = popref}} callData = {list} clearPop = {this.clearFrames} callEnded = {this.state.callEnded}/>
                    <MessageParser></MessageParser>
                </div>        
            )
        }

        else {
            return <span></span>
        }

        
    };
}

export default WebSock;