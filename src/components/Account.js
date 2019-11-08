import React from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';



export default class Account extends React.Component
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
                <h2>Account</h2>
            </div>
        </div>
    );
  }
}
