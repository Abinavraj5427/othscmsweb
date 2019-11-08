import React from 'react';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';

const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'', response: '',authenticated:false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    axios.post('http://localhost/othscmsbackend/login.php',
            {
              username: this.state.username,
              password: this.state.password,
            })
            .then(result => {

              this.setState({authenticated:result.data.authenticated});
              cookie.save('auth-token', result.data.auth_key);
              console.log(result);
              console.log(cookie.load('auth-token'));
            })
            .catch(error => console.log(error));
  }
  render(){

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
        {this.state.authenticated && <Redirect to='/leaderboard' />}
        <input type='submit' onClick={this.handleClick}/>
      </div>
      
      
    );
    
  }
}
