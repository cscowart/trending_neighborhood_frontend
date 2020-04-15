import React, { Component } from 'react';
import { PageItem, Pagination, Accordion, Button, ListGroup, ListGroupItem, Row, Col, Card, CardDeck } from 'react-bootstrap';
import ScoreBreakdown from './ScoreBreakdown';
import { geolocated } from "react-geolocated";
import CityCoords from '../config/CityCoords.json';
import GetDistance from '../HelperFunctions/GetDistance'



class ListView extends Component {
    getZillowHref = (neighborhood) => {
      const formattedNeighborhood = neighborhood.replace(' ', '-')
      const state = "IL"
      const formattedLink = "https://www.zillow.com/" + formattedNeighborhood + "-" + this.props.city + "-" + state + "/rentals"
      return formattedLink
    }

  render() {
    let rnd=Math.random()
    console.log("props", this.props)
    return (
      <CardDeck  id="list-view" sm-style={{marginTop: '150px', width: '400px'}} md-style={{marginTop: '150px', width: '400px'}} lg-style={{marginTop: '150px', width: '400px'}} xl-style={{marginTop: '150px', width: '1100px'}} > 
      {this.props.results.map((result, index) => {
        let sortedArray=[]
        for (let i in result.breakdown){sortedArray.push([result.breakdown[i], i])}
        sortedArray=sortedArray.sort().reverse() 
        // console.log("Sorted Array", sortedArray)
        
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
            // TODO need coordinates of neighborhood
        let lat2 = 41.8786
        let lon2 = -87.6251
        let distance = (GetDistance(lat1, lon1, lat2, lon2))/1609
            // Display distance to the hundreths if < 1 mile away
        if (distance < 1) {distance=distance.toFixed(2)} else {distance=parseInt(distance.toFixed(2))}
            
            return(
        // <Card key={index} >
        <Row className="my-4" xl={3} >
          <Col >
            <Card className="mx-3" key={index} style={{height: '300px', width: '300px'}}>
              <Card.Img variant="top" src={`https://placeimg.com/400/400/arch?${rnd}${index}`} style={{opacity: '0.5'}}/>
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
                <small centered><Button size="xs">I'm a link!</Button> <Button size="xs">I'm a link!</Button>
                </small>
                </Card.Body>
         
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
            )
            {/* ) */}
          {/* })} */}
{/* 
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={result["Neighborhood"]}>
            <Row sm='auto'>
            {this.props.coords ? 
              <Col><small className="text-muted">{distance} miles away from you</small></Col>:<div></div>}               
              <Col>{result["Neighborhood"]}</Col>
              <Col style={{maxWidth: '5px'}}></Col>
              <Col></Col>
              </Row>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={result["Neighborhood"]}>
              <Card.Body>
              <ScoreBreakdown results={result} userPreferences={this.props.userPreferences} showExpandedCategories={this.props.showExpandedCategories}/>
              </Card.Body>
              </Accordion.Collapse>
            </Card> */}
        {/* ) 
    )}}
      // })} */}
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

