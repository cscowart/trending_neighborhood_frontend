import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Cities from '../config/Cities.json';
// import backendAPI from "../api/backendAPI"
import CitySelectDropdown from '../components/CitySelectDropdown'
import defaultIMG from '../media/default.webp'

import NYBackgroundVideo from '../media/NYBackgroundVideo.mp4'
import LABackgroundVideo from '../media/LABackgroundVideo.mp4'
import HoustonBackgroundVideo from '../media/HoustonBackgroundVideo.mp4'
import PhoenixBackgroundVideo from '../media/PhoenixBackgroundVideo.mp4'
import PhiladelphiaBackgroundVideo from '../media/PhiladelphiaBackgroundVideo.mp4'
import DenverBackgroundVideo from '../media/DenverBackgroundVideo.mp4'
import WashingtonDCBackgroundVideo from '../media/WashingtonDCBackgroundVideo.mp4'
import ChicagoBackgroundVideo from '../media/ChicagoBackgroundVideo.mp4'
import defaultBackgroundVideo from '../media/defaultBackgroundVideo.mp4'
import { geolocated } from "react-geolocated";

class HomePage extends Component {
  state = {
    backgroundVideo: defaultBackgroundVideo,
    videoChange: 0,
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
  
  componentDidMount= () => {let count=0}
  
  componentDidUpdate = () => {
    
    if (this.state.videoChange<2){
      this.setState({videoChange: this.props.videoChange+1})

    let distance=0
    let R=0
    // Chicago
    const coordinates = [
      ['New York', 40.6635, -73.9387],
      ['Los Angeles', 34.0194, -118.4108],
      ['Chicago', 41.881832, -87.623177],
      ['Houston', 29.7866, -95.3909],
      ['Phoenix', 33.5722, -112.0901],
      ['Philadelphia', 40.0094, -75.1333],
      ['Denver',  39.7619,  -104.8811],
      ['Washington DC', 38.9041, -77.0172]
    ]

    let distances = {
      'New York': 0,
      'Los Angeles':0,
      'Chicago': 0,
      'Houston': 0,
      'Phoenix': 0,
      'Philadelphia':0,
      'Denver':0,
      'Washington DC':0
    }

  if (this.props.coords) {
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
        console.log("Closest City: ", this.state.closestCity)
      })}
      
       
      switch(this.state.closestCity) {
        case 'New York': this.setState({backgroundVideo: NYBackgroundVideo}); break;
        case'Los Angeles': this.setState({backgroundVideo: LABackgroundVideo}); break;
        case'Chicago': this.setState({backgroundVideo: ChicagoBackgroundVideo}); break;
        case'Houston': this.setState({backgroundVideo: HoustonBackgroundVideo}); break;
        case'Phoenix': this.setState({backgroundVideo: PhoenixBackgroundVideo}); break;
        case'Philadelphia': this.setState({backgroundVideo: PhiladelphiaBackgroundVideo}); break;
        case'Denver': this.setState({backgroundVideo: DenverBackgroundVideo}); break;
        case'Washington DC': this.setState({backgroundVideo: WashingtonDCBackgroundVideo}); break;
        default: this.setState({backgroundVideo: defaultBackgroundVideo})
        this.setState({videoChange: this.state.videoChange+1})
      }}}}

  render() {
    console.log(this.state)
    if (this.state.redirect) {
      return <Redirect to={{
          pathname: '/explore',
          state: this.state.city,}}/>;
    }

    return (
      <>
      <div id="video-layer" style={{
        height: '100vh',
        width: '100vh',
        float: 'center',
        bottom: '0',
        padding: 'none',
        position: 'fixed',
        zIndex: '1'
      }}>
        <video cover loop="true" src={ this.state.backgroundVideo } ref="video" type="video/mp4" autoPlay="true" id="vid" muted>
          <source src={ this.state.backgroundVideo } ref="video" type="video/mp4"></source>
        </video>
      </div>
      <div id="home-page" > {/*style={{position: 'absolute', top: '25%', left: '33%', opacity: '0.7', zIndex: '2' }}*/}

        <Row className="justify-content-md-center" >
          <h1 id="home-page-header" > Your new city awaits in</h1> {/*className="justify-content-md-center" style={{ color: 'white'}}*/}
                    <Col></Col>
          <Col md='auto' >
            <CitySelectDropdown cities={ Cities } city={this.state.city}  handleCitySelect={this.handleCitySelect}/>
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