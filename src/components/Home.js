import React from 'react';
import Navigation from './Navigation';
import "../styles/darkmode.css";



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
                <h2>Welcome to the OTHS UIL Site</h2>
                <br/>
                <p>Enter your school name:</p>
                <input type = "text" placeholder = "school"/>
                <input type = "submit" />
                <br/>
                <p>Enter Team Members:</p>
                <input type = "text" placeholder = "Member 1"/>
                <input type = "submit" />
                <br/>
                <input type = "text" placeholder = "Member 2"/>
                <input type = "submit" />
                <br/>
                <input type = "text" placeholder = "Member 3"/>
                <input type = "submit" />
            </div>
        </div>   
    );
  }
}