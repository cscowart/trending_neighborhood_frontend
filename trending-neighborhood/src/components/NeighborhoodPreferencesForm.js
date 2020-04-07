import React, { Component } from 'react';
import { Row, Col, Accordion, Button, Form } from 'react-bootstrap'
// import CategorySlider from './CategorySlider'
import Categories from '../config/Categories.json';

class NeighborhoodPreferencesForm extends Component {

  getPreferenceName = index => {
    return(Object.getOwnPropertyNames(this.props.categories)[index]) 
  }

  changeBorder = event => {
    if (event.target.style.border === 'none') {
      event.target.style.border = 'solid green 2px'
    } else {
      event.target.style.border = 'none'
    }
  }

  render() {
    if (!this.props.city) {
      return (
        <div></div>
      )
    }

    else {
    return (
      <Form onSubmit={ this.props.handleCategoriesSubmit }>
        <p>What factors into your ideal neighborhood?</p>
        <hr style={{borderTop: "2px solid black"}} />
          <Row>
            <Col>     
              {Categories.map((category, index) => {
                return (
                  <Accordion key={index}>            
                    <Accordion.Toggle as={Button} variant="" eventKey="0" onClick={this.changeBorder} style={{
                      border: 'none',
                      textAlign: 'left',
                    }}>
                      {category}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Form.Group id={this.getPreferenceName(index)} key={index} controlId="neighborhoodPreferences">
                        <Form.Control onChange={this.props.handleCategoryScore} as="select" >
                          <option hidden={true} id="0" value='0'>How important is this to you?</option>
                          <option id='1' value="1" >Somewhat important</option>
                          <option id='2' value="2">Fairly important</option>
                          <option id='3' value="3">Very important</option>
                        </Form.Control>
                      </Form.Group>
                    </Accordion.Collapse>  
                  </Accordion>
                )
              })}
              <hr style={{borderTop: "2px solid black"}} />
              <Button type="submit">
                Submit
              </Button>
            </Col> 
          </Row> 
      </Form>
      
    );
  }
}
}

export default NeighborhoodPreferencesForm;