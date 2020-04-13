import React, { Component } from 'react';
import '../App.css'
import { Map, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet'
import ChicagoNeighborhoods from '../geojson/chicago-zillow-neighborhoods.json';
import ReactLoading from 'react-loading';

class NeighborhoodMap extends Component{
  state = {
    lat: 41.878,
    lng: -87.629,
    zoom: 12,
    scrollWheelZoom: false,
    change: false,
  }
  
  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  componentDidMount(){
    console.log("Mounting")
    this.getCityCenter()
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.results !== this.props.results){
      this.setState(
        {change: !this.state.change
      })
    }
    if (this.props.city !==  prevProps.city){
      this.getCityCenter()
    }
  }

  getCityCenter = () => {
    switch(this.props.city) {
      case "Atlanta":this.setState({lat: 33.749, lng: -84.388,}); break; 
      case "Austin":this.setState({lat: 30.267, lng: -97.743,}); break; 
      case "Chicago":this.setState({lat: 41.878, lng: -87.629,}); break; 
      case "New York City":this.setState({lat: 40.712, lng: -74.006,}); break; 
      default:this.setState({lat: 41.878, lng: -87.629,}) 
    }
  }

  onEachFeature(feature, layer)  {
    let matching = layer.options.results.find(element => element["Neighborhood"] == feature.properties.name)
    let expanded = layer.options.showExpandedCategories
    let color = ""
    let score = null
    if (matching) {
      score = matching["Overall Score"]
      switch(true) {
        case (score > 95): color = '#00412c'; break;
        case (score > 92): color = '#00592c'; break;
        case (score > 90): color = '#006d2c'; break;
        case (score > 85): color = '#237845'; break;
        case (score > 82): color = '#237d45'; break;
        case (score > 80): color = '#238b45'; break;
        case (score > 70): color = '#41ae76'; break;
        case (score > 60): color = '#66c2a4'; break;
        case (score > 50): color = '#99d8c9'; break;
        case (score > 40): color = '#ccece6'; break;
        case (score > 30): color = '#e5f5f9'; break;
        default: color = '#f7fcfd'
      }
      layer.setStyle({
        color: '#1f2021',
        weight: 1,
        fillOpacity: .75,
        fillColor: color,
      })
  
      let sortedArray=[]
      for (let i in matching.breakdown) {
        if ((!expanded && layer.options.categories[i][0]==1) || (expanded)) {sortedArray.push([layer.options.categories[i][1], parseInt(matching.breakdown[i]), i])}}
        sortedArray=sortedArray.sort(function (a,b) { return b[0]-a[0] || b[1]-a[1]})
      if (!expanded) {
      const popupContent = ` 
        <Popup>
          <p>
            <b>${feature.properties.name} </b><br><br>
            ${sortedArray[0][2]}: ${sortedArray[0][1]}<br>
            ${sortedArray[1][2]}: ${sortedArray[1][1]}<br>
            ${sortedArray[2][2]}: ${sortedArray[2][1]}<br>
            ${sortedArray[3][2]}: ${sortedArray[3][1]}<br>
            ${sortedArray[4][2]}: ${sortedArray[4][1]}<br>
          </p>
        </Popup>`
      layer.bindPopup(popupContent)
      }
      else {
        const popupContent = ` 
        <Popup>
          <p>
            <b>${feature.properties.name} </b><br><br>
            ${sortedArray[0][2]}: ${sortedArray[0][1]}<br>
            ${sortedArray[1][2]}: ${sortedArray[1][1]}<br>
            ${sortedArray[2][2]}: ${sortedArray[2][1]}<br>
            ${sortedArray[3][2]}: ${sortedArray[3][1]}<br>
            ${sortedArray[4][2]}: ${sortedArray[4][1]}<br>
            ${sortedArray[5][2]}: ${sortedArray[5][1]}<br>
            ${sortedArray[6][2]}: ${sortedArray[6][1]}<br>
            ${sortedArray[7][2]}: ${sortedArray[7][1]}<br>
            ${sortedArray[8][2]}: ${sortedArray[8][1]}<br>
            ${sortedArray[9][2]}: ${sortedArray[9][1]}<br>
          </p>
        </Popup>`
      layer.bindPopup(popupContent)
      }
      } 
      else {
        layer.setStyle({
          color: '#1f2021',
          weight: 1,
          fillOpacity: 0.25,
          fillColor: '#fff2af',
        })
        const popupContent = ` <Popup><b>${feature.properties.name}</b></Popup>`
        layer.bindPopup(popupContent)
      }
    }
  
  render() {
    console.log(this.props)
    const position = [this.state.lat, this.state.lng]
    let isChanged = this.state.change
    return (
      <Map scrollWheelZoom={false} center={position} zoom={this.state.zoom} > {/* style={{height: "960px", width: '100%'}}*/}
        <TileLayer //Layer that displays the watermark on the bottom right of the map
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        <GeoJSON //Layer that imports all the neighborhood boundaries and makes them clickable
          key={isChanged}
          data={ChicagoNeighborhoods}
          results={this.props.results}
          onEachFeature={this.onEachFeature}
          showExpandedCategories={this.props.showExpandedCategories}
          categories={this.props.categories}
        /> 
      </Map>
    )
  }
}

export default NeighborhoodMap;