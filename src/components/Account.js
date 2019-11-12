import React from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import cookie from 'react-cookies';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
const axios = require('axios');

export default class Account extends React.Component
{

  constructor(props)
  {
    super(props);
    this.state = {
      authenticated: true,
    }
    this.handleLogout =this.handleLogout.bind(this);
  }

  componentDidMount(){
    axios.post('http://localhost/othscmsbackend/confirmlogin.php',
      {
        authtoken: cookie.load('auth-token'),
      })
      .then(result => {
        console.log(result);
        this.setState({authenticated: result.data.authenticated});
      })
  }

  handleLogout(){
    cookie.remove('auth-token'); 
    this.setState({authenticated: false});
  }

  render()
  {
    return(
        <div>
            <Navigation/>
            <div>
                <h2>Account</h2>
                {!this.state.authenticated && <Redirect push to="/" />}
                <input type = "submit" value = "LOGOUT" onClick = {() => {this.handleLogout()}}></input>

            </div>
        </div>
    );
  }
}
