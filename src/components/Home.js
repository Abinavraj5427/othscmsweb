import React from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';



export default class Home extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
  }

  render()
  {
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