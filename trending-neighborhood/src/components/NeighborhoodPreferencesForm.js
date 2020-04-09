import React, { Component } from 'react';
import { ListGroup, Dropdown, DropdownButton, ToggleButton, ButtonGroup, Card, Row, Col, Button, Form } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
// import CategorySlider from './CategorySlider'

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
        <Card style={{position: 'absolute', top: '0%', right: '2%', zIndex: '3', height: '100', width: '300px', overflow: 'auto'}} id="dropdown-menu-align-right" title="Customize my Neighborhood">
          <Card.Header>Customize my Neighborhood</Card.Header>
          <ListGroup style={{width: '100%'}}>      
            <ListGroup.Item style={{zIndex: '3'}}>
              {Object.entries(this.props.categories).map((category, index) => {
                return (
                <>  
                  <b>{category[0]}</b>
                  <Form.Group id={this.getPreferenceName(index)} key={index} controlId="neighborhoodPreferences">
                    <Form.Control type="range" defaultValue={category[1]} custom onChange={this.props.handleCategoryScore}/>
                  </Form.Group>
                </>    
                    )
                  })}
              </ListGroup.Item>
            </ListGroup>
              
            <BootstrapSwitchButton 
              // width={200}
              checked={true}
              onlabel='Complicate things!'
              offlabel='Too much?'
              offstyle='info'
              size='md'
              onChange={ this.props.handleExpandedCategories }
            />
          <Dropdown.Divider />

          {/* <DropdownToggle className="text-center" as="button"  onClick={this.props.handleResetValues}  >Reset All Values</DropdownToggle> */}
          <Dropdown.Divider />
          <Dropdown.Item className="text-center" as="button" type="submit" active> Build it! </Dropdown.Item>
        </Card>
       </Form>
      // this.props.handleResetValues
    );
  }
}
}

export default NeighborhoodPreferencesForm;