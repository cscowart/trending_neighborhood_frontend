import React, { Component } from 'react'
import {Col, Card, CardDeck} from 'react-bootstrap'
import ReactSpeedometer from "react-d3-speedometer"


class ScoreBreakdown extends Component {

  getScoreColor = (score) => {
    let color = ""   
    switch(true) {
      case score>97:
        color="#00FF00"
        break;
      case score>94:
          color="#12FF00"
        break;
      case score>91:
          color="#24FF00"
        break;
        case score>88:
          color="#35FF00"
        break;
      case score>85:
          color="#47FF00"
        break;
      case score>82:
          color="#58FF00"
        break; 
      case score>79:
          color="#6AFF00"
        break;
      case score>76:
          color="#7CFF00"
        break;  
      case score>73:
          color="#8DFF00"
        break;  
      case score>70:
          color="#9FFF00"
        break;  
      case score>67:
          color="#B0FF00"
        break;  
      case score>64:
          color="#C2FF00"
        break;  
      case score>61:
          color="#D4FF00"
        break;  
      case score>58:
          color="#E5FF00"
        break;  
      case score>55:
          color="#F7FF00"
        break;
      case score>52:
          color="#FFF600"
        break;  
      case score>49:
          color="#FFE400"
        break;  
      case score>46:
          color="#FFD300"
        break;  
      case score>43:
          color="#FFC100"
        break;  
      case score>40:
          color="#FFAF00"
        break;  
      case score>37:
          color="#FF9E00"
        break;   
      case score>34:
          color="#FF8C00"
        break;  
      case score>31:
          color="#FF7B00"
        break;  
      case score>28:
          color="#FF6900"
        break;  
      case score>25:
          color="#FF5700"
        break;  
      case score>22:
          color="#FF4600"
        break;
      case score>19:
          color="#FF3400"
        break;  
      case score>16:
          color="#FF2300"
        break;  
      case score>13:
          color="#FF1100"
        break;                                 
      default:
        color="#FF0000"
      }        
    return ({
      fontSize: '100px',
      fontFamily: 'Lobster', 
      color: color
    })
        
     
  }

  render() {
    let sortedArray=[]
    for (let i in this.props.userPreferences){sortedArray.push([this.props.userPreferences[i], i])}
    sortedArray=sortedArray.reverse().sort().reverse() 

   
    // console.log("this.props.results", this.props.results)
    



    return (
      <div >
        <CardDeck className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3  row-cols-xl-5"> 

        {sortedArray.map(category => {
          return (
            <Col className="my-4 ">
              <Card style={{width: '190px'}}>
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
              <h1 style={this.getScoreColor(this.props.results.breakdown[category[1]])}>{this.props.results.breakdown[category[1]]}</h1>
            </Card.Body>
              <Card.Footer>{category[1]}</Card.Footer>
            {/* <Card.Footer>
              <small className="text-muted">Maybe a link to {category[1]} in {this.props.results["Neighborhood"]}</small>
              
            </Card.Footer> */}
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
