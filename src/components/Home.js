import React from 'react';
import Navigation from './Navigation';



export default class Home extends React.Component 
{
    
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
    }
  }

  componentDidMount(){
    this.props.autoLogin();
  }

  render(){
    return(
        <div>
            <Navigation/>   
            <div>
                <p>Welcome to the OTHS UIL Site</p>
                 <p>If you haven't already, please log in to access all features</p>
            </div>
        </div>   
    );
  }
}