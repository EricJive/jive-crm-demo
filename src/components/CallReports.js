import React from 'react';
import axios from 'axios';

class CallReports extends React.Component {

    constructor(props){
        super(props);

        this.state = {

            username: '',
            startDate: '',
            endDate: '',
            data: '',
            error: ''
        }

        this.submitRequest = this.submitRequest.bind(this);
    };

    handleNameChange(event) {

        this.setState({username: event.target.value});
    }

    handleStartTimeChange(event) {

        this.setState({startDate: event.target.value});
    }

    handleEndTimeChange(event) {

        this.setState({endDate: event.target.value});
    }

    submitRequest(event) {

        event.preventDefault();

        var username = localStorage.getItem('username');

        console.log('Submit request called');

        if(localStorage.getItem('token')){

            console.log('Attempting to get call report...');

            var token = localStorage.getItem('token');
      
            var headers = {

                "Authorization": "Bearer " + token
            };

            //var username = this.state.username;
            var organization = localStorage.getItem('organizationID');

            axios.get('https://api.jive.com/call-reports/v1/reports/user-activity?organizationId=' + organization + '&startTime=2019-05-01T00%3A00%3A00&endTime=2019-05-14T23%3A59%3A59&userIds[0]='+ username,{headers: headers})
            .then(response => { 
                console.log(response)
                var responseString = JSON.stringify(response.data.items)
                this.setState({data:  responseString});
            })
      
            .catch(error => {
                console.log(error);
                var responseString = JSON.stringify(error);
                var message = 'An error occurred, Call Report request failed' + responseString;
                this.setState({error: message});
            });
        }

        else {

            console.log('Not logged in, unable to process request');
            this.setState({error: 'Not logged in, unable to process request'})
        }
    }
    
    render(){

        return (
            <div>
                <form onSubmit={this.submitRequest}>
                <label>
                    JiveID:
                    <input type="text" value={this.state.username} onChange={event => this.handleNameChange(event)}></input>
                </label>
                <br></br>
                <label>
                    Start date:
                    <input type="text" value={this.state.startDate} onChange={event => this.handleStartTimeChange(event)}></input>
                </label>
                <br></br>
                <label>
                    End dare:
                    <input type="text" value={this.state.endDate} onChange={event => this.handleEndTimeChange(event)}></input>
                </label>
                <br></br>
                    <input type="submit" value="Submit Request"></input>
                </form>
                <br></br>
                {this.state.data}
                {this.state.error}
            </div>
        )
    }
  
  };
  
  export default CallReports;