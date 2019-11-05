import React from 'react';

const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'' };
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
        <input type = "submit" 
          onClick = {() => 
            axios.post('http://localhost/othscmsbackend/login.php',
            {
              username: this.state.username,
              password: this.state.password,
            })
            .then(result => console.log(result))
            .catch(error => console.log(error))
          }/>
      </div>
    );
  }
}

