import React from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
const axios = require('axios');



export default class AddProbs extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        problems: [""],
    }
    this.getProblems = this.getProblems.bind(this);
  }

  componentDidMount(){
      this.getProblems();
  }

  getProblems(){
    axios.post('http://localhost/othscmsbackend/get_problems.php',{})
    .then(result => {
      this.setState({problems: result.data});
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
                <input type = "text"/>
                <input type = 'submit' value = "Add Problem"/>

                <h2>Problem List</h2>
                <ul>
                    {
                        this.state.problems.map(problem => 
                            <div>
                                <li>{problem.problem}</li>
                                <input type = 'submit' value = "DELETE"/>
                            </div>
                        )
                    }
                </ul>
                
            </div>
        </div>   
    );
  }
}