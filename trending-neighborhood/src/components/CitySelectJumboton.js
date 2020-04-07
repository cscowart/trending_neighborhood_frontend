import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Row, Col } from 'react-bootstrap'

import CitySelectDropdown from './CitySelectDropdown'
import chicagoIMG from '../images/chicago.jpg'
import nycIMG from '../images/nyc.jpg'
import austinIMG from '../images/austin.png'
import defaultIMG from '../images/default.webp'
import atlantaIMG from '../images/atlanta.png'

class CitySelectJumbotron extends Component {
  state = {
    backgroundImage: defaultIMG
  }

componentDidUpdate = (prevProps) => {
  if (this.props.city !== prevProps.city){
    switch(this.props.city) {
      case "Atlanta":
        this.setState({
          backgroundImage: atlantaIMG
        })
        break;
      case "Austin":
        this.setState({
          backgroundImage: austinIMG
        })
        break;
      case "Chicago":
        this.setState({
          backgroundImage: chicagoIMG
        })
        break;
      case "New York City":
        this.setState({
          backgroundImage: nycIMG
        })
        break;
      default:
        this.setState({
          backgroundImage: defaultIMG
        })
    }
  }
}

  render() {
    return (
        <Jumbotron style={{
    
          backgroundImage: `url(${this.state.backgroundImage})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          minHeight: "500px",
          

        }}>
          
          <h1 className="text-center">Your new neighborhood awaits</h1>
          <Row className="justify-content-md-center" >
            <Col></Col>
            <Col md='auto' >
              <CitySelectDropdown cities={ this.props.cities } city={this.props.city} onSelect={ this.componentDidMount }  handleCitySelect={ this.props.handleCitySelect }/>
            </Col>
            <Col></Col>
          </Row>
            
            
        </Jumbotron>
    );
  }
}

export default CitySelectJumbotron;