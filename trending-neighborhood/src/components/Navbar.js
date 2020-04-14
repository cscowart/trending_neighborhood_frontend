import React, { Component } from 'react'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Logo from '../media/up-n-up-logo_new-yellow.png'
import Cities from '../config/Cities.json'

class NavBar extends Component {
  render() {
    return (
      <Navbar id="navbar" > {/*className="bg-transparent" style={{position: 'absolute', top: '0', left: '0', zIndex: '2'}} bg="light" expand="lg"*/}
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
          <Nav id="nav" > {/*className="mr-auto"*/}
            <NavDropdown title="Explore" id="explore-nav-dropdown">
              {Cities.map((city, index) => {
                return (
                  <NavDropdown.Item key={index} href="#action/3.1">{city}</NavDropdown.Item>
                )
              })}
            </NavDropdown>
            {/* <Nav.Link id="nav-link" href="/explore" >Explore</Nav.Link> style={{fontSize: "20px"}} */}
            {/* <ExploreCitySelectDropdown cities={ Cities } city={this.state.city}  handleCitySelect={ this.handleCitySelect }/> */}
            <Nav.Link id="nav-link" href="#link">Events</Nav.Link> {/*style={{fontSize: "20px"}}*/}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar;

