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
    this.state = {};
    this.startTimer = this.startTimer.bind(this);
    this.endTimer = this.endTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
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

  render()
  {
    return(
        <div>
            <Navigation/>
            <div>
                  <input type = 'submit' value = "Start Timer" onClick = {() => this.startTimer()}/>
                  <input type = 'submit' value = "End Timer" onClick = {() => this.endTimer()}/>
                  <input type = 'submit' value = "Pause Timer" onClick = {() => this.pauseTimer()}/>
            </div>
        </div>
    );
  }
}
