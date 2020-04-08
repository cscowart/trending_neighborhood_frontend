import React, { Component } from 'react';
import { Col, Card, CardDeck } from 'react-bootstrap';

class ListView extends Component {

  // componentDidMount() {
  //  const city = this.props.city
  //  const neighborhood = this.props.results.neighborhood[0]
  //  const neighborhoodObj = this.formatNeighborhood(neighborhood, city)
  //   wikipediaAPI.findNeighborHoodInfo(neighborhoodObj)
  //     .then((response) => {
  //      console.log(response) 
  //     })
  // }

  // formatNeighborhood = (neighborhood, city) => {
  //    const searchQuery = neighborhood + city
  //    console.log(searchQuery)
  //    searchQuery.replace(' ', '_')
  //    searchQuery.replace(',', '%2C')
  //    return searchQuery
  // }

  render() {
    console.log(this.props)
    return (
      <CardDeck className="row row-cols-1 row-cols-lg-2 row-cols-xl-3" style={{height: "960px", width: '70%', marginTop: '12%'}} lg="10" >
      {this.props.results.map((result, index) => {
        return(
          <Col className="my-4">
        <Card key={index} style={{ height: "30%", width: '18rem' }}>
          <Card.Body>
            <Card.Title>{result.neighborhood}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{result.score}</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        </Col>
        )
      })}
      </CardDeck>
        
    )
  }
}

export default ListView

