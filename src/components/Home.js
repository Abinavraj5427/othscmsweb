import React from 'react';
import Navigation from './Navigation';
import "../styles/darkmode.css";
import {ip} from "../network";
import cookie from 'react-cookies';
const axios = require('axios');




export default class Home extends React.Component 
{
    
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
      newSchool: "",
    }
    this.updateSchool = this.updateSchool.bind(this);
    this.updateMember = this.updateMember.bind(this);
    this.getTeam = this.getTeam.bind(this);
  }

  componentDidMount(){
    this.props.autoLogin();
    this.getTeam();
  }


  getTeam(){
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
        //console.log(result);
        this.setState({team: result.data.team})
        this.updateSchool();
        this.updateMember(1, "");
        this.updateMember(2, "");
        this.updateMember(3, "");
    }).catch(error => console.log(error))
  }

  updateSchool(){
    axios.post("http://"+ip+'/othscmsbackend/update_school.php', {
      team: this.state.team,
      school: this.state.newSchool,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      //console.log(result.data);
      this.setState({setSchool: result.data});
    }).catch(error => console.log(error));
  }

  updateMember(index, member){
    axios.post("http://"+ip+'/othscmsbackend/update_member.php', {
      team: this.state.team,
      member: member,
      index: index,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      index === 1 && this.setState({member1: result.data});
      index === 2 && this.setState({member2: result.data});
      index === 3 && this.setState({member3: result.data});
    }).catch(error => console.log(error));
  }

  render(){
    return(
        <div>
            <Navigation/>   
            <div>
                <h2>Welcome to the OTHS UIL Site</h2>
                <br/>
                <h1>School: {this.state.setSchool}</h1>
                <p>Member 1: {this.state.member1}</p>
                <p>Member 2: {this.state.member2}</p>
                <p>Member 3: {this.state.member3}</p>
                <br/>
                <p>Enter your school name:</p>
                <input type = "text" placeholder = "School" value={this.state.newSchool} onChange={event => this.setState({newSchool: event.target.value})}/>
                <input type = "submit" onClick = {() => {this.updateSchool()}}/>
                <br/>
                <p>Enter Team Members:</p>
                <input type = "text" placeholder = "Member 1" value = {this.state.newMem1}  onChange={event => this.setState({newMem1: event.target.value})}/>
                <input type = "submit" onClick = {() => {this.updateMember(1, this.state.newMem1)}}/>
                <br/>
                <input type = "text" placeholder = "Member 2" value = {this.state.newMem2}  onChange={event => this.setState({newMem2: event.target.value})}/>
                <input type = "submit" onClick = {() => {this.updateMember(2, this.state.newMem2)}}/>
                <br/>
                <input type = "text" placeholder = "Member 3" value = {this.state.newMem3}  onChange={event => this.setState({newMem3: event.target.value})}/>
                <input type = "submit" onClick = {() => {this.updateMember(3, this.state.newMem3)}}/>
            </div>
        </div>   
    );
  }
}