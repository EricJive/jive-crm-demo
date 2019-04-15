import React from "react";
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import Counter from './Counter';

class CallPop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            callComplete: false,
            callStarted: false,
            callCount: 0
        };

        this.interval = null;
    }

    componentDidMount(){

        Modal.setAppElement(this.el);
    }
    
    chackForCallEnd(){

        console.log('CallPop interval running')

        if (this.props.callEnded) {
            this.setState({callComplete: true, callStarted: false})
            clearInterval(this.interval);
        }

    }
        

    openPane() {

        console.log('Open pane called')

        // Panel is still open, need to clear data or make a new pop
        if (this.state.isPaneOpen){
            console.log('Pane is open already')
            this.setState({isPaneOpen : true}, function() {
                this.props.clearPop();
            })
        }        

        this.setState({ isPaneOpen: true, callStarted: true , callComplete: false, callCount: this.state.callCount + 1});


        this.interval = setInterval(

            () => this.chackForCallEnd(), 1000
        )
    }

    closePane() {
        
        this.setState({ isPaneOpen: false }, function() {

            this.props.clearPop();
        });

        this.setState({callComplete: false, callCount: 0})

        clearInterval(this.interval);
        
    }

    render() {

        console.log('Call pop rendered and calldata:' + this.props.callData)

        return (
            <div ref={ref => this.el = ref}>
            <SlidingPane
                closeIcon={<div className='closePop'></div>}
                isOpen={ this.state.isPaneOpen }
                closeTimeoutMS='500'
                title='Call Information'
                from='bottom'
                width='500px'
                onRequestClose={ () => 
                    this.closePane()
                }>
                <div className='callInfo'>{this.props.callData} <Counter  key={this.state.callCount} callEnded={this.state.callComplete} callStarted={this.state.callStarted}></Counter></div>
            </SlidingPane>
        </div>
        )
    }
}

export default CallPop;

