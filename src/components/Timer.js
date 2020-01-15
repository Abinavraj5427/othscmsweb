import  React from 'react';
import "../styles/darkmode.css";
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
    }).catch(error => console.log(error));
    if(this.state.timeSeconds<=0){

    }
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
        <p>Timer: {Math.max(hours, 0).toString().padStart(2, "0")}:{Math.max(minutes, 0).toString().padStart(2, "0")}:{Math.max(seconds, 0).toString().padStart(2, "0")}</p>
      </div>
    );
  }
}
