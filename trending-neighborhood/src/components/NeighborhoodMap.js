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

  onEachFeature(feature, layer)  {
    let matching = layer.options.results.find(element => element["Neighborhood"] == feature.properties.name)
    let color = ""
    let score = null
    if (matching) {
      score = matching["Overall Score"]
      switch(true) {
        case (score > 90):
          color = '#006d2c'
          break
        case (score > 80):
          color = '#238b45'
          break
        case (score > 70):
          color = '#41ae76'
          break
        case (score > 60):
          color = '#66c2a4'
          break
        case (score > 50):
          color = '#99d8c9'
          break
        case (score > 40):
          color = '#ccece6'
          break
        case (score > 30):
          color = '#e5f5f9'
          break
        default:
          color = '#f7fcfd'
        }
        layer.setStyle({
          color: '#1f2021',
          weight: 1,
          fillOpacity: .75,
          fillColor: color,
        })
        let sortedArray=[]
        for (let i in matching.breakdown){sortedArray.push([parseInt(matching.breakdown[i]), i])}
        sortedArray=sortedArray.sort().reverse()   
        const popupContent = ` <Popup>
          <p>
          <b>${feature.properties.name} </b><br><br>
          ${sortedArray[0][1]}: ${sortedArray[0][0]}<br>
          ${sortedArray[1][1]}: ${sortedArray[1][0]}<br>
          ${sortedArray[2][1]}: ${sortedArray[2][0]}<br>
          ${sortedArray[3][1]}: ${sortedArray[3][0]}<br>
          ${sortedArray[4][1]}: ${sortedArray[4][0]}<br>
          ${sortedArray[5][1]}: ${sortedArray[5][0]}<br>
          ${sortedArray[6][1]}: ${sortedArray[6][0]}<br>
          ${sortedArray[7][1]}: ${sortedArray[7][0]}<br>
          ${sortedArray[8][1]}: ${sortedArray[8][0]}<br>
          ${sortedArray[9][1]}: ${sortedArray[9][0]}<br>
          </p>
        </Popup>`
        layer.bindPopup(popupContent)

      } else {
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
    if (this.props.results === null) {
      return (
        <ReactLoading type={"bars"} color={"#ffffff"} height={'20%'} width={'20%'} />
      )
    }
    const position = [this.state.lat, this.state.lng]
    const props = this.props.results["Overall Score"]
    return (
      <Map scrollWheelZoom={false} center={position} zoom={this.state.zoom} style={{height: "960px", width: '100%'}}>
        <TileLayer //Layer that displays the watermark on the bottom right of the map
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        <GeoJSON //Layer that imports all the neighborhood boundaries and makes them clickable
          data={ChicagoNeighborhoods}
          results={this.props.results}
          onEachFeature={this.onEachFeature}
        />    
      </Map>
    )
  }
}

export default NeighborhoodMap;