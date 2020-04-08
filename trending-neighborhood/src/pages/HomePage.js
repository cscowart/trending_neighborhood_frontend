import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
// import CitySelectJumbotron from '../components/CitySelectJumboton';
// import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import { Row, Col } from 'react-bootstrap'
import Cities from '../config/Cities.json';
// import backendAPI from "../api/backendAPI"
import CitySelectDropdown from '../components/CitySelectDropdown'
import defaultIMG from '../images/default.webp'
// import chicagoIMG from '../images/chicago.jpg'
// import nycIMG from '../images/nyc.jpg'
// import austinIMG from '../images/austin.png'
// import atlantaIMG from '../images/atlanta.png'
import ChicagoBackgroundVideo from '../images/ChicagoBackgroundVideo.mp4'


class HomePage extends Component {
  state = {
    backgroundImage: defaultIMG,
    city: "",
    redirect: false,
  }

  handleCitySelect = event => {
    this.setState({
      city: Cities[event],
      redirect: true
    })   
  }

  // componentDidUpdate = (prevState) => {
  //   console.log(prevState)
  //   if (this.state.city !== prevState.city){
  //     switch(this.state.city) {
  //       case "Atlanta":
  //         this.setState({
  //           backgroundImage: atlantaIMG
  //         })
  //         break;
  //       case "Austin":
  //         this.setState({
  //           backgroundImage: austinIMG
  //         })
  //         break;
  //       case "Chicago":
  //         this.setState({
  //           backgroundImage: chicagoIMG
  //         })
  //         break;
  //       case "New York City":
  //         this.setState({
  //           backgroundImage: nycIMG
  //         })
  //         break;
  //       default:
  //         this.setState({
  //           backgroundImage: defaultIMG
  //         })
  //     }
  //   }
  // }


  render() {
    console.log(this.state)
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/explore',
        state: this.state.city,
      }}
      />;
    }
    return (
      <>
      <div style={{
        height: '100%',
        width: '100%',
        float: 'left',
        top: '0',
        padding: 'none',
        position: 'fixed',
        zIndex: '1'
      }}>
      {/* <div> */}
        <video cover loop="true" src={ ChicagoBackgroundVideo } ref="video" type="video/mp4" autoPlay="true" id="vid" muted>
          <source src={ ChicagoBackgroundVideo } ref="video" type="video/mp4"></source>
        </video>
      </div>
      <div style={{position: 'absolute', top: '25%', left: '33%', opacity: '0.7', zIndex: '2' }}>
      
        <h1 className="justify-content-md-center" style={{ color: 'white'}}>Your new neighborhood awaits</h1>
        
        <Row className="justify-content-md-center" >
          <Col></Col>
          <Col md='auto' >
            <CitySelectDropdown cities={ Cities } city={this.state.city}  handleCitySelect={ this.handleCitySelect }/>
          </Col>
          <Col></Col>
        </Row>
      </div>
      </>
    );
  }
}

export default HomePage;