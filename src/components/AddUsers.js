import React from 'react';
import Navigation from './Navigation';
import {ip} from "../network";
import "../styles/tablestyles.css";
import "../styles/darkmode.css";
const axios = require('axios');



export default class AddUsers extends React.Component 
{
    
  constructor(props) 
  {
    super(props);
    this.state = {
        users: [],
        newUser: "",
        newPass: "",
        newRole: "COMPETITOR",
    }
    this.getTeams = this.getTeams.bind(this);
    this.addTeam = this.addTeam.bind(this);
    this.deleteTeam = this.deleteTeam.bind(this);
  }

  componentDidMount(){
      this.getTeams();
  }

  getTeams(){
    axios.post("http://"+ip+'/othscmsbackend/get_teams.php',{},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      this.setState({users: result.data});
    })
    .catch(error => console.log(error));
  }

  addTeam(user, pass, role){
    this.setState({newUser: "", newPass: "", newRole: "COMPETITOR"})
    console.log(user);
    axios.post("http://"+ip+'/othscmsbackend/change_teams.php',{
        username: user,
        password: pass,
        role: role,
        append: true,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      console.log(result);
      this.getTeams();
    })
    .catch(error => console.log(error));
  }

  deleteTeam(user){
    console.log(user);
    axios.post("http://"+ip+'/othscmsbackend/change_teams.php',{
        username: user,
        password: "",
        role: "",
        append: false,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
    .then(result => {
      console.log(result);
      this.getTeams();
    })
    .catch(error => console.log(error));
  }


  render()
  {
    return(
        <div>
            <Navigation/>   
            <div>
                <h1>Add Users</h1>
                <hr/>
                <h2>New Users</h2>
                <input type = "text" placeholder = "username" value = {this.state.newUser} onChange={event => this.setState({newUser: event.target.value})}/>
                <input type = "text" placeholder = "password" value = {this.state.newPass} onChange={event => this.setState({newPass: event.target.value})}/>
                <input type = "text" placeholder = "role" value = {this.state.newRole} onChange={event => this.setState({newRole: event.target.value})}/>
                <input type = 'submit' value = "Add User" onClick = {() => this.addTeam(this.state.newUser, this.state.newPass, this.state.newRole)}/>
                
                <h2>User List</h2>
                <table class = "container">
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Delete</th>
                    </tr>
                    {
                        this.state.users.length >=1 && this.state.users.map(user => 
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                                <td><input type = 'submit' value = "DELETE" onClick = {() => {this.deleteTeam(user.username)}}/></td>
                            </tr>
                        )
                    }
                </table>
                
            </div>
        </div>   
    );
  }
}