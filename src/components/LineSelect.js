import React from 'react';
import axios from 'axios';

class LineSelect extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            multipleLines: false
        };

        this.subscribeLine = this.subscribeLine.bind(this);
        this.changeLine = this.changeLine.bind(this);
    };

    subscribeLine(line, organizationID) {

        var url = localStorage.getItem('subscriptions');
        var token = localStorage.getItem('token');
        var lineNumber = localStorage.getItem('selectedLine');

        var lineID = line;
        var accountID = organizationID;

        console.log('Attempting to subscribe to line ' + lineID);

        var headers = {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        };

        var reqBody = JSON.stringify(
            [
                {
                    id : lineNumber,
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
            console.log(response.data)
          })
        .catch(error => {
            console.log(error);
            alert("An error occurred, Subscription request failed. Please try again later or logout from Jive");
        });
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

    changeLine(){

        var organizationID = '';
        var lines = '';
        var selectedLine = '';

        var line = document.getElementById('lineSelect').value;
        var id = document.getElementById('lineSelect').selectedIndex;

        localStorage.setItem('selectedLineID', line);
        console.log('LineID changed to ' + line);
        localStorage.setItem('optionID', id - 1);

        lines = localStorage.getItem('lines');
        lines = JSON.parse(lines);
        organizationID = lines.items[id - 1].organization.id;
        selectedLine = lines.items[id - 1].number;
        localStorage.setItem('organizationID', organizationID);
        localStorage.setItem('selectedLine', selectedLine);

        this.subscribeLine(line, organizationID);
        
    }

    buildOptions() {

        if(localStorage.getItem('lines')){
    
            var options = localStorage.getItem('lines');
          
            options = JSON.parse(options);

            var numberOfLines = options.items.length;
      
            if (numberOfLines > 1) {

                this.setState({multipleLines: true}, function(){

                    var selectBox = document.getElementById('lineSelect');

                    //default option
                    selectBox.options.add( new Option("Choose your extension", "", true, true) );
                    selectBox.options[0].disabled = true;
      
                    for(var i = 0, l = options.items.length; i < l; i++){

                        var option = options.items[i];
  
                        var number = i.toString();
  
                        if (number  === localStorage.getItem('optionID')){
  
                            selectBox.options.add( new Option(option.name + ' ' + option.number + ' on ' + option.organization.name, option.id, true, true) );
                        }
  
                        else {
  
                            selectBox.options.add( new Option(option.name + ' ' + option.number + ' on ' + option.organization.name, option.id) );
                        }
  
                    };

                });
            }
        }
    }

    componentDidMount() {

        this.buildOptions();

        if (!localStorage.getItem('subscriptions')){

            this.getSession().then(data =>{

                localStorage.setItem('ws', data.ws);
                localStorage.setItem('subscriptions', data.subscriptions);
                console.log('Session info saved');
    
            })
        }
    }
    
    render(){

        if (this.state.multipleLines) {

            localStorage.setItem('multipleLines', true);

            return (
                <div>
                    <select id='lineSelect' onChange={this.changeLine}></select>
                    <br></br>
                </div>
            )
        }

        else {

            var options = localStorage.getItem('lines');
          
            options = JSON.parse(options);

            return <p>{options.items[0].name} {options.items[0].number} on {options.items[0].organization.name}</p>
        }
    }
  
};

export default LineSelect;