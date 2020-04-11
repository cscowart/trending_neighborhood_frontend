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
      // crime: 0,
      // localEvents: 0,
    },
    mapView: true,
    showExpandedCategories: false,
    scoreSubmitted: true, //Do we even need this now
    scoreBreakdownNeighborhood: null,
    pageLoaded: false,
    results: top5neighborhoods //Change back to null when running backend
  }

  componentDidMount() {
    if (this.props.location.state){

    // TODO get default values
    // run API call with all values set at 100
      let neighborhood = this.getHighestNeighborhood(top5neighborhoods)
      console.log("Page just loaded, this is the neighborhood: ", neighborhood)
      this.setState({
        city: this.props.location.state,
        scoreBreakdownNeighborhood: neighborhood
      })
    }
  }

  handleCitySelect = event => {
    this.setState({
      city: Cities[event],
    })
  }

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
    console.log(neighborhoodObject)
    // !!!UNCOMMENT TO SEND SCORES TO BACKEND!!!
    // this.getResults(neighborhoodObject)
    let neighborhood = this.getHighestNeighborhood(top5neighborhoods)
    // console.log(neighborhood)
    this.setState({
      scoreSubmitted: true,
      scoreBreakdownNeighborhood: neighborhood
    })
  }

  getResults = async neighborhoodObject => { 
    let results = await backendAPI.findNeighborhood(neighborhoodObject) 
      await (resonse => resonse.json())
      await (data => data)    
    // console.log(results)
    let neighborhood = this.getHighestNeighborhood(top5neighborhoods)
    this.setState({
      scoreSubmitted: true,
      results: results,
      scoreBreakdownNeighborhood: neighborhood
    })
  }

  getHighestNeighborhood = results => {
    let highestNeighborhood = results.sort((a, b) => b["Overall Score"] - a["Overall Score"])
    return highestNeighborhood[0]
  }

  handleCategoryScore = event => {
    let cat = event.target.parentElement.id
    let val = parseInt(event.target.value)
    // console.log(`Pre-Adjusted Value ${val}`)

    
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
    

    // console.log(event.target.parentElement)
    // console.log(`Adjusted Value ${val}`)

    const { categories } = { ...this.state }
    const currentState = categories
    // console.log(currentState)
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

  handleScoreBreakdownClick = (event, neighborhood) => {
    // console.log(event)
    // console.log(neighborhood)
    this.setState({
      scoreBreakdownNeighborhood: neighborhood
    })
  }


  render() {
    console.log(this.state)
    // console.log(top5neighborhoods)
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
          <div style={{height: "960px", width: '70%', marginTop: '50px'}}>
            {this.state.mapView ? 
              <NeighborhoodMap city={ this.state.city } results={ this.state.results} isActive={ this.state.mapView } /> :
              <ListView  city={this.state.city} results={this.state.results.filter(neighborhood => neighborhood["Overall Score"] >= 75)} handleScoreBreakdownClick={ this.handleScoreBreakdownClick } />
            }
          </div>       
        </Row>
        <Row>
          <Col className='my-5' style={{textAlign: "center", zIndex: 5}}>
            
        {!this.state.showExpandedCategories && this.state.scoreBreakdownNeighborhood ?
          <ScoreBreakdown results={this.state.scoreBreakdownNeighborhood} userPreferences={this.state.categories} /> :
          this.state.showExpandedCategories && this.state.scoreBreakdownNeighborhood ?
          <ScoreBreakdown results={this.state.scoreBreakdownNeighborhood} userPreferences={this.state.expandedCategories}/> :
          <div></div>            
        } 
          
        </Col>
      </Row> 

    </div>
    );
  }
}

export default ExplorePage;