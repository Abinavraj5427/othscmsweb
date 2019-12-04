import React from 'react';
import Navigation from './Navigation';
import cookie from 'react-cookies';
import {Redirect} from 'react-router-dom';

export default class Account extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
    }
    this.handleLogout =this.handleLogout.bind(this);
  }

  componentDidMount(){
    this.props.autoLogin();
  }

  handleLogout(){
    cookie.remove('auth-token');
    this.props.logout();
    //this.setState({authenticated:false});
    this.props.history.push('/');
  }

  render()
  {
    //console.log("render"+this.props.authenticated);
    return(
        <div>
            <Navigation/>
            <div>
                <h2>Account</h2>
                <input type = "submit" value = "LOGOUT" onClick = {() => {this.handleLogout()}}></input>
            </div>
        </div>
    );
  }
}
