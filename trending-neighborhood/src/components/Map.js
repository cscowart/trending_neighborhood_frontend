import React, { Component } from 'react';
import { loadModules } from 'esri-loader';

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
    .then(([ArcGISMap, MapView]) => {
      const map = new ArcGISMap({
        basemap: 'topo-vector'
      });
      const cityCenter = this.getCityCenter()
      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: cityCenter,
        zoom: 12
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !==  prevProps.city){
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView'], { css: true })
      .then(([ArcGISMap, MapView]) => {
        const map = new ArcGISMap({
          basemap: 'topo-vector'
        });
        const cityCenter = this.getCityCenter()
        this.view = new MapView({
          container: this.mapRef.current,
          map: map,
          center: cityCenter,
          zoom: 12
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

  getCityCenter = () => {
    switch(this.props.city) {
      case "Atlanta":
        return [-84.3880, 33.7490]
      case "Austin":
        return [-97.7431, 30.2672]
      case "Chicago":
        return [-87.6298, 41.8781]
      case "New York City":
        return [-74.0060, 40.7128]
      default:
        return [-87.6298, 41.8781]
    }
  }

  render() {
    return (
      <div className="webmap mt-5" ref={this.mapRef} style={{height: '960px', width: '100%'}}/>
    );
  }
}

export default Map;