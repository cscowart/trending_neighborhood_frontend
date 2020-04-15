import React, { Component } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'

class CitySelectDropdown extends Component {

  render() {
    return (
      <DropdownButton size="lg" as={ButtonGroup} title={this.props.city ? this.props.city : "Select a city"}>
        <ul style={{height: '150px', width: 'auto', overflow: 'auto'}}>
          <Dropdown.Item disabled>Scroll for more cities</Dropdown.Item>
          {this.props.cities.map((city, index) => {
            return (
              <Dropdown.Item eventKey={index} key={index + 1} id={index} onChange={this.props.handleBackgroundImage} onSelect={ this.props.handleCitySelect }>{city}</Dropdown.Item>
            )
          })}
        </ul>
      </DropdownButton>
    );
  }
}

export default CitySelectDropdown;