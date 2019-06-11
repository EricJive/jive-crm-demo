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
      //this.externalWindow = window.open('https://auth.jive.com/oauth2/v2/grant?response_type=token&client_id=f70359a9-cb00-401d-9ad2-b1fa89657a69&redirect_uri=http://67.207.41.150/jiveauth.php&scope=users.v1.lines.read calls.v2.initiate cr.v1.read','window','toolbar=no,menubar=no,resizable=no,height=550,location=no,width=400');
      
      //sheildseric25 test user
      this.externalWindow = window.open('http://localhost:3000/jiveauth.php#access_token=eyJhbGciOiJIUzUxMiJ9.eyJzY3AiOiJjYWxscy52Mi5pbml0aWF0ZSB1c2Vycy52MS5saW5lcy5yZWFkIGNyLnYxLnJlYWQiLCJzdWIiOiJzaGllbGRzZXJpYzI1QGdtYWlsLmNvbSIsImlzcyI6ImRlZmF1bHQiLCJ0eXAiOiJhY2Nlc3MiLCJnbnQiOiJlY2Y1ZmM3YS1jMzI3LTQ0M2YtYWIwYi1lMjQ5MWRiNWY3M2EiLCJleHAiOjE1NjAzNzc2NDMsImp0aSI6IjZjZjNjOTc0LWVlZTYtNGMxZi1iOTA1LTIyNDUxZDU2NDY1YiIsImNpZCI6ImY3MDM1OWE5LWNiMDAtNDAxZC05YWQyLWIxZmE4OTY1N2E2OSJ9.tKev6Tk1hb78r7shDXdCByxCGaM8lpe6C4EPYFLtSFgf-vMnqJhdgQXdw3T3CGW_WCRrf6PaJC3sge_ZpqnAOw&type=bearer&expires_in=2592000000&username=shieldseric25@gmail.com','window','toolbar=no,menubar=no,resizable=no,height=550,location=no,width=400');

      //eshields test user
      //this.externalWindow = window.open('http://localhost:3000/jiveauth.php#access_token=eyJhbGciOiJIUzUxMiJ9.eyJzY3AiOiJjYWxscy52Mi5pbml0aWF0ZSB1c2Vycy52MS5saW5lcy5yZWFkIiwic3ViIjoiZXNoaWVsZHMiLCJsZGFwIjoiUGxhdGZvcm0tTnVtYmVycywgUGxhdGZvcm0tTnVtYmVycywgUGxhdGZvcm0tQWRtaW4sIFBsYXRmb3JtLUN1c3RvbWVyLVNlcnZpY2UiLCJpc3MiOiJkZWZhdWx0IiwidHlwIjoiYWNjZXNzIiwiZ250IjoiNGEwNTExMTAtOWQwNS00YzEwLWFlZWYtYTUyOTE5YjI0ODcwIiwiZXhwIjoxNTU4MTMyOTYyLCJqdGkiOiJjMTgyNWM0Yi05OGI3LTRjNmEtOGIwZC1iODFmOGQ3ODA1ZGYiLCJjaWQiOiI1ZjMzNzVmNS1jOGZmLTQzZTItYTc3MC04MjFkNjVjMDc3NjgifQ.Fpd737wHjSY6T0kKRMGIFWVZW8dAxiHHB2xN1D3QGIOzKhBbPr2ctxZTGD0t9owwWNlglzPgyJH5XgP4Xilc2g&type=bearer&expires_in=2592000000&username=eshields','window','toolbar=no,menubar=no,resizable=no,height=550,location=no,width=400');
      
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