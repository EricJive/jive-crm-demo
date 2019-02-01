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

    this.state = {
      showLineSelect : false
    };

  };

  getLineInfo() {

    var headers = {
      "Authorization": "Bearer " + this.token
    };

    return axios.get('https://api.jive.com/users/v1/users/' + this.username +'/lines',{headers: headers})
      .then(function (response) {
        return response.data;
      });

  }


  componentWillMount() {
    //TODO
    //Get the users line information and add to the dropdown list

    //Check for token
    console.log('Settings Compenent Mounted');

    //If token exists, get user info
    if ( localStorage.getItem('token') && !localStorage.getItem('lines')){

      console.log('Getting user info...')
  
      this.getLineInfo().then(data =>{

        //console.log(data);
        localStorage.setItem('lines', JSON.stringify(data));

        //Get first line automatically
        this.userInfo = data.items[0].id;
        localStorage.setItem('selectedLine', this.userInfo);
        console.log(this.userInfo);
        this.setState({showLineSelect: true});
      })

    }

    if (localStorage.getItem('lines')) {
      this.setState({showLineSelect: true});
    }
  }

  
  render() {

    let lineSelector;
    console.log('Show line select is: ' + this.state.showLineSelect);

    if (this.state.showLineSelect) {

      lineSelector = <LineSelect></LineSelect>;
    }

    else {
      lineSelector = <p>Loading...</p>
    }

    console.log('Settings Render called');

    if (localStorage.getItem('token')) {

      console.log('Logged In was true')
      return ( 
        
        <div className="settings">
          <p>Jive Settings</p> 
          <p>Choose your extension:</p>
          {lineSelector}
          <br></br>
          <br></br>
          <Link to='/logout'>Logout</Link>
        </div>
      )
    }

    else {
      console.log('Logged In was false')
      return (
        <div className="settings">
          <Link to='/login'>Login to Jive</Link>
        </div>
    )
  }
}

};

export default Settings;