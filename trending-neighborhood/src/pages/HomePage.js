import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
// import CitySelectJumbotron from '../components/CitySelectJumboton';
// import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import { Row, Col } from 'react-bootstrap'
import Cities from '../config/Cities.json';
// import backendAPI from "../api/backendAPI"
import CitySelectDropdown from '../components/CitySelectDropdown'
import defaultIMG from '../media/default.webp'
// import chicagoIMG from '../media/chicago.jpg'
// import nycIMG from '../media/nyc.jpg'
// import austinIMG from '../media/austin.png'
// import atlantaIMG from '../media/atlanta.png'

import NYBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import LABackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import HoustonBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import PhoenixBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import PhiladelphiaBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import ColumbusBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import WashingtonDCBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import defaultBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import ChicagoBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import { geolocated } from "react-geolocated";



class HomePage extends Component {
  state = {
    backgroundImage: defaultIMG,
    backgroundVideo: defaultBackgroundVideo,
    videoChange: false,
    closestCity: "",
    city: "",
    redirect: false,
  }
  
  handleCitySelect = event => {
    this.setState({
      city: Cities[event],
      redirect: true
    })   
  }
  
  // componentDidMount= () => {
  
    
  

  componentDidUpdate = () => {

    let distance=0
    let R=0

    const coordinates = [
      ['New York', 40.6635, -73.9387],
      ['Los Angeles', 34.0194, -118.4108],
      ['Chicago', 41.881832, -87.623177],
      ['Houston', 29.7866, -95.3909],
      ['Phoenix', 33.5722, -112.0901],
      ['Philadelphia', 40.0094, -75.1333],
      ['Columbus', 39.9852, -82.9848],
      ['Washington DC', 38.9041, -77.0172]
    ]

    let distances = {
      'New York': 0,
      'Los Angeles':0,
      'Chicago': 0,
      'Houston': 0,
      'Phoenix': 0,
      'Philadelphia':0,
      'Columbus':0,
      'Washington DC':0
    }
    let backgroundVideo = "defaultBackGroundVideo"
  
  
      {coordinates.map((cityCoords)=> {
        let lat1 = this.props.coords.latitude
        let lon1 = this.props.coords.longitude
        
        let lat2 = cityCoords[1]
        let lon2 = cityCoords[2]
        
        R = 6371000; // meters -- to convert to miles / 1609
        let φ1 = lat1*Math.PI/180;
        let φ2 = lat2*Math.PI/180;
        let Δφ = (lat2-lat1)*Math.PI/180;
        let Δλ = (lon2-lon1)*Math.PI/180;
        let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        distance = parseInt(R * c);
        distances[cityCoords[0]]=distance
        let keys = Object.keys(distances);
        let lowest = Math.min.apply(null, keys.map(function(x) { return distances[x]} ));
        let closest  = keys.filter(function(y) { return distances[y] === lowest });
        this.setState({closestCity: closest[0]})
        console.log("Closest City: ", closest[0])
      })}
      
       
      switch(this.state.closestCity) {
        case 'New York': this.setState({backgroundVideo: NYBackgroundVideo}); break;
        case'Los Angeles': this.setState({backgroundVideo: LABackgroundVideo}); break;
        case'Chicago': this.setState({backgroundVideo: ChicagoBackgroundVideo}); break;
        case'Houston': this.setState({backgroundVideo: HoustonBackgroundVideo}); break;
        case'Phoenix': this.setState({backgroundVideo: PhoenixBackgroundVideo}); break;
        case'Philadelphia': this.setState({backgroundVideo: PhiladelphiaBackgroundVideo}); break;
        case'Columbus': this.setState({backgroundVideo: ColumbusBackgroundVideo}); break;
        case'Washington DC': this.setState({backgroundVideo: WashingtonDCBackgroundVideo}); break;
        default: this.setState({backgroundVideo: defaultBackgroundVideo})
      console.log("New Background Video: ", this.state.backgroundVideo)
      }
      }
  
      
      // console.log(BackgroundVideo)

// const coordinates = {
//   'Chicago': [41.881832, -87.623177]
// }
  

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
        float: 'center',
        top: '0',
        padding: 'none',
        position: 'fixed',
        zIndex: '1'
      }}>
      {/* <div> */}
        <video cover loop="true" src={ this.state.backgroundVideo } ref="video" type="video/mp4" autoPlay="true" id="vid" muted>
          <source src={ this.state.backgroundVideo } ref="video" type="video/mp4"></source>
        </video>
      </div>
      <div style={{position: 'absolute', top: '25%', left: '33%', opacity: '0.7', zIndex: '2' }}>
      
        <h1 className="justify-content-md-center" style={{ color: 'white'}}> Your new city awaits in</h1>
        
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

export default 
geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(HomePage);