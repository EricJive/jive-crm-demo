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

    validateDialString(dialstring) {

      var phonenoUS = /^(\([0-9]{3}\)|[0-9]{3})\s?-?[0-9]{3}\s?-?[0-9]{4}\b/;

      var ext = /^\+?[0-9]{3,15}$/;


      if(dialstring.match(phonenoUS)) {

        return true;

      }  

      else if (dialstring.match(ext)) {

        return true;
      }

      else {

        return false;
      }
    }

    
  
    render(){

      let button;

      if (this.props.fromCallBox) {


        if (localStorage.getItem('selectedLine') && localStorage.getItem('token')) {

          if (this.validateDialString(this.props.dialString)){
  
            button = <button title='Click to Call' className='call' onClick={() => this.sendCall(this.props.dialString)} type='button'></button> ;
          }
  
          else {
  
            button = <button className='nocall'type='button' title='Invalid DialString'></button> ;
          }
          
        }
  
        else {
          button = <button className='nocall'type='button' title='Calling Disabled, Check Settings'></button> ;
        }

      }

      else {

        if (localStorage.getItem('selectedLine') && localStorage.getItem('token')) {

          button = <button title='Click to Call' className='call' onClick={() => this.sendCall(this.props.dialString)} type='button'></button> ;
          
        }
  
        else {
          button = <button className='nocall'type='button' title='Calling Disabled, Check Settings'></button> ;
        }
    }

    return (
      <div className='callbtn'>{button}</div>
    
      )
    }
  
  };
  
  export default ClickToCall;