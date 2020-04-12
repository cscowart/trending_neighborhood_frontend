import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import Cities from '../config/Cities.json';
import backendAPI from "../api/backendAPI"
import ExploreCitySelectDropdown from '../components/ExploreCitySelectDropdown'
import NeighborhoodMap from "../components/NeighborhoodMap"
import ListView from '../components/ListView'
import top5neighborhoods from '../mock_data/top5neighborhoods'//Delete when everything is set up
import ScoreBreakdown from '../components/ScoreBreakdown';
import { geolocated } from "react-geolocated";

class ExplorePage extends Component {
  state = {
    city: "",
    categories: {
      "Walkability": 0,
      "Restaurants and Bars": 0,
      "Entertainment": 0,
      "Shopping": 0,
      "Parks": 0,
    },
    expandedCategories: {
      "Walkability": 0,
      "Public Transit": 0,
      "Restaurants and Bars": 0,
      "Entertainment": 0,
      "Shopping": 0,
      "Parks": 0,
      "Biking": 0,
      "Errands": 0,
      "Groceries": 0,
      "Schools": 0,
      // crime: 0,
      // localEvents: 0,
    },
    mapView: true,
    showExpandedCategories: false,
    scoreBreakdownNeighborhood: null,
    pageLoaded: false,
    isDefault: true,
    results: top5neighborhoods //!!!!!Change back to null when running backend!!!!!
  }

  componentDidMount() {
    // Checks to see what city was selected on the main landing page
    if (this.props.location.state && this.state.isDefault){
      this.setState({
        city: this.props.location.state,
      })
      this.getDefaultResults(this.state.city)
    }
  }

  getDefaultResults = async (city) => { 
    // let results = await backendAPI.getDefaultNeighborhoods(city) 
    //   await (resonse => resonse.json())
    //   await (data => data)    
    const results = top5neighborhoods //Comment out line when running API and uncomment the above lines
    this.setState({
      results: results,
      isDefault: false,
    })
  }

  // After a user changes city preference on top button, this updates the this.state.city to the newly selected city
  handleCitySelect = event => {
    console.log(event)
    this.setState({
      city: Cities[event],
      isDefault: true,
    })
    this.handleResetValues()
    this.getDefaultResults(this.state.city)
  }

  // Resets the user preference scores when going to a new city page
  handleResetValues = event => {
    this.setState({
      categories: {
        "Walkability": 0,
        "Public Transit": 0,
        "Restaurants and Bars": 0,
        "Entertainment": 0,
        "Shopping": 0,
        "Parks": 0,
      },
      expandedCategories: {
        "Walkability": 0,
        "Public Transit": 0,
        "Restaurants and Bars": 0,
        "Entertainment": 0,
        "Shopping": 0,
        "Parks": 0,
        "Biking": 0,
        "Errands": 0,
        "Groceries": 0,
        "Schools": 0,
      },
    })
  }

  // Creates a neighborhoodObject to be used in the POST request after a user submits their preferences. 
  handleCategoriesSubmit = event => {
    event.preventDefault()
    let categoriesSelect = null
    if (this.state.showExpandedCategories) {
      categoriesSelect = this.state.expandedCategories
    } else {
      categoriesSelect = this.state.categories
    }
    const neighborhoodObject = {
      city: this.state.city,
      categories: categoriesSelect
    }
    this.getResults(neighborhoodObject)
  }

  // API Call to the backend to get a new results object
  getResults = async neighborhoodObject => { 
    let results = await backendAPI.findNeighborhood(neighborhoodObject) 
      await (resonse => resonse.json())
      await (data => data)    
    this.setState({
      results: results,
      isDefault: false,
    })
  }

  // Rounds the user score preferences 
  handleCategoryScore = event => {
    let cat = event.target.parentElement.id
    let val = parseInt(event.target.value)
    switch (true) {
        case (val>87):
          val=99
          break;
        case (val>62):
          val=75
          break;
        case (val>37):
          val=50
          break;
        case (val>12):
          val=25
          break;
        default:
          val=0
      }
    const { categories } = { ...this.state }
    const currentState = categories
    currentState[cat] = val
    this.setState({
      categories: currentState
    })
  }

  // Expands the category select when user selects "Complicate Things"
  handleExpandedCategories = () => {
    this.setState({
      showExpandedCategories: !this.state.showExpandedCategories,
    })
  }

  render() {
    return (
      <div style={{marginTop: "25px"}}>
        <Row>
          <Col style={{textAlign: "center"}}>
            <h4>Find your future in {" "}  
              <ExploreCitySelectDropdown cities={ Cities } city={this.state.city}  handleCitySelect={ this.handleCitySelect }/>
            </h4>
          </Col>
        </Row>
        <div style={{position: 'absolute', top: '18%', right: '2%', zIndex: '3'}}>
          {this.state.showExpandedCategories ? <NeighborhoodPreferencesForm city={this.state.city} categories={ this.state.expandedCategories } handleExpandedCategories={this.handleExpandedCategories} showExpandedCategories={this.state.showExpandedCategories} handleCategoriesSubmit={ this.handleCategoriesSubmit } handleCategoryScore={this.handleCategoryScore}
           handleResetValues={this.handleResetValues}/> : <NeighborhoodPreferencesForm city={this.state.city} categories={ this.state.categories } handleExpandedCategories={this.handleExpandedCategories} showExpandedCategories={this.state.showExpandedCategories} handleCategoriesSubmit={ this.handleCategoriesSubmit } handleCategoryScore={this.handleCategoryScore} handleResetValues={this.handleResetValues}/> }
        </div>
        <Row className="mx-3" style={{ height: '600', width: '100vw',}}>
          <div style={{position: 'absolute', top: '10%', left: '60px', zIndex: '2', }}>
            <BootstrapSwitchButton 
              style={"mt-4"}
              checked={this.state.mapView}
              width={100}
              onlabel='Map View'
              onstyle='light'
              offlabel='List View'
              offstyle='light'
              size='sm'
              onChange={(checked: boolean) => {
                this.setState({ mapView: checked })
              }}/>
          </div>
          <div style={{height: "960px", width: '70%', marginTop: '50px', overflowY: 'auto'}}>
            {this.state.mapView ? 
              <NeighborhoodMap city={ this.state.city } results={ this.state.results} isActive={ this.state.mapView } /> :
              !this.state.showExpandedCategories && !this.state.mapView ?
              <ListView  city={this.state.city} results={this.state.results.filter(neighborhood => neighborhood["Overall Score"] >= 100)}  userPreferences={this.state.categories} /> :
              this.state.showExpandedCategories && !this.state.mapView ?
              <ListView  city={ this.state.city } results={this.state.results.filter(neighborhood => neighborhood["Overall Score"] >= 100)}  userPreferences={ this.state.expandedCategories } /> :
              <div></div>
            }
          </div>       
        </Row>
      </div>
    );
  }
}

export default 
geolocated({
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(ExplorePage)