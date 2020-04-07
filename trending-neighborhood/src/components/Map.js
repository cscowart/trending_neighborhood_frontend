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

      this.view = new MapView({
        container: this.mapRef.current,
        map: map,
        center: [-87.6298, 41.8781],
        zoom: 12
      });
    });
  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }

    componentDidUpdate = (snapshot) => {
    console.log(snapshot)
    // if (this.props.city !== prevProps.city){
    //   switch(this.props.city) {
    //     case "Atlanta":
    //       this.setprops({
    //         backgroundImage: atlantaIMG
    //       })
    //       break;
    //     case "Austin":
    //       this.setState({
    //         backgroundImage: austinIMG
    //       })
    //       break;
    //     case "Chicago":
    //       this.setState({
    //         backgroundImage: chicagoIMG
    //       })
    //       break;
    //     case "New York City":
    //       this.setState({
    //         backgroundImage: nycIMG
    //       })
    //       break;
    //     default:
    //       this.setState({
    //         backgroundImage: defaultIMG
    //       })
    //   }
    // }
  }

  render() {
    return (
      <div className="webmap" ref={this.mapRef} style={{height: "400px",}}/>
    );
  }
}

export default Map;