import React from 'react';
import Navigation from './Navigation';
import {ip} from "../network";
import "../styles/tablestyles.css";
import "../styles/darkmode.css";
const axios = require('axios');




export default class AddProbs extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        problems: [],
        newProbName: "",
    }
    this.getProblems = this.getProblems.bind(this);
    this.addProblem = this.addProblem.bind(this);
    this.deleteProblem = this.deleteProblem.bind(this);
  }

  componentDidMount(){
      this.getProblems();
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
    })
    .catch(error => console.log(error));
  }

  addProblem(problem){
    this.setState({newProbName: ""})
    console.log(problem);
    axios.post("http://"+ip+'/othscmsbackend/change_probs.php',{
        problem: problem,
        append: true,
    })
    .then(result => {
      console.log(result);
      this.getProblems();
    })
    .catch(error => console.log(error));
  }

  deleteProblem(problem){
    console.log(problem);
    axios.post("http://"+ip+'/othscmsbackend/change_probs.php',{
        problem: problem,
        append: false,
    })
    .then(result => {
      console.log(result);
      this.getProblems();
    })
    .catch(error => console.log(error));
  }

  render()
  {
    return(
        <div>
            <Navigation/>   
            <div>
                <h1>Add Problems</h1>
                <hr/>
                <h2>New Problem</h2>
                <input type = "text"  value = {this.state.newProbName} onChange={event => this.setState({newProbName: event.target.value})}/>
                <input type = 'submit' value = "Add Problem" onClick = {() => this.addProblem(this.state.newProbName)}/>

                <h2>Problem List</h2>
                <table class = "container">
                    <tr>   
                      <th>Problem</th>
                      <th>Delete</th>
                    </tr>
                    {
                      this.state.problems.length >=1 && this.state.problems.map(problem =>  
                        <tr>
                          <td>{problem.problem}</td>
                          <td>
                            <input type = 'submit' value = "DELETE" onClick = {() => {this.deleteProblem(problem.problem)}}/>
                          </td>
                        </tr>
                      )
                    }
                </table>
                
            </div>
        </div>   
    );
  }
}