import React from 'react';
import CallPop from './CallPop';


class MessageParser extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {

            frames: [],
            keepalivesCount: 0,
            callEnded: false
        };

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

        console.log('Clear frames called');

        this.setState({frames: [] }, function () {

                console.log('Frames cleared');
            }
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

                console.log('Withdraw hit');
                ///Hande Call End
                this.setState({callEnded: true}, function (){
                    console.log('callEnded state set to true')
                    
                });
                message = 'Call ended @ ' + timestamp;
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

   
    handleData() {

        console.log('Message parser handling data');

        var date = new Date();
        var unixtimestamp = date.getTime();

        var timestamp = this.timeConverter(unixtimestamp);

        let result = JSON.parse(this.props.newMessage);
        var message = '';

        message = this.processSocketMessage(result,unixtimestamp,timestamp);
        console.log('Message is ' + message)

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

            if(this.state.keepalivesCount > 100) {

                this.setState(
                    {keepalivesCount: 0}
                );
            }
            else {

                this.setState(
                    {keepalivesCount: this.state.keepalivesCount + 1}
                );
            }
            
        }
        
    }

    render() {

        var list = this.state.frames.map((item) =>

            <li key={item.toString()}>{item}</li>
        );

        if (this.props.socketopen && localStorage.getItem('ws')){ 

            return (
                
                <div className='callpop'>
                    Socket Status: Connected
                    <CallPop ref={popref => {this.popref = popref}} callData = {list} clearPop = {this.clearFrames} callEnded = {this.state.callEnded}/>
                </div>        
            )
        }

        else {
            return <p>Socket Status: Not Connected</p>
        }

        
    };
}

export default MessageParser;