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
  }

  render(){
    let minutes = (this.state.timeSeconds/60).toFixed(0);
    let seconds = (this.state.timeSeconds%60);
    return(
      <div>
        <p>Timer: {minutes}:{seconds}</p>
      </div>
    );
  }
}
