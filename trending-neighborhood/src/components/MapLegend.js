import React, { Component } from 'react'
import { Card, Media } from 'react-bootstrap'

export class MapLegend extends Component {
  render() {
    return (
      <Card id="map-legend" >
        <Media className="map-legend-category" >
          <img
            width={15}
            height={15}
            style={{backgroundColor: '#00342c'}}
          />
          <Media.Body>
            <p>Perfect Fit</p>
          </Media.Body>
        </Media>
        <Media className="map-legend-category">
          <img
            width={15}
            height={15}
            style={{backgroundColor: '#006d2c'}}
          />
        </Media>
        <Media className="map-legend-category">
          <img
            width={15}
            height={15}
            style={{backgroundColor: '#238b45'}}
          />
          <Media.Body>
            <p>Good Fit</p>
          </Media.Body>
        </Media>
        <Media className="map-legend-category">
          <img
            width={15}
            height={15}
            style={{backgroundColor: '#99d8c9'}}
          />
        </Media>
        <Media className="map-legend-category">
          <img
            width={15}
            height={15}
            style={{backgroundColor: '#f7fcfd'}}
          />
          <Media.Body>
            <p>Neutral Fit</p>
          </Media.Body>
        </Media>
      </Card>
    )
  }
}

export default MapLegend
