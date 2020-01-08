import React from 'react';
import Navigation from './Navigation';
import "../styles/darkmode.css";
import {ip} from "../network.js";
const axios = require('axios');



export default class TimerPage extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      timeExtend: 0
    };
    this.startTimer = this.startTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.extendTimer = this.extendTimer.bind(this);
  }

  componentDidMount(){

  }

  startTimer(){
    axios.post('http://'+ip+'/othscmsbackend/startTimer.php',{
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));
  }

  pauseTimer(){
    console.log("Pausing");
    axios.post('http://'+ip+'/othscmsbackend/pauseTimer.php',{
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));

  }

  endTimer(){
    axios.post('http://'+ip+'/othscmsbackend/endTimer.php',{
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log(error));
  }
  extendTimer(secondstoExtend){
    this.setState({timeExtend:0});
    axios.post('http://'+ip+'/othscmsbackend/extendTimer.php',{
      seconds: secondstoExtend
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
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
                  <input type = 'submit' value = "End Timer" onClick = {() => this.endTimer()}/>
                  <input type = 'submit' value = "Pause Timer" onClick = {() => this.pauseTimer()}/>
                  <input type = "text" placeholder = "Seconds to extend" value = {this.state.timeExtend} onChange={event => this.setState({timeExtend: event.target.value})}/>
                  <input type ="submit" value = "Extend Timer" onClick = {() => this.extendTimer(this.state.timeExtend)}/>
            </div>
        </div>
    );
  }
}
