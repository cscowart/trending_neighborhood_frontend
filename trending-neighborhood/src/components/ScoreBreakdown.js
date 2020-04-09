import React, { Component } from 'react'
import {Col, Card, CardDeck} from 'react-bootstrap'
import ReactSpeedometer from "react-d3-speedometer"

class ScoreBreakdown extends Component {

  render() {
    return (
      <div>
        <CardDeck className="row row-cols-1 row-cols-lg-2  row-cols-xl-3"> 
        {Object.entries(this.props.categories).map((category) => {
          return (
            <Col className="my-4">
              <Card >
              <ReactSpeedometer
                width={300}
                height={175}
                needleHeightRatio={0.7}
                // Get value from API Return not the category score
                value={category[1] * 10} 
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
              />
            <Card.Body>
              <Card.Title>{category[0]}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Maybe a link to {category[0]} in x neighborhood</small>
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
