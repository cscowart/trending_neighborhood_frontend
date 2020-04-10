import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Col, Card, CardDeck } from 'react-bootstrap';

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
    // let neighborhoodScores = Object.entries(this.props.results.breakdown).sort((a, b) => a.value - b.value)
    console.log("I'm the breakdown!", Object.entries(this.props.results))
    
    // console.log(neighborhoodScores)
    return (
      <CardDeck className="row row-cols-1 row-cols-lg-2 row-cols-xl-3" style={{height: "960px", width: '70%', marginTop: '50px'}} lg="10" >
      {this.props.results.map((result, index) => {
        
        let sortedArray=[]
        for (let i in result.breakdown){sortedArray.push([result.breakdown[i], i])}
        sortedArray=sortedArray.sort().reverse()
        console.log("Sorted Array", sortedArray)
        return(
          <Col className="my-4">
            <Card key={index} style={{width: '18rem'}}>
              <Card.Body>
                <Card.Title>{result["Neighborhood"]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Overall: {result["Overall Score"]}</Card.Subtitle>
                <Card.Body>
                {/* <ListGroup.Item variant="light">Top Three Scores:</ListGroup.Item> */}
                <ListGroupItem>{sortedArray[0][1]}: {sortedArray[0][0]}</ListGroupItem>
                <ListGroupItem>{sortedArray[1][1]}: {sortedArray[1][0]}</ListGroupItem>
                <ListGroupItem>{sortedArray[2][1]}: {sortedArray[2][0]}</ListGroupItem>
                </Card.Body>
              
              
                <Card.Link href={this.getZillowHref(result["Neighborhood"])}>{result["Neighborhood"]} Rentals</Card.Link>
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

