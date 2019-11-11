import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends React.PureComponent
{
    render()
    {
        var authenticated = true;
        if(authenticated == true)
        {
            return(
                <Navbar bg="dark" variant="dark">

                    <Navbar.Brand href="/home">Home</Navbar.Brand>

                    <Nav className="mr-auto">
                        <Nav.Link href="/Leaderboard">Leaderboards</Nav.Link>
                    </Nav>

                    <Nav pullRight className="ml-auto">
                        <Nav.Link href="/Account">Account</Nav.Link>  
                    </Nav>

                </Navbar>
            );
        }
        else
        {
            return(
                <Navbar bg="dark" variant="dark">

                    <Navbar.Brand href="/home">Home</Navbar.Brand>

                    <Nav pullRight className="ml-auto">
                        <Nav.Link href="/Login">Log In</Nav.Link>
                    </Nav>

                </Navbar>
            );
        }
    }
}

export default Navigation;
