import React, { Component } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'

class ExploreCitySelectDropdown extends Component {
  render() {
    return (
      <DropdownButton  variant="outline-success" as={ButtonGroup} title={this.props.city ? this.props.city : "Select a city"}>
          {this.props.cities.map((city, index) => {
            return (
              <Dropdown.Item eventKey={index} key={index + 1} id={index} onChange={this.props.handleBackgroundImage} onSelect={ this.props.handleCitySelect }>{city}</Dropdown.Item>
            )
          })}
      </DropdownButton>
    )
  }
}

export default ExploreCitySelectDropdown
