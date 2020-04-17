import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
// import { connect } from 'react-redux'
import { withRouter } from "react-router";
import Cities from '../config/Cities.json'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Logo from '../media/up-n-up-logo_new-yellow.png'

class NavBar extends Component {
  state={
    city: "",
    redirect: false,
    events: true
  }

  componentDidMount() {

    // console.log(`url: '${window.location.pathname}'`)
    // console.log("Current URL: ",window.location.pathname)
    if (window.location.pathname !== "/") {
      let path = window.location.pathname.split('/')
      let city = path[2].replace(/%20/g, " ")
      this.setState({
        city: city,
        events: false
      })
    }
    else {
      this.setState({
        events: false
      })}
  }

componentDidUpdate(prevProps, prevState){
  if (window.location.pathname !== "/") {
    let path = window.location.pathname.split('/')
    let city = path[2].replace(/%20/g, " ")
    if (prevState.city !== city) {
      this.setState({
        city: city,
        events: false
      })
    }
    if (prevState.city !== this.state.city ){
    // && prevProps.match.url !=="/"
    let path = window.location.pathname.split('/')
    let city = path[2].replace(/%20/g, " ")
    // console.log("City from url: ",city)
    this.setState({
      city: city,
      events: false
    })
    }
  } if (window.location.pathname == "/" && this.state.events==false)  {
      this.setState({
        events: true
      })
  }
}


  createNavList = () => {
    const sections = Cities.map((city, index) => {
      return (
        <NavDropdown.Item as={Link} to={{
            pathname: `/explore/${city}`,
            city: city,
          }}>
          {city}
        </NavDropdown.Item>
      )
    })
    return sections
  }



  render() {
    // console.log("City: ",this.state.city)
    return (
      <>
      <Navbar id="navbar" sticky="top">
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
            {this.createNavList()}
            </NavDropdown>
            <Nav.Link 
              disabled={this.state.events} 
              as={Link} 
              to={{
                pathname: `/events/${this.state.city}`,
                city: this.state.city,
              }}>
              Events
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
        </Navbar>
        </>
    )
  }
}
  
export default withRouter((NavBar));

