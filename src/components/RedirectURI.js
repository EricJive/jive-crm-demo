import React from 'react';

class RedirectURI extends React.PureComponent {

  
    componentDidMount() {

        if (this.props.isLoggedIn === false) {

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
        }

    };
  
    render() {
        
        return (
            <div className='test'>
                <p>We have received our token successfully!</p>
            </div>        
        )
    };
}

export default RedirectURI;