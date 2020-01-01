import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Timer from './Timer.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navigation.css';
import cookie from 'react-cookies';
import {ip} from "../network";
const axios = require('axios');

class Navigation extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            role: undefined,
            timer: <Timer />
        }
        this.getRole = this.getRole.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount(){
        this.getRole();
    }

    getRole(){
        var token = cookie.load('auth-token');
        cookie.load('auth-token') &&
        axios.post("http://"+ip+'/othscmsbackend/confirmlogin.php',
        {
            authtoken: token,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          }
        })
        .then(result => {
            this.setState({role: result.data.role})
        }).catch(error => console.log(error))
    }


    handleLogout(){
        cookie.remove('auth-token');
        this.props.logout();
        this.props.history.push('/');
    }

    render(){

            return(

                <Navbar bg="dark" variant="dark" >

                    {this.state.role == "COMPETITOR" && <Navbar.Brand class="home" href="/home">Home</Navbar.Brand>}

                    {this.state.role && <Nav className="mr-auto">
                        <Nav.Link class="leaderboard" href="/leaderboard">Leaderboards</Nav.Link>
                    </Nav>}

                    {this.state.role === "COMPETITOR" &&<Nav className="mr-auto">
                        <Nav.Link class="submission" href="/submit">Submission</Nav.Link>
                    </Nav>}

                    {this.state.role === "COMPETITOR" &&<Nav className="mr-auto">
                        <Nav.Link class="teamclarify" href="/teamclarify">Clarifications</Nav.Link>
                    </Nav>}

                    {this.state.role === "COMPETITOR" &&<Nav className="mr-auto">
                        <Nav.Link class="teamclarify" href="/viewruns">View Runs</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="addusers" href="/addusers">Add Users</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="addprobs" href="/addprobs">Add Problems</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="grade" href="/grade">Grade</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="judgeclarify" href="/judgeclarify">Clarifications</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="timerPage" href="/timer">Timer</Nav.Link>
                    </Nav>}
                    <Nav class="timerDisplay" >{this.state.timer}</Nav>
                    {this.state.role &&
                        <Nav className="ml-auto">
                            <Nav.Link class="account" href="/account">Logout</Nav.Link>
                        </Nav>
                    }



                    {!this.state.role && <Nav className="ml-auto">
                        <Nav.Link href="/">Log In</Nav.Link>
                    </Nav>}
                </Navbar>

            );

    }
}

export default Navigation;
