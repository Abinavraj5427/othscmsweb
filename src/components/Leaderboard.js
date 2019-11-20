import React from 'react';
import Navigation from './Navigation';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
const axios = require('axios');

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'',
      password:'',
      shouldDisplay:false,
      authenticated: this.props.authenticated,
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
    this.pullData = this.pullData.bind(this);
  }

  handleClick(){
    this.setState(state => ({shouldDisplay:!state.shouldDisplay}));
  }

  componentDidMount(){
    this.props.autoLogin();
    this.pullData();
  }

  pullData(){
    axios.post('http://localhost/othscmsbackend/leaderboard.php', {}).then(result=>{
      this.setState({teams:result.data});
    }).catch(error => console.log(error));
  }

  render(){
    let list = [];
    for(let [key, value] of Object.entries(this.state.teams)){
      list.push({id:key, school:value.school, score:value.score});
      list.sort((a,b) => a.score>b.score ? -1: 1);
    }
    let leaderboard;
    for(let i = 0; i<list.length; i++){
      leaderboard = <ul> {leaderboard} <li key ={list[i].id}> {list[i].school} {list[i].id} : {list[i].score}</li></ul>;
    }
  
    return(
      <div>
      <Navigation />
        <div>
          <h1>Leaderboard</h1>
          {leaderboard}
        </div>
      </div>
    );
  }
}
