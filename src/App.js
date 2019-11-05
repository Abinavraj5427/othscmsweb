import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <Router>
        <Switch>
          <Route exact path='/leaderboard' component={Leaderboard} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
    );
  }
}
