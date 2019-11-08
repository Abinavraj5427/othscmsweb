import React from 'react';
import Navigation from './Navigation';
import cookie from 'react-cookies';


export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'',
      password:'',
      shouldDisplay:false,
      teams:[
        {
          name:'Team 1',
           points:120
         }
         ,
          {
            name:'Team 2',
             points:100
           }
         ]
        };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState(state => ({shouldDisplay:!state.shouldDisplay}));
  }

  render(){
    this.state.teams.sort((a, b) => (a.points<b.points) ? 1: -1);
    let leaderboad = this.state.teams.map((team, idx) => (
      <li key={team.name}>{team.name}: {team.points}</li>
    ));
    return(
      
      <div>
      <Navigation />
      <div>
        <h1>Leaderboard</h1>
        <ol>{leaderboad}</ol>
      </div>

      <input type = "submit" value = "LOGOUT" onClick = {() => {cookie.remove('auth-token'); console.log(cookie.load('auth-token'))}}></input>
      </div>
    );
  }
}
