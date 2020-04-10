import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import NeighborhoodPreferencesForm from '../components/NeighborhoodPreferencesForm';
import Cities from '../config/Cities.json';
import backendAPI from "../api/backendAPI"
import CitySelectDropdown from '../components/CitySelectDropdown';
import NeighborhoodMap from "../components/NeighborhoodMap"
import ListView from '../components/ListView'
import top5neighborhoods from '../mock_data/top5neighborhoods'
import ScoreBreakdown from '../components/ScoreBreakdown';

class ExplorePage extends Component {
  state = {
    city: "",
    categories: {
      "Restaurants and Bars": 0,
      "Shopping": 75,
      "Entertainment": 0,
      "Parks": 0,
      "Coffee Shops": 0,
    },
    expandedCategories: {
      "Restaurants and Bars": 0,
      "Shopping": 75,
      "Entertainment": 0,
      "Parks": 0,
      "Coffee Shops": 0,
      "Walkability": 0,
      "Public Transit": 0,
      "Groceries": 0,
      "Books": 0,
      "Schools": 0,
      // crime: 0,
      // localEvents: 0,
    },
    mapView: true,
    showExpandedCategories: false,
    scoreSubmitted: false
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

  handleResetValues = event => {
    console.log("I made it here!")
    this.setState({
      categories: {
        "Restaurants and Bars": 0,
        "Shopping": 0,
        "Entertainment": 0,
        "Parks": 0,
        "Coffee Shops": 0,
      },
      expandedCategories: {
        "Restaurants and Bars": 0,
        "Shopping": 75,
        "Entertainment": 0,
        "Parks": 0,
        "Coffee Shops": 0,
        "Walkability": 0,
        "Public Transit": 0,
        "Groceries": 0,
        "Books": 0,
        "Schools": 0,
        // crime: 0,
        // localEvents: 0,
      },
  })
}

  handleCategoriesSubmit = event => {
    console.log("I should not be here!")

    event.preventDefault()
    const neighborhoodObject = {
      city: this.state.city,
      categories: this.state.expandedCategories
    }
    // backendAPI.findNeighborhood(neighborhoodObject)
    //   .then(response => response.json())
    //   .then(data=> console.log(data))
    this.setState({
      scoreSubmitted: true,
    })
  }

  handleCategoryScore = event => {
    let cat = event.target.parentElement.id
    let val = parseInt(event.target.value)
    console.log(`Pre-Adjusted Value ${val}`)

    
    switch (true) {
      case (val>87):
        val=100
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
    

    console.log(event.target.parentElement)
    console.log(`Adjusted Value ${val}`)

    const { categories } = { ...this.state }
    const currentState = categories
    console.log(currentState)
    currentState[cat] = val
    this.setState({
      categories: currentState
    })
  }

  handleExpandedCategories = () => {
    this.setState({
      showExpandedCategories: !this.state.showExpandedCategories,
    })
  }


  render() {
    console.log(this.state)
     return (
   
      <div style={{marginTop: "25px"}}>
        <Row>
          <Col style={{textAlign: "center"}}>
            <h4>Find your future in
              {" "}  
                <CitySelectDropdown cities={ Cities } city={this.state.city}  handleCitySelect={ this.handleCitySelect }/>
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
           
            {this.state.mapView ? 
              <NeighborhoodMap city={ this.state.city } isActive={ this.state.mapView } /> :
              <ListView  city={this.state.city} results={top5neighborhoods.filter(neighborhood => neighborhood["Overall Score"] >= 75)} />
            }
        </Row>
        {this.state.scoreSubmitted ?
          <Row>
          <Col className='my-5' style={{textAlign: "center"}}>
            <ScoreBreakdown categories={this.state.showExpandedCategories ? this.state.expandedCategories : this.state.categories} />
          </Col>
        </Row> : 
        <div></div>
       }

    </div>
    );
  }
}

export default ExplorePage;