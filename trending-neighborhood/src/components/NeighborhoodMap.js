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

  geoJSONStyle(feature) {
    console.log("I'm the feature!",feature)
    console.log("I'm the props!", this.props)

    return {      
      color: '#1f2021',
      weight: 1,
      fillOpacity: 0.25,
      fillColor: '#fff2af',

    }
  }

  onEachFeature(feature, layer)  {
    // console.log("I'm the props!",props)

    const popupContent = ` <Popup><p>Customizable Popups <br />with feature information.</p><pre>Neighborhood: <br />${feature.properties.name}</pre></Popup>`
    layer.bindPopup(popupContent)
    // let neighborhood = this.props.results.filter(el => el["Neighborhood"] == feature.properties.name)
    // console.log(neighborhood)
    // layer.setStyle({
    //   color: '#1f2021',
    //   weight: 1,
    //   fillOpacity: 0.25,
    //   fillColor: '#fff2af',
    // })
  }


  getScoreColor = (geoJsoNneighborhood) => {
    let neighborhood = this.props.results.find(el => el["Overall Score"] == geoJsoNneighborhood)
    console.log(neighborhood)
    // let score = neighborhood["Overall Score"]
    // switch(true) {
    //   case (score >= 90):
    //     return '#006d2c'
    //   case (score >= 80):
    //     return '#238b45'
    //   case (score >= 70):
    //     return '#41ae76'
    //   case (score >= 60):
    //     return '#66c2a4'
    //   case (score >= 50):
    //     return '#99d8c9'
    //   case (score >= 40):
    //     return '#ccece6'
    //   case (score >= 30):
    //     return '#e5f5f9'
    //   default:
    //     return '#f7fcfd'
    // }
  }

  
  render() {
    console.log(this.props)
    const position = [this.state.lat, this.state.lng]
    const props = this.props.results
    // console.log("Props", props)
    return (
      <Map scrollWheelZoom={false} center={position} zoom={this.state.zoom} style={{height: "960px", width: '100%'}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={ChicagoNeighborhoods}
          style= {this.geoJSONStyle}

          onEachFeature={this.onEachFeature}
     
        />
      </Map>
    );
  }
}

export default NeighborhoodMap;