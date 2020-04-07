import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import Logo from '../images/up-n-up-logo_new-yellow.png'


class NavBar extends Component {
  render() {
    return (
      <Navbar className="bg-transparent" style={{position: 'absolute', top: '0', left: '0', zIndex: '2'}} bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img style={{opacity: 'none'}}
            src={Logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
            alt="Up n Up logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/explore" style={{
              fontSize: "20px"
            }}>Explore</Nav.Link>
            <Nav.Link href="#link"style={{
              fontSize: "20px"
            }}>Events</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;

