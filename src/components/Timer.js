import  React from 'react';
import cookie from 'react-cookies';
import loginstyles from './Login.css';
import Navigation from './Navigation';
import {Redirect} from 'react-router-dom';

const axios = require('axios');

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeSeconds:0};
    this.updateTime = this.updateTime.bind(this);
    setInterval(this.updateTime, 500);
  }

  updateTime(){
    axios.post('http://localhost/othscmsbackend/timer.php', {}).then(result=>{
      this.setState({timeSeconds:result.data});
      console.log(result.data);
    }).catch(error => console.log(error));
  }

  render(){
    var total = this.state.timeSeconds;
    var hours = (total/3600).toFixed(0);
    total-=hours*3600;
    var minutes = (total/60).toFixed(0);
    total-=minutes*60;
    var seconds = (total);
    return(
      <div>
        <p>Timer: {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</p>
      </div>
    );
  }
}
