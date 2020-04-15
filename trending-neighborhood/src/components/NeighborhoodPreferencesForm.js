import React, { Component } from 'react';
import { ListGroup, Dropdown, DropdownItem, DropdownButton, ToggleButton, ButtonGroup, Card, Row, Col, Button, Form } from 'react-bootstrap'
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
      <Form id="preferences" onSubmit={ this.props.handleCategoriesSubmit }>
        <Card style={{position: 'absolute', top: '0%', right: '2%', zIndex: '3', height: '560px', width: '380px', opacity: '0.9'}} id="dropdown-menu-align-right" title="Customize my Neighborhood">
          <Card.Header>Customize my Neighborhood</Card.Header>
          <Card.Body style={{overflow: 'auto'}}>
            {Object.entries(this.props.categories).map(     (category) => {
              let categoryName=category[0]
              let score = category[1][1]
              let valueText=""
              switch (true) {
                case (score>87): valueText="Very important"; break;
                case (score>62): valueText="Moderately important"; break;
                case (score>37): valueText="Somewhat important"; break;
                case (score>0): valueText="A little important"; break;
                default: valueText="How important is this?"
              }
              if ((!this.props.showExpandedCategories && category[1][0]==1) || (this.props.showExpandedCategories)) {
                return (
                  <>  
                  <b>{categoryName}: </b>&ensp; <span className="text-muted justify-end"> {valueText}</span>
                  <Form.Group id={categoryName} key={categoryName} controlId="neighborhoodPreferences">
                    <Form.Control type="range" value={score} custom onChange={this.props.handleCategoryScore}/>
                  </Form.Group>
                  </>    
                    )}
                  })}
          </Card.Body>
          <Card.Footer>
            <ListGroup>
              <DropdownItem className="text-center" variant="info" onClick={ this.props.handleResetValues} > Reset all categories </DropdownItem>

              <Dropdown.Divider />
              <BootstrapSwitchButton 
              // width={200}
              checked={!this.props.showExpandedCategories}
              onlabel='Complicate things!'
              offlabel='Too much?'
              offstyle='info'
              size='md'
              onChange={ this.props.handleExpandedCategories }
              />

            <Dropdown.Divider />
            <Button className="text-center" variant="success" type="submit" > Build it! </Button>

            </ListGroup>
          </Card.Footer>
        </Card>
       </Form>
    );
  }}}

export default NeighborhoodPreferencesForm;