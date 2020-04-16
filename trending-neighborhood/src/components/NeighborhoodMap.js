import React, { Component } from 'react';
import '../App.css'
import { Map, GeoJSON, Marker, Popup, TileLayer } from 'react-leaflet'
import AtlantaNeighborhoods from '../geojson/ATL-zillow-neighborhoods.json';
import BostonNeighborhoods from '../geojson/BOS-zillow-neighborhoods.json';
import ChicagoNeighborhoods from '../geojson/chicago-zillow-neighborhoods.json';
import DallasNeighborhoods from '../geojson/DAL-zillow-neighborhoods.json';
import HoustonNeighborhoods from '../geojson/HOU-zillow-neighborhoods.json';
import LosAngelesNeighborhoods from '../geojson/LA-zillow-neighborhoods.json';
import NYCNeighborhoods from '../geojson/NYC-zillow-neighborhoods.json';
import PhiladelphiaNeighborhoods from '../geojson/PHL-zillow-neighborhoods.json';
import SFNeighborhoods from '../geojson/SF-zillow-neighborhoods.json';
import DCNeighborhoods from '../geojson/DC-zillow-neighborhoods.json';
import ReactLoading from 'react-loading';

class NeighborhoodMap extends Component{
  state = {
    lat: 41.83,
    lng: -87.629,
    zoom: 12,
    scrollWheelZoom: false,
    change: false,
    cityGeo: null,
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
      case "Atlanta":
        this.setState({
          lat: 33.749, 
          lng: -84.388,
          zoom: 12,
          cityGeo: AtlantaNeighborhoods,
        }); 
      break; 
      case "Boston":
        this.setState({
          lat: 42.3601, 
          lng: -71.0589,
          zoom: 12,
          cityGeo: BostonNeighborhoods,
        }); 
      break; 
      case "Chicago":
        this.setState({
          lat: 41.83, 
          lng: -87.629,
          zoom: 12,
          cityGeo: ChicagoNeighborhoods,
        }); 
      break;
      case "Dallas":
        this.setState({
          lat: 32.7767, 
          lng: -96.7970,
          zoom: 12,
          cityGeo: DallasNeighborhoods,
        }); 
      break; 
      case "Houston":
        this.setState({
          lat: 29.7604, 
          lng: -95.3698,
          zoom: 12,
          cityGeo: HoustonNeighborhoods
        }); 
      break; 
      case "Los Angeles":
        this.setState({
          lat: 34.0522, 
          lng: -118.2437,
          zoom: 12,
          cityGeo: LosAngelesNeighborhoods,
        }); 
      break;  
      case "New York City":
        this.setState({
          lat: 40.78, 
          lng: -73.92,
          zoom: 12,
          cityGeo: NYCNeighborhoods,
        }); 
      break; 
      case "Philadelphia":
        this.setState({
          lat: 39.9526,
          lng: -75.1652,
          zoom: 12,
          cityGeo: PhiladelphiaNeighborhoods,
        }); 
      break; 
      case "San Francisco":
        this.setState({
          lat: 37.7749, 
          lng: -122.4194,
          zoom: 12,
          cityGeo: SFNeighborhoods,
        }); 
      break; 
      case "Washington D.C.":
        this.setState({
          lat: 38.9072, 
          lng: -77.0009,
          zoom: 12,
          cityGeo: DCNeighborhoods,
        }); 
      break;   
      default:
        this.setState({
          lat: 38.9072, 
          lng: -77.0369,
          zoom: 12,
          cityGeo: ChicagoNeighborhoods,
        }) 
    }
  }

  zoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 3
    })
  }

  clickToFeature = (e) => {
    let layer = e.target
    console.log(layer)
  }

  onEachFeature(feature, layer)  {
    // layer.on({
    //   click: this.clickToFeature
    // })
    let matching = layer.options.results.find(element => element["Neighborhood"] == feature.properties.name)
    let expanded = layer.options.showExpandedCategories
    let color = ""
    let score = null
    if (matching) {
      score = matching["Overall Score"]
      switch(true) {
        case (score > 97): color = '#00342c'; break;
        case (score > 95): color = '#00412c'; break;
        case (score > 92): color = '#00662c'; break;
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
        <Popup onClick={this.zoomIn}>
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
        const popupContent = ` <Popup id="map-pop-up"><b>${feature.properties.name}</b></Popup>`
        layer.bindPopup(popupContent)
      }
    }
  
  render() {
    const position = [this.state.lat, this.state.lng]
    let isChanged = this.state.change
    return (
      <Map scrollWheelZoom={false} center={position} zoom={this.state.zoom} > {/* style={{height: "960px", width: '100%'}}*/}
        <TileLayer //Layer that displays the watermark on the bottom right of the map
          url='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png'
          attribution='<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
            />
        <GeoJSON //Layer that imports all the neighborhood boundaries and makes them clickable
          key={isChanged}
          data={this.state.cityGeo}
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