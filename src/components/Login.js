import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'' };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){

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
        <Link to='/leaderboard'><input type='submit' onclick={this.handleClick}/></Link>
      </div>
    );
  }
}
