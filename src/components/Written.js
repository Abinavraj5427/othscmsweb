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
        name: '',
        curTeam: '',
        matchingUsers: [],
        };
    this.pullData = this.pullData.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }
 
  componentDidMount(){
    this.props.autoLogin();
  }

  pullData(){
    axios.post("http://"+ip+'/othscmsbackend/match_users.php', {
        name: this.state.name,
        team: this.state.curTeam,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      console.log(result);
      this.setState({matchingUsers:result.data});
    }).catch(error => console.log(error));
  }

  updateScore(member, id, score){
    axios.post("http://"+ip+'/othscmsbackend/update_score.php', {
        member: member,
        id: id,
        score: score,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({newScore: ''});
      this.pullData();
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
          <br/>
          <input type = "text" placeholder = "search team" value = {this.state.curTeam} onChange = {event => this.setState({curTeam: event.target.value})}/>
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
                      <td><input type = 'submit' onClick = {() => {this.updateScore(user.member, user.teamid, this.state.newScore)}} /></td>
                    </tr>
                  )
                }
                  
                
                    
            </table>
        </div>
      </div>
    );
  }
}
