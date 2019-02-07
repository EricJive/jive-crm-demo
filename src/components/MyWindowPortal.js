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

      console.log('MyWindowPortal Component Mounted')
      // STEP 1: Create a new window, a div, and append it to the window. The div 
      // *MUST** be created by the window it is to be appended to (Edge only)
      if (!localStorage.getItem('token')) {

        this.externalWindow = window.open('https://auth.jive.com/oauth2/v2/grant?response_type=token&client_id=f70359a9-cb00-401d-9ad2-b1fa89657a69&redirect_uri=http://67.207.41.150/jiveauth.php&scope=users.v1.lines.read calls.v2.initiate','window','toolbar=no,menubar=no,resizable=no,height=550,location=no,width=400');
        this.externalWindow.document.body.appendChild(this.containerEl);
      }

      if (this.externalWindow && localStorage.getItem('token')) {
        this.externalWindow.close();
      }
      
      
    };
  
    componentWillUnmount() {
  
      // STEP 5: This will fire when this.state.showWindowPortal in the parent component
      // becomes false so we tidy up by just closing the window
      console.log("closing window....");
      if (this.externalWindow){
        this.externalWindow.close();
      }
      
    };
  
    render() {


      console.log('MyWindowPortal Render hit');
      if (localStorage.getItem('token')) {

        return <Redirect to='/settings' />
      }

      else {

        // STEP 2: Append props.children to the container <div> in the new window
        return ReactDOM.createPortal(this.props.children, this.containerEl); 
      }
      
    };
}

export default MyWindowPortal;
