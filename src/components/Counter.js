import React from 'react';

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: 0,
            counterActive: false
        };

        this.interval = null;

        this.setTimer = this.setTimer.bind(this);
        this.incrementTime = this.incrementTime.bind(this);
    }


    setTimer(){

        this.setState({counterActive: true});

        this.interval = setInterval(

            () => this.incrementTime(), 1000
        );
    }

    toHHMMSS(secs) {

        var sec_num = parseInt(secs, 10)    
        var hours   = Math.floor(sec_num / 3600) % 24
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60    
        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    incrementTime() {
        
        this.setState({timer: this.state.timer + 1});
        if(this.props.callEnded) {
            this.stopTimer();
        }
    }

    stopTimer(){

        clearInterval(this.interval);
    }

    componentWillUnmount() {

        clearInterval(this.interval);
    }

    componentDidMount(){

        this.setTimer();
    }

    render() {

        return (
            <div>Call Length: {this.toHHMMSS(this.state.timer)}</div>
        )
        
    }
}

export default Counter;