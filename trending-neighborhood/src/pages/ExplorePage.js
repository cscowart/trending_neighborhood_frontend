import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import Cities from '../config/Cities.json';
import backendAPI from "../api/backendAPI"
import CitySelectDropdown from '../components/CitySelectDropdown';
import Map from "../components/Map"
import ListView from '../components/ListView'
import top5neighborhoods from '../mock_data/top5neighborhoods'

class ExplorePage extends Component {
  state = {
    city: "",
    categories: {
      walkability: 0,
      publicTransit: 0,
      restaurantsAndBars: 0,
      groceries: 0,
      shopping: 0,
      entertainment: 0,
      parks: 0,
      coffeeShops: 0,
      books: 0,
      schools: 0,
      // crime: 0,
      // localEvents: 0,



    },
    mapView: true,
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
    console.log(this.state)
     return (
   
      <div >
        <Row>
          <Col style={{textAlign: "center"}}>
            <h4>Find your future in
              {" "}  
                <CitySelectDropdown cities={ Cities } city={this.state.city}  handleCitySelect={ this.handleCitySelect }/>
            </h4>
          </Col>
        </Row>
        <div style={{position: 'absolute', top: '18%', right: '2%', zIndex: '3'}}>
            <NeighborhoodPreferencesForm city={this.state.city} categories={ this.state.categories } handleCategoriesSubmit={ this.handleCategoriesSubmit } handleCategoryScore={this.handleCategoryScore}/>
        </div>
        <Row className="mx-3" style={{width: '100vw'}}>
          <Col style={{height: '600', width: '100vw'}}>
            <div style={{position: 'absolute', top: '6%', left: '60px', zIndex: '2', }}>
              <BootstrapSwitchButton 
                checked={true}
                onlabel='Map View'
                onstyle='light'
                offlabel='List View'
                offstyle='light'
                size='sm'
                onChange={(checked: boolean) => {
                    this.setState({ mapView: checked })
                }}/>
            </div>
           
            {this.state.mapView ? <Map city={ this.state.city } isActive={ this.state.mapView }/> : <ListView  city={this.state.city} results={top5neighborhoods.filter(neighborhood => neighborhood.score >= 75)}/>}
          </Col>
        </Row>
        <Row>
          <Col className='my-5' style={{textAlign: "center"}}>
            <h4>ScoreBreakdown Component goes here</h4>
          </Col>
        </Row>
    </div>
    );
  }
}

export default ExplorePage;