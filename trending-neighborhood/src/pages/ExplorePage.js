import React, { Component } from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import Cities from '../config/Cities.json';
import backendAPI from "../api/backendAPI"
import CitySelectDropdown from '../components/CitySelectDropdown';
import Map from "../components/Map"

class ExplorePage extends Component {
  state = {
    city: "",
    categories: {
      accessability: 0,
      artsAndEntertainment: 0,
      bars: 0,
      localEvents: 0,
      restaurants: 0,
      retail: 0,
      schools: 0
    }
  }

  componentDidMount() {
    // console.log(this.props)
    if (this.props.location.state){
      this.setState({
        city: this.props.location.state
      })
    }
  }

  handleCitySelect = event => {
    this.setState({
      city: Cities[event],
    })
  }

  handleCategoriesSubmit = event => {
    event.preventDefault()
    const neighborhoodObject = {
      city: this.state.city,
      categories: this.state.categories
    }
    backendAPI.findNeighborhood(neighborhoodObject)
      .then(response => response.json())
      .then(data=> console.log(data))
  }

  handleCitySelect = event => {
    this.setState({
      city: Cities[event],
    })   
  }

  handleCategoryScore = event => {
    let cat = event.target.parentElement.id
    let val = event.target.value
    console.log(event.target.parentElement)
    const { categories } = { ...this.state }
    const currentState = categories
    console.log(currentState)
    currentState[cat] = parseInt(val)
    this.setState({
      categories: currentState
    })
  }


  render() {
    // console.log(this.state)
    return (
   
      <div>
        <Container>
          <Row>
            <Col style={{border: "2px solid green", textAlign: "center"}}>
              <h4>Find your future in
                {" "}  
                 <CitySelectDropdown cities={ Cities } city={this.state.city}  handleCitySelect={ this.handleCitySelect }/>
              </h4>
            </Col>
          </Row>
          <Row>
            <Col lg="2" md="auto" style={{border: "solid 2px red"}}>
              <NeighborhoodPreferencesForm city={this.state.city} categories={ this.state.categories } handleCategoriesSubmit={ this.handleCategoriesSubmit } handleCategoryScore={this.handleCategoryScore}/>
            </Col>
            <Col lg="10" style={{border: "solid 2px"}}>
              <Map city={ this.state.city }/>
              {/* Add LIST VIEW button here */}
            </Col>
          </Row>
          <Row>
            <Col style={{border: "solid 2px blue", textAlign: "center"}}>
              <h4>ScoreBreakdown Component goes here</h4>
            </Col>
          </Row>

        </Container>
      </div>
    );
  }
}

export default ExplorePage;