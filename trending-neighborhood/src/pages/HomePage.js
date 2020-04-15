import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Cities from '../config/Cities.json';
import CityCoords from '../config/CityCoords.json';
import GetDistance from '../HelperFunctions/GetDistance'
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

    let distances={}

  if (this.props.coords) {
      {CityCoords.map((cityCoords)=> {
        let lat1 = this.props.coords.latitude
        let lon1 = this.props.coords.longitude
        
        let lat2 = cityCoords[1]
        let lon2 = cityCoords[2]


        let distance = GetDistance(lat1, lon1, lat2, lon2)
        
        distances[cityCoords[0]]=distance
        // console.log(distances)
        let keys = Object.keys(distances);
        let lowest = Math.min.apply(null, keys.map(function(x) { return distances[x]} ));
        let closest  = keys.filter(function(y) { return distances[y] === lowest });
        this.setState({closestCity: closest[0]})
        // console.log("Closest City: ", this.state.closestCity)
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
    if (this.state.redirect) {
      return <Redirect to={{
          pathname: `/explore/${this.state.city}`,
          city: this.state.city,
      }}/>;
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
      <div id="home-page" > 
        <Row className="justify-content-md-center" >
          <h1 id="home-page-header" > Your new city awaits in</h1> 
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