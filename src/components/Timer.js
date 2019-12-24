import  React from 'react';
import cookie from 'react-cookies';
import "../styles/darkmode.css";
import Navigation from './Navigation';
import {Redirect} from 'react-router-dom';
import {ip} from "../network";

const axios = require('axios');

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {timeSeconds:0};
    this.updateTime = this.updateTime.bind(this);
    setInterval(this.updateTime, 500);
  }

  updateTime(){
    axios.post('http://'+ip+'/othscmsbackend/timer.php', {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({timeSeconds:result.data});
      console.log(result.data);
    }).catch(error => console.log(error));
  }

  render(){
    var total = this.state.timeSeconds;
    var hours = Math.floor(total/3600);
    total-=hours*3600;
    var minutes = Math.floor(total/60);
    total-=minutes*60;
    var seconds = (total);
    return(
      <div>
        <p>Timer: {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</p>
      </div>
    );
  }
}
