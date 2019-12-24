import React from 'react';
import Navigation from './Navigation';
import "../styles/darkmode.css";
import cookie from 'react-cookies';
import {ip} from "../network";
const axios = require('axios');



export default class Submission extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        authenticated: this.props.authenticated,
        file: undefined,
        problems: [],
        problemVal:undefined,
    }
    this.saveFile = this.saveFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.getProblems = this.getProblems.bind(this);
  }

  componentDidMount(){
    this.props.autoLogin();
    this.getProblems();
    this.setUser();
  }

  saveFile = (event) => {
    this.setState({file: event.target.files[0]});
    console.log(event.target.files);
  }

  uploadFile(){
    
    const config = {
      headers: {
          'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
      }
    }

    let formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("team", this.state.user);
    formData.append("problem", this.state.problemVal);

    axios.post("http://"+ip+'/othscmsbackend/upload.php', formData, config
    ).then(result=>{
      console.log(result);
    }).catch(error => console.log(error));
  }

  getProblems(){
    axios.post("http://"+ip+'/othscmsbackend/get_problems.php',{},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      this.setState({problems: result.data});
      result.data.length >=1 && this.setState({problemVal: result.data[0].problem});
    })
    .catch(error => console.log(error));
  }

  setUser(){
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
      }).catch(error => console.log(error))
  }

  render()
  {
    return(
        <div>
            <Navigation/>   
            <div>
                <h1>Submission</h1>
                <hr/>
                <select onChange  = {(e) => this.setState({problemVal: e.target.value})}>
                  {
                    this.state.problems.length >= 1 && this.state.problems.map(problem => 
                      <option key = {problem.id} value = {problem.problem}>{problem.problem}</option>
                    )
                  }
                </select>
                <br/>
                <label>Submit a java file:</label>
                <br/>
                <input type="file"  name="submission" accept=".java" onChange = {event => this.saveFile(event)}></input>
                <br/>
                <input type = "submit" value = "Submit Run" onClick = {() => {this.uploadFile()}}/>
            </div>
        </div>   
    );
  }
}