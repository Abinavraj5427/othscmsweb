import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Timer from './Timer';
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'react-cookies';
const axios = require('axios');

//import './Navigation.css'
class Navigation extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            role: undefined,
            timer:<Timer/>
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
        axios.post('http://localhost/othscmsbackend/confirmlogin.php',
        {
            authtoken: token,
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

                <Navbar class="navbar" bg="dark" variant="dark">

                    {this.state.role && <Navbar.Brand class="home" href="/home">Home</Navbar.Brand>}

                    {this.state.role && <Nav className="mr-auto">
                        <Nav.Link class="leaderboard" href="/leaderboard">Leaderboards</Nav.Link>
                    </Nav>}

                    {this.state.role === "COMPETITOR" &&<Nav className="mr-auto">
                        <Nav.Link class="submission" href="/submit">Submission</Nav.Link>
                    </Nav>}

                    {this.state.role === "COMPETITOR" &&<Nav className="mr-auto">
                        <Nav.Link class="teamclarify" href="/teamclarify">Clarifications</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="addusers" href="/addusers">Add Users</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="addprobs" href="/addprobs">Add Problems</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="timer" href="/timer">Timer Settings</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="judgeclarify" href="/judgeclarify">Clarifications</Nav.Link>
                    </Nav>}
                    <Nav className="ml-auto">{this.state.timer}</Nav>
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
