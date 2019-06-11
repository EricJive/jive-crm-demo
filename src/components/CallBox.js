import React from 'react';
import ClickToCall from './ClickToCall';

class CallBox extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            dialString : 'none'
        }

    };

    updateInputValue(evt) {

        if (evt.target.value === ''){

            this.setState({
                dialString: 'none'
            })

        }

        else {

            this.setState({
                dialString: evt.target.value
            })
        }

        
    }
    
    render(){
 
        return (
            <div className='callbox'>
                <div className='left'>
                    <input 
                        type='search' 
                        pattern="[0-9]*"
                        maxLength='15'
                        placeholder='Enter number to call...'
                        onChange={evt => this.updateInputValue(evt)}
                    ></input>
                </div>
                <div className='right'>
                    <ClickToCall dialString={this.state.dialString} fromCallBox={true}/>
                </div>
            </div>
        )
    }
  
  };
  
  export default CallBox;