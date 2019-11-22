import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends React.PureComponent
{
    render()
    {
        var authenticated = true;
        if(authenticated)
        {
            return(
                <Navbar bg="dark" variant="dark">

                    <Navbar.Brand href="/home">Home</Navbar.Brand>

                    <Nav className="mr-auto">
                        <Nav.Link href="/leaderboard">Leaderboards</Nav.Link>
                    </Nav>

                    <Nav className="mr-auto">
                        <Nav.Link href="/submit">Submission</Nav.Link>
                    </Nav>

                    <Nav className="ml-auto">
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

                    <Nav className="ml-auto">
                        <Nav.Link href="/Login">Log In</Nav.Link>
                    </Nav>

                </Navbar>
            );
        }
    }
}

export default Navigation;
