import React from 'react';
import Navigation from './Navigation';
import {ip} from "../network";
import "../styles/darkmode.css";
import cookie from 'react-cookies';
const axios = require('axios');

export default class ViewRuns extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username:'',
      password:'',
      shouldDisplay:false,
      authenticated: this.props.authenticated,
      runs: [],
        };
    this.handleClick = this.handleClick.bind(this);
    this.pullData = this.pullData.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  handleClick(){
    this.setState(state => ({shouldDisplay:!state.shouldDisplay}));
  }

  componentDidMount(){
    this.props.autoLogin();
    this.getUser();
  }

  pullData(){
    axios.post("http://"+ip+'/othscmsbackend/viewruns.php', {
        team: this.state.user,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({runs:result.data});
      console.log(result.data);
    }).catch(error => console.log(error));
  }

  getUser(){
    var token = cookie.load('auth-token');
    cookie.load('auth-token') &&
    axios.post("http://"+ip+'/othscmsbackend/confirmlogin.php',
    {
        authtoken: token,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
        this.setState({user: result.data.team})
        this.pullData();
    }).catch(error => console.log(error))
  }

  render(){
    let list = this.state.runs;
    return(
      <div>
      <Navigation />
        <div>
          <h1>Your Submissions</h1>
          
          <table class = "container">
                    <tr>
                        <th>Problem</th>
                        <th>Status</th>
                        <th>Description</th>
                    </tr>
                    {
                        list.length >=1 && list.map(item => 
                            <tr>
                                <td>{item.problemName}</td>
                                <td>{item.status}</td>
                                <td>{item.description}</td>
                            </tr>
                        )
                    }
                </table>
        </div>
      </div>
    );
  }
}
