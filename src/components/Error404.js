import React from 'react';
import Navigation from './Navigation';



export default class Error404 extends React.Component 
{
    
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.authenticated,
    }
  }

  

  render(){
    return(
        <div>
            <Navigation/>   
            <div>
                <h1>ERROR 404</h1>
                <br/>
                <p>DON'T CHEAT THE SYSTEM!!!!!</p>
                <b>The pAgE yOu wErE lOokInG fOr wAs noT fOuNd.</b>
            </div>
        </div>   
    );
  }
}