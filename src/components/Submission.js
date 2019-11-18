import React from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
const axios = require('axios');



export default class Submission extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        authenticated: this.props.authenticated,
        file: undefined,
        problems: ["Problem 1", "Problem 2", "Problem 3"],
        problemVal:undefined,
    }
    this.saveFile = this.saveFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.getProblems = this.getProblems.bind(this);
  }

  componentDidMount(){
    this.props.autoLogin();
    this.getProblems();
    this.setState({problemVal: this.state.problems[0]});
  }

  saveFile = (event) => {
    this.setState({file: event.target.files[0]});
  }

  uploadFile(){
    axios.post('http://localhost/othscmsbackend/upload.php', {
      file: this.state.file,
      problem: this.state.problemVal,
    }).then(result=>{
      console.log(result);
    }).catch(error => console.log(error));
  }

  getProblems(){
    axios.post('http://localhost/othscmsbackend/get_problems.php',{})
    .then(result => {
      this.setState({problems: result});
    })
    .catch(error => console.log(error));
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
                    this.state.problems.map(problem => 
                      <option value = {problem}>{problem}</option>
                    )
                  }
                </select>
                <br/>
                <label>Submit a java file:</label>
                <br/>
                <input type="file" name="submission" accept=".java" onChange = {event => this.saveFile(event)}></input>
                <br/>
                <input type = "submit" value = "Submit Run" onClick = {() => {this.uploadFile()}}/>
            </div>
        </div>   
    );
  }
}