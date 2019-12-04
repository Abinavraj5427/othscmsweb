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
        clarID: undefined,
<<<<<<< HEAD
    }
    this.getQuestions = this.getQuestions.bind(this);
    this.setUser = this.setUser.bind(this);
=======
        message: "",
    }
    this.getQuestions = this.getQuestions.bind(this);
    this.setUser = this.setUser.bind(this);
    this.updateAnswer = this.updateAnswer.bind(this);
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
  }

  componentDidMount(){
      this.setUser();
      this.getQuestions();
<<<<<<< HEAD
=======

  }

  updateAnswer(){
    axios.post('http://localhost/othscmsbackend/answer_clarification.php',{
        id: this.state.clarID,
        answer: this.state.answer,
    })
    .then(result => {
      console.log(result);
      this.getQuestions();
      this.setState({message: "Successfully answered question "+this.state.clarID, answer: ""});
    })
    .catch(error => console.log(error));
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
  }

  getQuestions(){
    axios.post('http://localhost/othscmsbackend/get_clarifications.php',{})
    .then(result => {
<<<<<<< HEAD
=======
      !this.state.clarID && this.setState({clarID: result.data[0].id});
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
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
<<<<<<< HEAD
               
                <h2>Answer Questions</h2>

                <b>Problem ID: </b>
=======
                
                <h2>Answer Questions</h2>

                <b>Question ID: </b>
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
                <select onChange  = {(e) => this.setState({clarID: e.target.value})}>
                  {
                    this.state.clarifications.length >= 1 && this.state.clarifications.map(clar => 
                      <option key = {clar.id} value = {clar.id}>{clar.id}</option>
                    )
                  }
                </select>

<<<<<<< HEAD
                <input type = "text" placeholder = "Answer"/>
                <input type = "submit" onClick = {() =>{}}/>
                <h2>Recently Asked</h2>
                <table>
                    <tr>
                        <th>Problem ID</th>
=======
                <input type = "text" placeholder = "answer" value = {this.state.answer} onChange={event => this.setState({answer: event.target.value})}/>
                <input type = "submit" onClick = {() =>{this.updateAnswer()}}/>
                
                <h4>{this.state.message}</h4>

                <h2>Recently Asked</h2>
                <table>
                    <tr>
                        <th>Question ID</th>
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
                        <th>Team</th>
                        <th>Question</th>
                        <th>Answer</th>
                    </tr>
                    {
                        this.state.clarifications.length >=1 && this.state.clarifications.map(clarification => 
                            <tr>
                                <td>{clarification.id}</td>
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