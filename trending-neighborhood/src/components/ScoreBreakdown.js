import React, { Component } from 'react'
import {Col, Card, CardDeck} from 'react-bootstrap'
import ReactSpeedometer from "react-d3-speedometer"

class ScoreBreakdown extends Component {

  render() {
    let sortedArray=[]
    for (let i in this.props.userPreferences){sortedArray.push([this.props.userPreferences[i], i])}
    sortedArray=sortedArray.reverse().sort().reverse() 

   
        
    return (
      <div >
        <h1>Showing neighborhood: {this.props.results["Neighborhood"]} </h1>
        <CardDeck className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3  row-cols-xl-4"> 

        {sortedArray.map(category => {
          return (
            <Col className="my-4">
              <Card style={{width: '250px'}}>
              {/* <ReactSpeedometer
                width={300}
                height={175}
                needleHeightRatio={0.7}
                // Get value from API Return not the category score
                value={this.props.results.breakdown[category[1]] * 10} 
                currentValueText="Happiness Level"
                customSegmentLabels={[
                  {
                    text: "Very Bad",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "Bad",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "Ok",
                    position: "INSIDE",
                    color: "#555",
                    fontSize: "19px",
                  },
                  {
                    text: "Good",
                    position: "INSIDE",
                    color: "#555",
                  },
                  {
                    text: "Very Good",
                    position: "INSIDE",
                    color: "#555",
                  },
                ]}
                ringWidth={47}
                needleTransitionDuration={3333}
                needleTransition="easeElastic"
                needleColor={"#90f2ff"}
                textColor={"#d8dee9"}
              /> */}
              
            <Card.Body>
              {/* {(()=>{
              let score = parseInt(this.props.results.breakdown[category[1]])
              let color="black"

                switch(true) {
                  case score>80:
                    color="green"
                    break
                  case score>60:
                    color="yellow"
                    break
                  default:
                    color="red"
                    break}

                  })} */}
                  <h1 style={{fontSize: '100px', color: 'green'}}>{this.props.results.breakdown[category[1]]}</h1>
              <Card.Title>{category[1]}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Maybe a link to {category[1]} in {this.props.results["Neighborhood"]}</small>
              
            </Card.Footer>
          </Card>
            </Col>
          )
        })}
          
        </CardDeck>
      </div>
    )
  }
}

export default ScoreBreakdown
