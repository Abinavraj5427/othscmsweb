import React from 'react';
import Navigation from './Navigation';
import cookie from 'react-cookies';
const axios = require('axios');



export default class TeamClarify extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        clarifications: [],
        problems: [],
        problemVal:undefined,
        user: "",
        newQuestion: "",
    }
    this.getQuestions = this.getQuestions.bind(this);
    this.addQuestions = this.addQuestions.bind(this);
    this.getProblems = this.getProblems.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount(){
      this.setUser();
      this.getProblems();
      this.getQuestions();
  }

  getQuestions(){
    axios.post('http://localhost/othscmsbackend/get_clarifications.php',{})
    .then(result => {
      this.setState({clarifications: result.data});
    })
    .catch(error => console.log(error));
  }

  addQuestions(question){
    this.setState({newQuestion: ""});
    axios.post('http://localhost/othscmsbackend/add_clarification.php',{
        team: this.state.user,
        question: question,
        problem: this.state.problemVal,
    })
    .then(result => {
      console.log(result);
      this.getQuestions();
    })
    .catch(error => console.log(error));
  }


  getProblems(){
    axios.post('http://localhost/othscmsbackend/get_problems.php',{})
    .then(result => {
      this.setState({problems: result.data});
      result.data.length >=1 && this.setState({problemVal: result.data[0].problem});
    })
    .catch(error => console.log(error));
  }

  setUser(){
    var token = cookie.load('auth-token');
    cookie.load('auth-token') &&
    axios.post('http://localhost/othscmsbackend/confirmlogin.php',
      {
        authtoken: token,
      })
      .then(result => {
        //console.log(result.data.team);
        this.setState({user: result.data.team})
      }).catch(error => console.log(error))
      //console.log("Authenticated: " +this.state.authenticated);
  }

  render()
  {
    return(
        <div>
            <Navigation/>   
            <div>
                <h1>Clarifications</h1>
                <hr/>
                <h2>New Question</h2>

                <select onChange  = {(e) => this.setState({problemVal: e.target.value})}>
                  {
                    this.state.problems.length >= 1 && this.state.problems.map(problem => 
                      <option key = {problem.id} value = {problem.problem}>{problem.problem}</option>
                    )
                  }
                </select>

                <input type = "text" placeholder = "question" value = {this.state.newQuestion} onChange={event => this.setState({newQuestion: event.target.value})}/>
                <input type = 'submit' value = "Add Question" onClick = {() => this.addQuestions(this.state.newQuestion)}/>
                
                <h2>Recently Asked</h2>
                <table>
                    <tr>
                        <th>Team</th>
                        <th>Problem</th>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                    {
                        this.state.clarifications.length >=1 && this.state.clarifications.map(clarification => 
                            <tr>
                                <td>{clarification.team}</td>
                                <td>{clarification.problem}</td>
                                <td>{clarification.question}</td>
                                <td>{clarification.answer}</td>
                            </tr>
                        )
                    }
                </table>
                
            </div>
        </div>   
    );
  }
}