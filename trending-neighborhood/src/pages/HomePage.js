import React, { Component } from 'react';
import CitySelectJumbotron from '../components/CitySelectJumboton';
import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import Cities from '../config/Cities.json';
import backendAPI from "../api/backendAPI"

class HomePage extends Component {
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

  handleCategoryScore = event => {
    let cat = event.target.parentElement.id
    let val = event.target.value
    console.log(event.target.parentElement)
    // console.log(event.target.value)
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
      <div>
        <CitySelectJumbotron cities={ Cities } city={this.state.city} handleCitySelect={ this.handleCitySelect }/>
        <NeighborhoodPreferencesForm city={this.state.city} categories={ this.state.categories } handleCategoriesSubmit={ this.handleCategoriesSubmit } handleCategoryScore={this.handleCategoryScore}/>
      </div>
    );
  }
}

export default HomePage;