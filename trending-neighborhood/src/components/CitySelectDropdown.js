import React, { Component } from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'

class CitySelectDropdown extends Component {

  render() {
    return (
      <DropdownButton  size="lg" as={ButtonGroup} title={this.props.city ? this.props.city : "Select a city"}>
      {/* <Button size="lg" >{this.props.city ? this.props.city: 'Choose your city'}</Button> */}
          {this.props.cities.map((city, index) => {
            return (
              <Dropdown.Item eventKey={index} key={index + 1} id={index} onChange={this.props.handleBackgroundImage} onSelect={ this.props.handleCitySelect }>{city}</Dropdown.Item>
            )
          })}
      </DropdownButton>
    );
  }
}

export default CitySelectDropdown;