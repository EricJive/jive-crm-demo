import React from 'react';

class TestWindow extends React.PureComponent {

  
    componentDidMount() {
        console.log('/Test endpoint hit and isLoggedIn =  '+ this.props.isLoggedIn);

        if (this.props.isLoggedIn === false) {
            //Parse out the token
            var parameter = this.props.location.hash;
            var stringArray = [];
            var token = '';
            var username = '';
            var remove = '&type';
            stringArray = parameter.split('=');
            token = stringArray[1];
            token = token.replace(remove,'');
            username = stringArray[4];
            localStorage.setItem("token", token);
            localStorage.setItem('username', username);
            this.props.toggleLogin();
            console.log("Toggle Login Hit by TestWindow")
        }

    };
  
    componentWillUnmount() {

    };
  
    render() {
        return (
            <div className='test'>
                <p>We have received our token successfully!</p>
                <p>Click on Settings to continue...</p>
            </div>        )
    };
}

export default TestWindow;