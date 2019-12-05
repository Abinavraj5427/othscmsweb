import React from 'react';
import Navigation from './Navigation';
const axios = require('axios');



export default class TimerPage extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {};
    this.startTimer = this.startTimer.bind(this);

  }

  componentDidMount(){
    
  }

  startTimer(){
    axios.post('http://localhost/othscmsbackend/startTimer.php',{
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));
  }


  render()
  {
    return(
        <div>
            <Navigation/>
            <div>
                <input type = 'submit' value = "Start Timer" onClick = {() => this.startTimer()}/>
            </div>
        </div>
    );
  }
}
