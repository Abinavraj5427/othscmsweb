import React from 'react';
import Navigation from './Navigation';
import cookie from 'react-cookies';
const axios = require('axios');



export default class JudgeClarify extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        clarifications: [],
        user: "",
        newQuestion: "",
    }
    this.getQuestions = this.getQuestions.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount(){
      this.setUser();
      this.getQuestions();
  }

  getQuestions(){
    axios.post('http://localhost/othscmsbackend/get_clarifications.php',{})
    .then(result => {
      this.setState({clarifications: result.data});
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
               
                <h2>Recently Asked</h2>
                <table>
                    <tr>
                        <th>Select</th>
                        <th>Team</th>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                    {
                        this.state.clarifications.length >=1 && this.state.clarifications.map(clarification => 
                            <tr>
                                <td>{clarification.team}</td>
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