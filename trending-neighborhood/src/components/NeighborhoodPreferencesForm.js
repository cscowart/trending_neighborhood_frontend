import React, { Component } from 'react';
import { Row, Col, Accordion, Button, Form } from 'react-bootstrap'
// import CategorySlider from './CategorySlider'
import Categories from '../config/Categories.json';

class NeighborhoodPreferencesForm extends Component {

  getPreferenceName = index => {
    return(Object.getOwnPropertyNames(this.props.categories)[index]) 
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
        <h2 className='text-center'>What factors into your ideal neighborhood?</h2>
              <Row className="justify-content-md-center" >
                <Col></Col>
                <Col md='auto' >
        
          {Categories.map((category, index) => {
            return (
              <Accordion key={index}>            
                <Accordion.Toggle as={Button} variant="" eventKey="0">
                  
                  {category}
                  
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    {/* <Row className="justify-content-md-center" >
                      <Col></Col>
                      <Col md='auto' > */}
                        <Form.Group id={this.getPreferenceName(index)} key={index} controlId="neighborhoodPreferences">
                          <Form.Control onChange={this.props.handleCategoryScore} as="select" >
                            <option hidden={true} id="0" value='0'>How important is this to you?</option>
                            <option id='1' value="1" >Somewhat important</option>
                            <option id='2' value="2">Fairly important</option>
                            <option id='3' value="3">Very important</option>
                          </Form.Control>
                        </Form.Group>
                      {/* </Col> 
                      <Col></Col>
                    </Row>  */}
                  </Accordion.Collapse>
              
              </Accordion>
             
             )
            })}
            </Col> 
            <Col></Col>
          </Row> 
        <Button type="submit">
          Submit
        </Button>
  </Form>
      
    );
  }
}
}

export default NeighborhoodPreferencesForm;