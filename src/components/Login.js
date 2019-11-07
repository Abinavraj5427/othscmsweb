import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'', authenticated: false };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
    axios({
        method: 'post',
        url: 'http://localhost/othscmsbackend/login.php',
        data: {
          username: this.state.username,
          password: this.state.password,
        },
    }) .then((res) => console.log(res.data))
    .catch(error => console.log(error))
  }

  render(){
    
   
   
    let button = '/';
    if(this.state.authenticated)button = '/leaderboard';
    return(  
      
      <div>
        <h1>Login</h1>
        <br/>
        <input placeholder = "Username" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
        <br/>
        <input placeholder = "Password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
        <br/>
        
        <p>{this.state.username}</p>
        <p>{this.state.password}</p>

        <Link to={button}><input type='submit' onClick={this.handleClick}/></Link>
      </div>
      
      
    );
    
  }
}
