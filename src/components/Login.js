import React from 'react';
import {BrowserRouter as Link, Redirect} from 'react-router-dom';

const axios = require('axios');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username:'', password:'', response: '',authenticated:false };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(){
<<<<<<< HEAD
    axios.post('http://localhost/othscmsbackend/login.php',
            {
              username: this.state.username,
              password: this.state.password,
            })
            .then(result => {

              if(result.data=='success')this.setState({authenticated:true});
              console.log(this.state.authenticated);
              console.log(result);
            })
            .catch(error => console.log(error));


=======
    axios({
        method: 'post',
        url: 'http://localhost/othscmsbackend/login.php',
        data: {
          username: this.state.username,
          password: this.state.password,
        },
    }) .then((res) => console.log(res.data))
    .catch(error => console.log(error))
>>>>>>> dbd210906993ae5b410e1facba50c432f15c6091
  }

  render(){
    return(
      <div>
        <h1>Login</h1>
        <br/>
        <input placeholder = "Username" value={this.state.username} onChange={event => this.setState({username: event.target.value})}/>
        <br/>
        <input placeholder = "Password" value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
        <br/>
        <p>{this.state.username}</p>
        <p>{this.state.password}</p>
        {this.state.authenticated && <Redirect to='/leaderboard' />}
        <input type='submit' onClick={this.handleClick}/>
      </div>
    );
  }
}
