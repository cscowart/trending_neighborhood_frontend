import React, { Component } from 'react';
import '../App.css'
import { Map, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet'
import ChicagoNeighborhoods from '../geojson/chicago-zillow-neighborhoods.json';

class NeighborhoodMap extends Component{
  state = {
    lat: 41.878,
    lng: -87.629,
    zoom: 12,
    scrollWheelZoom: false
  }


  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  componentDidMount(){
    this.getCityCenter()
  }

  componentDidUpdate(prevProps){
    if (this.props.city !==  prevProps.city){
      this.getCityCenter()
    }
  }

  getCityCenter = () => {
    switch(this.props.city) {
      case "Atlanta":
        this.setState({
          lat: 33.749,
          lng: -84.388,
        })
        break; 
      case "Austin":
        this.setState({
          lat: 30.267,
          lng: -97.743,
        })
        break; 
      case "Chicago":
        this.setState({
          lat: 41.878,
          lng: -87.629,
        })
        break; 
      case "New York City":
        this.setState({
          lat: 40.712,
          lng: -74.006,
        })
        break; 
      default:
        this.setState({
          lat: 41.878,
          lng: -87.629,
        }) 
        break; 
    }
  }

  geoJSONStyle() {
    return {
      color: '#1f2021',
      weight: 1,
      fillOpacity: 0.25,
      fillColor: '#fff2af',
    }
  }

  onEachFeature(feature: Object, layer: Object) {
    const popupContent = ` <Popup><p>Customizable Popups <br />with feature information.</p><pre>Neighborhood: <br />${feature.properties.name}</pre></Popup>`
    layer.bindPopup(popupContent)
  }


  
  render() {
    
    // console.log(this.props)
    const position = [this.state.lat, this.state.lng]
    return (
      <Map scrollWheelZoom={false} center={position} zoom={this.state.zoom} style={{height: "960px", width: '100%'}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={ChicagoNeighborhoods}
          style={this.geoJSONStyle}
          onEachFeature={this.onEachFeature}
        />
      </Map>
    );
  }
}

export default NeighborhoodMap;