import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';

class MyWindowPortal extends React.PureComponent {
    constructor(props) {
      super(props);
      this.containerEl = document.createElement('div');
      this.externalWindow = null;
    };
  
    componentDidMount() {

      //For build
      this.externalWindow = window.open('https://auth.jive.com/oauth2/v2/grant?response_type=token&client_id=f70359a9-cb00-401d-9ad2-b1fa89657a69&redirect_uri=http://67.207.41.150/jiveauth.php&scope=users.v1.lines.read calls.v2.initiate cr.v1.read','window','toolbar=no,menubar=no,resizable=no,height=550,location=no,width=400');
      
      this.externalWindow.document.body.appendChild(this.containerEl);
    };
  
    componentWillUnmount() {
  
      console.log("closing login window....");
      if (this.externalWindow){
        this.externalWindow.close();
      }
      
    };
  
    render() {

      if (localStorage.getItem('token')) {

        return <Redirect to='/settings' />
      }

      else {

        return ReactDOM.createPortal(this.props.children, this.containerEl); 
      }
      
    };
}

export default MyWindowPortal;
