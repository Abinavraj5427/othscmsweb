import React from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';
import cookie from 'react-cookies';
const axios = require('axios');



export default class Submission extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        authenticated: this.props.authenticated,
    }
  }

  componentDidMount(){
    this.props.autoLogin();
  }

  render()
  {
    return(
        <div>
            <Navigation/>   
            <div>
                <p>Submission</p>
                 <p>If you haven't already, please log in to access all features</p>
            </div>
        </div>   
    );
  }
}