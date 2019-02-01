import React from 'react'

class LineSelect extends React.Component {

    changeLine(){

        var line = document.getElementById('lineSelect').value;

        localStorage.setItem('selectedLine', line);
        console.log('Line changed to ' + line);


    }

    componentDidMount() {

        console.log('Create Line select called');

        if(localStorage.getItem('lines')){
    
          var options = localStorage.getItem('lines');
        
          options = JSON.parse(options);
    
          //console.log(options);
    
          var selectBox = document.getElementById('lineSelect');
    
          for(var i = 0, l = options.items.length; i < l; i++){
            var option = options.items[i];
            selectBox.options.add( new Option(option.name + ' ' + option.number, option.id) );
          };
        }
       
    }
    
    render(){

        console.log('Line Select Render called');

        return <select id='lineSelect' onChange={this.changeLine}></select>
        
    }
  
};
export default LineSelect;