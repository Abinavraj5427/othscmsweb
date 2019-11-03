import React from 'react';
import './App.css';
import Login from './components/Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return(
      <Login/>
    );
  }
}

