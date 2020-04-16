import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import { Redirect, Link } from 'react-router-dom'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ReactLoading from 'react-loading';
import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import Cities from '../config/Cities.json';
import backendAPI from "../api/backendAPI"
import ExploreCitySelectDropdown from '../components/ExploreCitySelectDropdown'
import NeighborhoodMap from "../components/NeighborhoodMap"
import ListView from '../components/ListView'
import ScoreBreakdown from '../components/ScoreBreakdown';
import { geolocated } from "react-geolocated";
import MapLegend from '../components/MapLegend'
// import top5neighborhoods from '../mock_data/top5neighborhoods'

class ExplorePage extends Component {
  state = {
    city: "",
    categories: {
      "Walkability": [1, 0],
      "Restaurants and Bars": [1, 0],
      "Entertainment": [1, 0],
      "Shopping": [1, 0],
      "Parks": [1, 0],
      "Public Transit": [2, 0],
      "Biking": [2, 0],
      "Errands": [2, 0],
      "Groceries": [2, 0],
      "Schools": [2, 0],
    },
    mapView: true,
    showExpandedCategories: false,
    scoreBreakdownNeighborhood: null,
    isLoading: false,
    isDefault: true,
    redirect: true,
    results: null, //If testing w/o back end, use top5neighborhoods & import top5neighborhoods from '../mock_data/top5neighborhoods'
  }

  componentDidMount() {
    let path = window.location.pathname.split('/')
    let city = path[2].replace(/%20/g, " ")
    console.log(city)
    // Checks to see what city was selected on the main landing page
    if (this.props.location.city && this.state.isDefault){
      this.setState({
        city: this.props.location.city,
        isLoading: true,
      }) 
      this.getDefaultResults(this.props.location.city)
    } else if (city && this.state.isDefault){
      this.setState({
        city: city,
        isLoading: true,
      }) 
      this.getDefaultResults(city)
    }
  }

  componentDidUpdate(prevProps) {
    // console.log(prevProps.match.url)
    // console.log(window.location.pathname.replace(/%20/g, " "))
    // let sanitized
    if (prevProps.match.url != window.location.pathname.replace(/%20/g, " ")){
      console.log("I changed!")
      window.location.reload()
      }
    }
  

  getDefaultResults = async (city) => { 
    let objCity = city
    if (objCity === "Washington D.C.") {
      objCity = "Washington"
    } else if (objCity === "New York City") {
      objCity = "New York"
    }
    let results = await backendAPI.getDefaultNeighborhoods(objCity)   
    // const results = top5neighborhoods //Comment out line when running API and uncomment the above lines
    console.log(results)
    this.setState({
      results: results,
      isLoading: false,
      isDefault: false
    })
  }

  // After a user changes city preference on top button, this updates the this.state.city to the newly selected city
  handleCitySelect = event => {
    this.setState({
      city: Cities[event],
      isLoadiing: true,
      isDefault: true,
    })
    this.handleResetValues()
    this.getDefaultResults(this.state.city)
  }

  // Resets the user preference scores when going to a new city page
  handleResetValues=()=> {
    console.log("Reset!")
    this.setState({
      categories: {
        "Walkability": [1, 0],
        "Restaurants and Bars": [1, 0],
        "Entertainment": [1, 0],
        "Shopping": [1, 0],
        "Parks": [1, 0],
        "Public Transit": [2, 0],
        "Biking": [2, 0],
        "Errands": [2, 0],
        "Groceries": [2, 0],
        "Schools": [2, 0],
      },
    })
  }

  // Creates a neighborhoodObject to be used in the POST request after a user submits their preferences. 
  handleCategoriesSubmit = event => {
    event.preventDefault()
    let categoriesSelect = Object.entries(this.state.categories)
    let category = Object.entries(this.state.categories).map(obj => obj[0])
    let score = categoriesSelect.map(obj => obj[1][1])
    let submitCategories = {}
    for(let index = 0; index < category.length; index++) {
      submitCategories[`${category[index]}`] = score[index]
    }
    let objCity = this.state.city
    if (objCity === "Washington D.C.") {
      objCity = "Washington"
    } else if (objCity === "New York City") {
      objCity = "New York"
    }
    const neighborhoodObject = {
      city: objCity,
      categories: submitCategories
    }
    this.getResults(neighborhoodObject)
  }

  // API Call to the backend to get a new results object
  getResults = async neighborhoodObject => { 
    let results = await backendAPI.findNeighborhood(neighborhoodObject) 
    this.setState({
      results: results,
      isDefault: false,
    })
  }

  // Rounds the user score preferences 
  handleCategoryScore = event => {
    let cat = event.target.parentElement.id
    let val = parseInt(event.target.value)
    let text="Not Important"
    switch (true) {
      case (val>87): val=99; break;
      case (val>62): val=75; break;
      case (val>37): val=50; break;
      case (val>12): val=25; break;
      default: val=0
    }
    const { categories } = { ...this.state }
    const currentState = categories
    currentState[cat][1] = val
    // console.log(`Current State: ${currentState}`)
    this.setState({
      categories: currentState,
    })
  }

  // Expands the category select when user selects "Complicate Things"
  handleExpandedCategories = () => {
    this.setState({
      showExpandedCategories: !this.state.showExpandedCategories,
    })
  }
  
  render() {
  
    if (this.state.isLoading === true) {
      return (
        <ReactLoading type={"bars"} color={"#ffffff"} height={'20%'} width={'20%'} />
      )
    }
    return (
      <div id="explore-page"> 
        <Row>
          <Col style={{textAlign: "center"}}>
          </Col>
        </Row>
        <div style={{position: 'absolute', top: '22%', right: '2%', zIndex: '3'}}>
           <NeighborhoodPreferencesForm city={this.state.city} categories={this.state.categories} handleExpandedCategories={this.handleExpandedCategories} showExpandedCategories={this.state.showExpandedCategories} handleCategoriesSubmit={this.handleCategoriesSubmit} handleCategoryScore={this.handleCategoryScore} handleResetValues={this.handleResetValues}/>
        </div>
        <Row id="map-list-layer" > 
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
          <div id="map-list-components"> 
            {this.state.mapView ?
              <div> 
                <NeighborhoodMap id="neighborhood-map" city={ this.state.city } categories={this.state.categories} results={ this.state.results} isActive={ this.state.mapView } showExpandedCategories={this.state.showExpandedCategories}/>
                <MapLegend />
              </div>  :
              <ListView  id="list-view" city={this.state.city} results={this.state.results.filter(neighborhood => neighborhood["Overall Score"] >= 100)}  userPreferences={this.state.categories} showExpandedCategories={this.state.showExpandedCategories}/> 
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
  })(ExplorePage);