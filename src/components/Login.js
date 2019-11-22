import React from 'react';
import cookie from 'react-cookies';
import loginstyles from './Login.css';
import {BrowserRouter as Redirect} from 'react-router-dom';
const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'', response: ''};
    this.handleClick = this.handleClick.bind(this);
    console.log(this.props.authenticated + " ");
  }

  componentDidMount(){
    console.log(this.props.authenticated);
    this.props.autoLogin();
    console.log(this.props.authenticated);
  }

  handleClick(){
    axios.post('http://localhost/othscmsbackend/login.php',
            {
              username: this.state.username,
              password: this.state.password,
            })
            .then(result => {
              console.log(result);
              this.props.login();
              cookie.save('auth-token', result.data.auth_key);
            })
            .catch(error => console.log(error));
  }

  render(){
    return(
      <div class = "login-styling">
        <div class="blurred-box">
          <div class="user-login-box">
            <div style = {loginstyles}>
              <h1>Login</h1>
              <br/>
              <input class="username" placeholder = "Username" style = {{margin: 10}} type = 'text' value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
              <br/>
              <input class="password" placeholder = "Password" style = {{margin: 10}} type = 'password' value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
              <br/>
              <input type = "submit" onClick = {() => {this.handleClick()}} ></input>
              {this.props.authenticated && <Redirect to="/home" />}
            {/* <form action= {this.handleClick()}>
              <input class="button" type="image"  src={require('./entericon.jpg')}  height="25" width="25"/>
            </form> */}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
