import React from 'react';
<<<<<<< HEAD
=======
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
>>>>>>> 4a36f597e6297887a50dd0623af1f2dc662643aa
import Login from './components/Login';
import Leaderboard from './components/Leaderboard';
import Account from './components/Account';
import Home from './components/Home';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
<<<<<<< HEAD
      <Login/>
      
=======
      <Router>
        <Switch>
          <Route exact path='/leaderboard' component={Leaderboard} />
          <Route exact path='/account' component={Account} />
          <Route exact path='/home' component={Home} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
>>>>>>> 4a36f597e6297887a50dd0623af1f2dc662643aa
    );
  }
}
