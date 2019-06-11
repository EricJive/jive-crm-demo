import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import LineSelect from './LineSelect';

class Settings extends React.Component {

  
  constructor(props){

    super(props);
    this.token = localStorage.getItem('token');
    this.username = localStorage.getItem('username');
    this.userInfo = '';
    this.organization = '';

    this.state = {
      showLineSelect : false
    };

  };

  getLineInfo() {

    var headers = {
      "Authorization": "Bearer " + this.token
    };

    return axios.get('https://api.jive.com/users/v1/users/' + this.username +'/lines',{headers: headers})
      .then(response => { 
        return response.data;
      })
      
      .catch(error => {
          alert("An error occurred, Request for Line Info failed. Please login to Jive again.");
          localStorage.clear();
          return error.response.status;
      });

  }


  componentWillMount() {

    //If token exists, but we have not gotten the lines yet > get user info
    if ( localStorage.getItem('token') && !localStorage.getItem('lines')){

      this.props.toggleLogin();

      console.log('Getting user info...');
  
      this.getLineInfo().then(response => {

        if(response !== 401){

          localStorage.setItem('lines', JSON.stringify(response));

          //If we only have one line
          if (response.items.length === 1) {
  
            //Set first line automatically if it is the only one
            this.userInfo = response.items[0].id;
            this.organization = response.items[0].organization.id;
            localStorage.setItem('selectedLineID', this.userInfo);
            localStorage.setItem('organizationID', this.organization);
            localStorage.setItem('selectedLine', response.items[0].number);
          } 
          this.setState({showLineSelect: true});
        }

        else {
          this.setState({showLineSelect: false});
        }

      });
    }

    if (localStorage.getItem('lines')) {
      this.setState({showLineSelect: true});
    }
  }

  
  render() {

    let lineSelector;

    if (this.state.showLineSelect) {

      lineSelector = <LineSelect></LineSelect>;
    }

    else {
      lineSelector = <p>Loading...</p>
    }

    if (localStorage.getItem('token')) {

      return ( 
        
        <div className="settings">
          <p>Jive Settings</p> 
          {lineSelector}
          <br></br>
          <Link to='/logout'>Logout</Link>
        </div>
      )
    }

    else {

      return (
        <div className="settings">
          <Link to='/login'>Login to Jive</Link>
        </div>
    )
  }
}

};

export default Settings;