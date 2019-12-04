import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
<<<<<<< HEAD
//import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css'
=======
import 'bootstrap/dist/css/bootstrap.min.css';
import cookie from 'react-cookies';
const axios = require('axios');

//import './Navigation.css'
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
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
<<<<<<< HEAD

    handleLogout(){
        cookie.remove('auth-token');
        this.props.logout();
        this.props.history.push('/');
    }

    render(){

            return(

                <Navbar class="navbar" bg="dark" variant="dark">
<<<<<<< HEAD
                      <Navbar.Brand href="/home">Home</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link class="leaderboard" href="/leaderboard">Leaderboards</Nav.Link>
                    </Nav>

                    <Nav className="mr-auto">
                        <Nav.Link class="submission" href="/submit">Submission</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
                        <Nav.Link class="account" href="/Account">Account</Nav.Link>
                    </Nav>
=======

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
>>>>>>> 12ae097bf82bd737fc2081833f6256045ace4b08

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="addusers" href="/addusers">Add Users</Nav.Link>
                    </Nav>}

                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="addprobs" href="/addprobs">Add Problems</Nav.Link>
                    </Nav>}

=======

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

>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
                    {this.state.role === "JUDGE" &&<Nav className="mr-auto">
                        <Nav.Link class="judgeclarify" href="/judgeclarify">Clarifications</Nav.Link>
                    </Nav>}

                    {this.state.role &&
                        <Nav className="ml-auto">
                            <Nav.Link class="account" href="/account">Logout</Nav.Link>
                        </Nav>
                    }

<<<<<<< HEAD

=======
                    
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7

                    {!this.state.role && <Nav className="ml-auto">
                        <Nav.Link href="/">Log In</Nav.Link>
                    </Nav>}

                </Navbar>
<<<<<<< HEAD

            );

=======
           
            );
        
>>>>>>> 126659ad500000c045322f82b804b3be5479e5d7
    }
}

export default Navigation;
