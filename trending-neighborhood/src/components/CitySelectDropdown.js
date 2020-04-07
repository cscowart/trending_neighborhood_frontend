import React, { Component } from 'react';
import {Button, ButtonGroup, Dropdown} from 'react-bootstrap'

class CitySelectDropdown extends Component {

  render() {
    return (
      <Dropdown  as={ButtonGroup}>
      <Button size="lg" variant="info">{this.props.city ? this.props.city: 'Choose your city'}</Button>
        <Dropdown.Toggle split variant="success" />
        <Dropdown.Menu>
          {this.props.cities.map((city, index) => {
            return (
              <Dropdown.Item eventKey={index} key={index + 1} id={index} onChange={this.props.handleBackgroundImage} onSelect={ this.props.handleCitySelect }>{city}</Dropdown.Item>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default CitySelectDropdown;