import React from 'react';
import Navigation from './Navigation';
import {ip} from "../network";
import "../styles/darkmode.css";
const axios = require('axios');

export default class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'',
      password:'',
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
    this.pullData = this.pullData.bind(this);
  }


  componentDidMount(){
    this.props.autoLogin();
    this.pullData();
  }

  pullData(){
    axios.post("http://"+ip+'/othscmsbackend/leaderboard.php', {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({teams:result.data});
      console.log(result.data);
    }).catch(error => console.log(error));
  }

  render(){
    let list = [];
    for(let [key, value] of Object.entries(this.state.teams)){
      list.push({id:key, school:value.school, score:value.score});
      list.sort((a,b) => a.score>b.score ? -1: 1);
    }
    return(
      <div>
      <Navigation />
        <div>
          <h1>Leaderboard</h1>
          
          <table class = "container">
                    <tr>
                        <th>ID</th>
                        <th>School</th>
                        <th>Score</th>
                    </tr>
                    {
                        list.length >=1 && list.map(item => 
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.school}</td>
                                <td>{item.score}</td>
                            </tr>
                        )
                    }
                </table>
        </div>
      </div>
    );
  }
}
