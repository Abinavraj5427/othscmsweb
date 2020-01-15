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
        file: null,
        problems: [],
        problemVal:undefined,
        time: 0
    }
    this.saveFile = this.saveFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.getProblems = this.getProblems.bind(this);
    this.updateTime = this.updateTime.bind(this);
    setInterval(500, this.updateTime);
  }

  updateTime(){
    axios.post('http://'+ip+'/othscmsbackend/timer.php', {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({timeSeconds:result.data});
    }).catch(error => console.log(error));
    this.getProblems();
  }

  componentDidMount(){
    this.props.autoLogin();

    axios.post('http://'+ip+'/othscmsbackend/timer.php', {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    }).then(result=>{
      this.setState({timeSeconds:result.data});
    }).catch(error => console.log(error));


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

    axios.post("http://"+ip+'/othscmsbackend/upload.php', formData, config)
    .then(this.setState({message: "successfully submitted file"}))
    .catch(error => {
      console.log(error)
      this.setState({message: "failed to submit file"})
    });
    this.setState({file: null});
    this.refs.fileSubmit.value = null;
  }

  getProblems(){
    axios.post("http://"+ip+'/othscmsbackend/get_problems.php',{},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      console.log(this.state);
      this.setState({problems: result.data});
      if(this.state.timeSeconds<=0){
        let i;
        for(i = 0; i<result.data.length; i++){
          console.log(result.data[i].problem);
          if(result.data[i].problem.localeCompare("DryRun")==0){
            this.setState({problems: [result.data[i]]});
            break;
          }
      }
      }

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
                <form>
                  <input type="file" ref = "fileSubmit" name="submission" accept=".java" onChange = {event => this.saveFile(event)}></input>
                </form>
                <br/>
                {this.props.time>0 && <input type = "submit" value = "Submit Run" onClick = {() => {this.uploadFile()}}/>}
                {this.props.time<=0 && <input type = "submit" value = "Submit Run" onClick = {() => {this.uploadFile()}} disabled/>}
                <h2>{this.state.message}</h2>
            </div>
        </div>
    );
  }
}
