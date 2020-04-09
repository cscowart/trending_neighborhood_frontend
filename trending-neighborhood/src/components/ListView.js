import React, { Component } from 'react';
import { Col, Card, CardDeck } from 'react-bootstrap';

class ListView extends Component {

  // componentDidMount() {
  //   const neighborhoodWiki = []
  //   const city = this.props.city
  //   for (let i=0; i < this.props.results.length; i++){
  //     const neighborhood = this.props.results[i].neighborhood
  //     const neighborhoodObj = this.formatNeighborhood(neighborhood, city)
  //       wikipediaAPI.findNeighborhoodInfo(neighborhoodObj)
  //         .then((data) => {
  //           // neighborhoodWiki[i] = {
  //             let wiki = new Object()
  //             wiki.title = data.title
  //             wiki.thumbnail = data.thumbnail
  //             wiki.coordinates = data.coordinates
  //             wiki.extract = data.extract
  //             neighborhoodWiki.push(wiki)
  //           // }
  //         })
            
  //       }
  //       console.log(neighborhoodWiki)
  //       this.setState({neighborhoodWiki})
  // }

  // formatNeighborhood = (neighborhood, city) => {
  //    const str = neighborhood + '%2C ' + city
  //    const searchQuery = str.replace(/ /g, "_")
  //    return searchQuery
  // }

// HTTP Link for zillow
  // https://www.zillow.com/lincoln-park-chicago-il/rentals/
  // https://www.zillow.com/homes/Lincoln-Park,-Chicago,-IL_rb/

  getZillowHref = (neighborhood) => {
    const formattedNeighborhood = neighborhood.replace(' ', '-')
    const state = "IL"
    const formattedLink = "https://www.zillow.com/" + formattedNeighborhood + "-" + this.props.city + "-" + state + "/rentals"
    return formattedLink
  }

  

  render() {
    console.log(this.props)
    return (
      <CardDeck className="row row-cols-1 row-cols-lg-2 row-cols-xl-3" style={{height: "960px", width: '70%', marginTop: '12%'}} lg="10" >
      {this.props.results.map((result, index) => {
        return(
          <Col className="my-4">
            <Card key={index} style={{width: '18rem' }}>
              <Card.Body>
                <Card.Title>{result.neighborhood}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{result.score}</Card.Subtitle>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Link href={this.getZillowHref(result.neighborhood)}>{result.neighborhood} Rentals</Card.Link>
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

