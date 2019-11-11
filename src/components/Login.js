import React from 'react';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
import './Login.css';
const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'', response: '',authenticated:false };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    console.log(cookie.load('auth-token'));
    axios.get('http://localhost/othscmsbackend/confirmlogin.php',
      {
        token: cookie.load('auth-token'),
      })
      .then(result => {
        this.setState({authenticated: result.data.authenticated});
        console.log(result.data.authenticated);
      })
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

      //<div class="blurred-box">
        <div>
          <h1>Login</h1>
          <br/>
          <input placeholder = "Username" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
          <br/>
          <input placeholder = "Password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
          <br/>
          <input type = "submit" onClick = {() => {this.handleClick()}}/>
        </div>
      //</div>

    );
  }
}
