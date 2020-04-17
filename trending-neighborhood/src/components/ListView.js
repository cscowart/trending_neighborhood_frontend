import React, { Component } from 'react';
import { PageItem, Pagination, Accordion, Button, ListGroup, ListGroupItem, Row, Col, Card, CardDeck } from 'react-bootstrap';
import ScoreBreakdown from './ScoreBreakdown';
import { geolocated } from "react-geolocated";
import CityCoords from '../config/CityCoords.json';
import NeighborhoodCoords from '../config/CHI-neighborhood-locations.json'
import GetDistance from '../HelperFunctions/GetDistance'



class ListView extends Component {
  // https://www.yelp.com/search?find_desc=Restaurants&find_loc=Adams%20Morgan%2C%20Washington%2C%20DC
  // https://www.yelp.com/search?find_desc=Restaurants&find_loc=Lake%20View%2C%20Chicago%2C%20IL
  getYelpURL = (neighborhood) => {
    let state = this.getState(this.props.city)
    if (this.props.city === "Washington D.C."){
      let formattedNeighborhood = neighborhood.replace(' ', '%20')
      let formattedLink = "https://www.yelp.com/search?find_desc=Restaurants&find_loc=" + formattedNeighborhood + "%2C%20Washington%2C%20DC"
      return formattedLink
    } else {
      let formattedNeighborhood = neighborhood.replace(' ', '%20')
      let formattedLink = "https://www.yelp.com/search?find_desc=Restaurants&find_loc=" + formattedNeighborhood + "%2C%20" + this.props.city + "%2C%20" + state 
      return formattedLink
    }
  }


  // https://www.zillow.com/homes/Adams-Morgan,-Washington,-DC_rb/
  // https://www.zillow.com/lake-view-chicago-il/rentals
  getZillowURL = (neighborhood) => {
    let state = this.getState(this.props.city)
    if (this.props.city === "Washington D.C."){
      let formattedNeighborhood = neighborhood.replace(' ', '-')
       return "https://www.zillow.com/" + formattedNeighborhood + "-washington-dc/rentals/"

    } else {
      let formattedNeighborhood = neighborhood.replace(' ', '-')
      return "https://www.zillow.com/" + formattedNeighborhood + "-" + this.props.city + "-" + state + "/rentals"
    }
  }

  getState = (city) => {
      switch(this.props.city) {
        case "Atlanta":
          return "GA"
          break; 
        case "Boston":
          return "MA"
          break; 
        case "Chicago":
          return "IL"
          break; 
        case "Dallas":
          return "TX"
          break; 
        case "Houston":
          return "TX"
          break; 
        case "Los Angeles":
          return "CA"
          break; 
        case "New York City":
          return "NY"
          break; 
        case "Philadelphia":
          return "PA"
          break; 
        case "San Francisco":
          return "CA"
          break; 
        case "Washington D.C.":
          return "DC"
          break;  
        default:
          return "IL"
          break; 
      }
  }

  render() {
    let rnd=Math.random()
    return (
      <CardDeck  id="list-view"  > 
      {this.props.results.map((result, index) => {
        let sortedArray=[]
        for (let i in result.breakdown){sortedArray.push([result.breakdown[i], i])}
        sortedArray=sortedArray.sort().reverse()       
        let lat1 
        let lon1 
        if (this.props.coords) {
          // grab coordinates from user
          lat1 = this.props.coords.latitude
          lon1 = this.props.coords.longitude
        }
        else {
          // grab coordinates from city center
          for (let i in CityCoords) {
            if (CityCoords[i][0]==this.props.city){
              lat1 = CityCoords[i][1]
              lon1 = CityCoords[i][2]
            }
          }
        }
            // get coordinates of nieghborhood
        let lat2
        let lon2
        for (let i in NeighborhoodCoords) {
          if (NeighborhoodCoords[i][1]==result["Neighborhood"]){
            lat2 = NeighborhoodCoords[i][2]
            lon2 = NeighborhoodCoords[i][3]
          }
        }

        let distance = (GetDistance(lat1, lon1, lat2, lon2))/1609
            // Display distance to the hundreths if < 1 mile away
        if (distance < 1) {distance=distance.toFixed(2)} else {distance=parseInt(distance.toFixed(2))}
            
            return(
        // <Card key={index} >
        <Row className="my-2" xl={3} >
          <Col >
            <Card className="mx-2" key={index} style={{height: '350px', width: '350px'}}>
              <Card.Img variant="top" src={`https://placeimg.com/400/400/arch?${index}`} style={{opacity: '0.5'}}/>
              <Card.ImgOverlay>
                <Card.Body className="bg-white" style={{opacity: '0.7'}}>
                  <Card.Title className="text-center">{result["Neighborhood"]}<br/>
                    <small className="text-muted">{distance} miles away from you</small>
                  </Card.Title>
                  {sortedArray.slice(0, 5).map((category) => {
                    return(
                      <ul id="list-view-categories">{category[1]}: {parseInt(category[0])}</ul>
                    )    
                  })}
                <div style={{textAlign: 'center'}}>  
                <Button className="external-url-btn"  style={{ marginTop: '7px', marginBottom: '5px', width:"250px",height:"35px", backgroundColor: '#5477bb', borderColor: '#5477bb'}} href={this.getZillowURL(result["Neighborhood"])} >Rentals in {result["Neighborhood"]}</Button>
                </div>
                <div style={{textAlign: 'center'}}>
                 <Button className="external-url-btn"  style={{width:"250px", height:"35px", backgroundColor: '#c41200', borderColor: '#c41200'}} href={this.getYelpURL(result["Neighborhood"])}>Food in {result["Neighborhood"]}</Button>
                 </div>
                </Card.Body>
         
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
            )
            
      })}
      </CardDeck>
      )
    }
  }

export default geolocated({
  positionOptions: {
  enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(ListView)

