import React, { Component } from 'react';
import { Accordion, Button, ListGroup, ListGroupItem, Col, Card, CardDeck } from 'react-bootstrap';
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




      <Accordion defaultActiveKey="0">

      {/* // <CardDeck className="row row-cols-1 row-cols-lg-2 row-cols-xl-3" lg="10" > */}
      {this.props.results.map((result, index) => {
        
        let sortedArray=[]
        for (let i in result.breakdown){sortedArray.push([result.breakdown[i], i])}
        sortedArray=sortedArray.sort().reverse() 
        // console.log("Sorted Array", sortedArray)
        return(

<>
          <ListGroup>
            <ListGroup.Item>
              <Accordion.Toggle as={Button} variant="link" eventKey={result["Neighborhood"]}>
              {result["Neighborhood"]} X miles {sortedArray[0][1]}: {sortedArray[0][0]}  
                  {sortedArray[1][1]}: {sortedArray[1][0]}  
                  {sortedArray[2][1]}: {sortedArray[2][0]}
              </Accordion.Toggle>
            </ListGroup.Item>
            <Accordion.Collapse eventKey={result["Neighborhood"]}>
              <Card.Body>
                <ScoreBreakdown results={result} userPreferences={this.props.userPreferences}/>
                </Card.Body>
            </Accordion.Collapse>
          </ListGroup>
       

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

