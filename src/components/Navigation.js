import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'
import cookie from 'react-cookies';
const axios = require('axios');

class Navigation extends React.PureComponent
{
    constructor(props){
        super(props);
        this.state = {
            role: undefined,
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
              <div class="nav">
                <Navbar class="nav" fixed="top" >

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
                        <Nav.Link class="judgeclarify" href="/judgeclarify">Clarifications</Nav.Link>
                    </Nav>}
<<<<<<< HEAD

=======
                    <Nav class="timerDisplay" >{this.state.timer}</Nav>
>>>>>>> aa972cd1b8636ab8bb6e9b880e73ebaf2e015f3d
                    {this.state.role &&
                        <Nav className="ml-auto">
                            <Nav.Link class="account" href="/account">Logout</Nav.Link>
                        </Nav>
                    }



                    {!this.state.role && <Nav className="ml-auto">
                        <Nav.Link href="/">Log In</Nav.Link>
                    </Nav>}
                    <div class="the-blur"></div>
                </Navbar>
              </div>
            );

<<<<<<< HEAD
=======

>>>>>>> aa972cd1b8636ab8bb6e9b880e73ebaf2e015f3d
    }
}

export default Navigation;
