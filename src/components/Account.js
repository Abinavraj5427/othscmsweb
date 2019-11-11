import React from 'react';
import Navigation from './Navigation';
import Button from 'react-bootstrap/Button';
import cookie from 'react-cookies';



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
                  <input type = "submit" value = "LOGOUT" onClick = {() => {cookie.remove('auth-token'); console.log(cookie.load('auth-token'))}}></input>

            </div>
        </div>
    );
  }
}
