import React, { Component } from 'react';
import { Accordion, Button, ListGroup, ListGroupItem, Row, Col, Card, CardDeck } from 'react-bootstrap';
import ScoreBreakdown from './ScoreBreakdown';

class ListView extends Component {
    getZillowHref = (neighborhood) => {
    const formattedNeighborhood = neighborhood.replace(' ', '-')
    const state = "IL"
    const formattedLink = "https://www.zillow.com/" + formattedNeighborhood + "-" + this.props.city + "-" + state + "/rentals"
    return formattedLink
  }

  render() {
    console.log(this.props.userPreferences)
    return (




      <Accordion className = "mt-4" defaultActiveKey="0">

      {/* // <CardDeck className="row row-cols-1 row-cols-lg-2 row-cols-xl-3" lg="10" > */}
      {this.props.results.map((result, index) => {
        
        let sortedArray=[]
        for (let i in result.breakdown){sortedArray.push([result.breakdown[i], i])}
        sortedArray=sortedArray.sort().reverse() 
        // console.log("Sorted Array", sortedArray)
        return(

<>
          <Card key={index} style={{minWidth: '600px'}}>
              <Accordion.Toggle as={Card.Header} variant="link" eventKey={result["Neighborhood"]}>
              <Row sm='auto'>
                <Col>
               <small className="text-muted">X miles away from you</small>
               </Col>
                <Col>
              {result["Neighborhood"]}
                </Col>
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
       

{/* <Col className="my-4">
            <Card key={index} style={{width: '18rem'}}>
              <Card.Body>
                <Card.Title>{result["Neighborhood"]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Overall: {result["Overall Score"]}</Card.Subtitle>
                <Card.Body>
                  <ListGroupItem>{sortedArray[0][1]}: {sortedArray[0][0]}</ListGroupItem>
                  <ListGroupItem>{sortedArray[1][1]}: {sortedArray[1][0]}</ListGroupItem>
                  <ListGroupItem>{sortedArray[2][1]}: {sortedArray[2][0]}</ListGroupItem>
                </Card.Body>
                <Card.Link href={this.getZillowHref(result["Neighborhood"])}>{result["Neighborhood"]} Rentals</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
              <Card.Footer>
              <button variant="info"  onClick={() => this.props.handleScoreBreakdownClick(result)}> Details</button>
              </Card.Footer>
            </Card>
          </Col> */}
          </>
        )
      })}
      {/* </CardDeck> */}
      </Accordion>
        
    )
  }
}

export default ListView

