import React from 'react';
import Navigation from './Navigation';
import {ip} from "../network";
import "../styles/darkmode.css";
const axios = require('axios');

export default class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 

        };
    this.pullData = this.pullData.bind(this);
  }
 
  componentDidMount(){
    this.props.autoLogin();
    this.pullData();
  }

  pullData(){
    axios.post("http://"+ip+'/othscmsbackend/match_users.php', {
        name: this.state.name,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({matchingUsers:result.data});
    }).catch(error => console.log(error));
  }

  render(){
    let list = this.state.pending;
    return(
      <div>
      <Navigation />
        <div>
          <h1>Written Score Input</h1>

          <input type = "text" placeholder = "search name" value = {this.state.name} onChange = {event => this.setState({password: event.target.value})}/>
          <input type =  "submit" onClick = {() => {}}/>
        </div>
      </div>
    );
  }
}
