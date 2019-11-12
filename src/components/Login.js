import React from 'react';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import loginstyles from './Login.css';
const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'', response: '',authenticated:false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    var token = cookie.load('auth-token');
    cookie.load('auth-token') &&
    axios.post('http://localhost/othscmsbackend/confirmlogin.php',
      {
        authtoken: token,
      })
      .then(result => {
        console.log(result);
        this.setState({authenticated: result.data.authenticated});
      }).catch(error => console.log(error))
  }

  handleClick(){
    axios.post('http://localhost/othscmsbackend/login.php',
            {
              username: this.state.username,
              password: this.state.password,
            })
            .then(result => {
              console.log(result);
              this.setState({authenticated:result.data.authenticated});
              cookie.save('auth-token', result.data.auth_key);
            })
            .catch(error => console.log(error));
  }

  render(){

    return(

      <div class="blurred-box">
        <div class="user-login-box">
          <div style = {loginstyles}>
            <h1>Login</h1>
            <br/>
            <input placeholder = "Username" style = {{margin: 10}} type = 'text' value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
            <br/>
            <input placeholder = "Password" style = {{margin: 10}} type = 'text' value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
            <br/>
            {this.state.authenticated && <Redirect push to="/home" />}
            <input type = "submit" onClick = {() => {this.handleClick()}}/>
          </div>
        </div>
      </div>

    );
  }
}
