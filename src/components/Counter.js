import React from 'react';

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            timer: 0,
            totalTime: 0
        };

        this.interval = null;

        this.setTimer = this.setTimer.bind(this);
        this.incrementTime = this.incrementTime.bind(this);
    }


    setTimer(){

        console.log('setTimer hit')

        this.setState({timer: 0});

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
        console.log('Increment running');
        this.setState({timer: this.state.timer + 1});
        if(this.props.callEnded) {
            this.stopTimer();
        }
    }

    stopTimer(){

        clearInterval(this.interval);

        this.setState({totalTime: this.state.timer}, function (){

            this.setState({timer: 0});
        });


        this.setTimer();

    }

    componentWillUnmount() {

        clearInterval(this.interval);
    }

    componentDidMount(){

        console.log('Counter component mounted');
        this.setTimer();
    }

    render() {

        if (this.state.totalTime > 0){

            return (
                <div>Call Length: {this.toHHMMSS(this.state.totalTime)}</div>
            )
            
        }

        else {

            return (
                <div>Call Length: {this.toHHMMSS(this.state.timer)}</div>
            )
        }
        
    }
}

export default Counter;