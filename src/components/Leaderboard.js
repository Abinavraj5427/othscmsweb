import React from 'react';
import Navigation from './Navigation';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
const axios = require('axios');

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

  componentDidMount(){
    axios.post('http://localhost/othscmsbackend/leaderboard.php', {}).then(result=>{
      let teams = result.data.split("/");
      let obj = JSON.parse(teams[1]);
      console.log(obj.member3);
    }).catch(error => console.log(error));
  }

  render(){
    this.state.teams.sort((a, b) => (a.points<b.points) ? 1: -1);
    let leaderboad = this.state.teams.map((team, idx) => (
      <li key={team.name}>{team.name}: {team.points}</li>
    ));
    return(

      <div>
              {!this.state.authenticated && <Redirect push to="/" />}
      <Navigation />
      <div>
        <h1>Leaderboard</h1>
        <ol>{leaderboad}</ol>
      </div>

      </div>
    );
  }
}
