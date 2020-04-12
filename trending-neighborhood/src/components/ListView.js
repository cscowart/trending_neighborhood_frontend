import React, { Component } from 'react';
import { Accordion, Button, ListGroup, ListGroupItem, Row, Col, Card, CardDeck } from 'react-bootstrap';
import ScoreBreakdown from './ScoreBreakdown';
import { geolocated } from "react-geolocated";


class ListView extends Component {
    getZillowHref = (neighborhood) => {
      const formattedNeighborhood = neighborhood.replace(' ', '-')
      const state = "IL"
      const formattedLink = "https://www.zillow.com/" + formattedNeighborhood + "-" + this.props.city + "-" + state + "/rentals"
      return formattedLink
    }

  render() {
    return (
      <Accordion className = "mt-4" defaultActiveKey="0">
      {this.props.results.map((result, index) => {
        let sortedArray=[]
        for (let i in result.breakdown){sortedArray.push([result.breakdown[i], i])}
        sortedArray=sortedArray.sort().reverse() 
        // console.log("Sorted Array", sortedArray)

        let distance=""
        if (this.props.coords) {
          
            // grab coordinates from user
            let lat1 = this.props.coords.latitude
            let lon1 = this.props.coords.longitude

            // TODO set these to neighborhhod coordinates
            let lat2 = 41.878
            let lon2 = -87.629

            //grabs the distance from user to neighborhood
            let R = 6371000/1609; // miles
            let φ1 = lat1*Math.PI/180;
            let φ2 = lat2*Math.PI/180;
            let Δφ = (lat2-lat1)*Math.PI/180;
            let Δλ = (lon2-lon1)*Math.PI/180;
            let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            distance = R * c;
        } 

        return(
          <> 
          <Card key={index} style={{minWidth: '600px'}}>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey={result["Neighborhood"]}>
              <Row sm='auto'>
                {this.props.coords ? 
                <Col><small className="text-muted">{distance.toFixed(2)} miles away from you</small></Col>:<div></div>}               
                <Col>{result["Neighborhood"]}</Col>
                <Col style={{maxWidth: '5px'}}></Col>
                <Col></Col>
              </Row>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={result["Neighborhood"]}>
              <Card.Body>
                <ScoreBreakdown results={result} userPreferences={this.props.userPreferences}/>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          </>
        ) 
      })}
      </Accordion>
    )}}

export default geolocated({
  positionOptions: {
  enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
})(ListView)

