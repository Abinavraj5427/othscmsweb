import React from 'react';

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
    let display = <p></p>;
    if(this.state.shouldDisplay){
      display = <div><p>{this.state.username}</p><p>{this.state.password}</p></div>;
    }
    this.state.teams.sort((a, b) => (a.points<b.points) ? 1: -1);
    let leaderboad = this.state.teams.map((team, idx) => (
      <li>{team.name}: {team.points}</li>
    ));
    return(
      <div>
        <h1>Leaderboard</h1>
        <ol>{leaderboad}</ol>
      </div>
    );
  }
}
