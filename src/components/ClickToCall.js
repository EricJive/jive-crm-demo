import React from 'react';
import axios from 'axios';


class ClickToCall extends React.Component {
 
    sendCall(number) {
  
      console.log('Attempting to call ' + number);

      var token = localStorage.getItem('token');
      
      var headers = {

            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
      };

      var line = localStorage.getItem('selectedLineID');

      var reqBody = JSON.stringify(
        {
            dialString : number,
            from : {
                lineId : line
            }
        }
      )

      axios.post('https://api.jive.com/calls/v2/calls',reqBody,{headers: headers})
      .then(response => { 
        console.log(response)
      })
      
      .catch(error => {
          console.log(error);
          alert("An error occurred, Call request failed. Please try again later or logout from Jive");
      });

    };

    
  
    render(){

      let button;

      if (localStorage.getItem('selectedLine') && localStorage.getItem('token')) {
        button = <button title='Click to Call' className='call' onClick={() => this.sendCall(this.props.dialString)} type='button'></button> ;
      }

      else {
        button = <button className='nocall'type='button' title='Calling Disabled, Check Settings'></button> ;
      }

      return (
           <div className='callbtn'>{button}</div>
      )
    }
  
  };
  
  export default ClickToCall;