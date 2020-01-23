import React from 'react';
import Navigation from './Navigation';
import {ip} from "../network";
import "../styles/darkmode.css";
const axios = require('axios');

export default class Written extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        score: 0,
        newScore: '',
        matchingUsers: [],
        };
    this.pullData = this.pullData.bind(this);
  }
 
  componentDidMount(){
    this.props.autoLogin();
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
    let list = this.state.matchingUsers;
    return(
      <div>
      <Navigation />
        <div>
          <h1>Written Score Input</h1>

          <input type = "text" placeholder = "search name" value = {this.state.name} onChange = {event => this.setState({name: event.target.value})}/>
          <input type =  "submit" onClick = {() => {this.pullData()}}/>


          <table class = "container">
                <tr>
                    <th>Name</th>
                    <th>Team</th>
                    <th>School</th>
                    <th>Score</th>
                    <th>Enter</th>
                    <th>UPDATE</th>
                </tr>
                
                {
                  list.length >=1 && list.map(user => 
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.team}</td>
                      <td>{user.school}</td>
                      <td>{user.score}</td>
                      <td><input type = "number" placeholder = "score" value = {this.state.newScore} onChange = {event => this.setState({newScore: event.target.value})}/></td>
                      <td><input type = 'submit' onClick = {() => {}} /></td>
                    </tr>
                  )
                }
                  
                
                    
            </table>
        </div>
      </div>
    );
  }
}
