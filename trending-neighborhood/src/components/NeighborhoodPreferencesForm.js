import React, { Component } from 'react';
import { ListGroup, Dropdown, DropdownButton, ToggleButton, ButtonGroup, Card, Row, Col, Button, Form } from 'react-bootstrap'
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
      {/* <Card style={{width: '25vw'}}> */}
        <Card style={{position: 'absolute', top: '0%', right: '2%', zIndex: '3', height: '100', width: '300px', overflow: 'auto'}} id="dropdown-menu-align-right" title="Customize my Neighborhood">
          <Card.Header>Customize my Neighborhood</Card.Header>
          <ListGroup style={{width: '100%'}}>
           
            <ListGroup.Item style={{zIndex: '3'}}>
              {Categories.map((category, index) => {
              return (
                <>  
                {/* <ListGroup.Item >  */}
                  <b>{category}</b>
                  {/* </ListGroup.Item> */}
                {/* <ListGroup.Item > */}
                  <Form.Group controlId="formBasicRangeCustom">
                    <Form.Control type="range" defaultValue='0' custom />
                  </Form.Group>
                {/* </ListGroup.Item> */}
                <Dropdown.Divider />
                    </>    
                      // <p style={{textAlign: "center"}}>Customize this Neighborhood</p>
                      // <hr style={{borderTop: "2px solid black"}} />
                      // <Col>     
                      
                      // {/* <Row> */}
                      // {/* </Row> */}
                      // <br />
                      
                      
                      //       {/* <Form.Group id={this.getPreferenceName(index)} key={index} controlId="neighborhoodPreferences">
                      
                      //  <Form.Control onChange={this.props.handleCategoryScore} as="select" >
                      //  <option hidden={true} id="0" value='0'>How important is this to you?</option>
                      //  <option id='1' value="1" >Somewhat important</option>
                      //  <option id='2' value="2">Fairly important</option>
                      //  <option id='3' value="3">Very important</option>
                      //  </Form.Control>
                    // </Form.Group> */}
                    
                    )
                  })}
              </ListGroup.Item>
              </ListGroup>
          <Dropdown.Divider />
          <Dropdown.Item as="button" type="submit" >Build it!</Dropdown.Item>
        </Card>
                
              {/* <hr style={{borderTop: "2px solid black"}} />
              <Row md='auto'>
                <Col></Col>
                <Col>
                  <Button className="mb-3" type="submit">
                  Submit
                  </Button>
                </Col>
                <Col></Col>
              </Row> */}

            {/* </Col>  */}
          {/* </Row>  */}
          {/* </Card> */}
       </Form>
      
    );
  }
}
}

export default NeighborhoodPreferencesForm;