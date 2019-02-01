import React from 'react';
import axios from 'axios';


class ClickToCall extends React.Component {

    constructor(props){
      super(props);
      console.log('Click to call props ' + props);
      
    };
  
  
    sendCall(number) {
  
      console.log("Call button pressed");
      console.log('Attempting to call ' + number);

      var token = localStorage.getItem('token');
      
      var headers = {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
      };

      var line = localStorage.getItem('selectedLine');

      //TODO get Line from settings
      var reqBody = JSON.stringify(
        {
            dialString : number,
            from : {
                lineId : line
            }
        }
      )

      axios.post('https://api.jive.com/calls/v2/calls',reqBody,{headers: headers})
      .then(response => console.log(response));

    };

    
  
    render(){

      let button;

      if (localStorage.getItem('token')) {
        button = <button title='Click to Call' className='call' onClick={() => this.sendCall(this.props.dialString)} type='button'></button> ;
      }

      else {
        button = <button className='nocall'type='button'></button> ;
      }

      console.log("Call Component Rendered");

      return (
           <div title='Calling Disabled' className="callbtn">{button}</div> 
      )
    }
  
  };
  
  

  export default ClickToCall;