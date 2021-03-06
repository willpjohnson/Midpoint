import React from 'react';

import { mapStyle } from '../javascripts/map_style';
import Leftbar from './leftbar';
import Rightbar from './rightbar';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.markers = [];
    this.deletedMarkers = [];
    this.displayedDirections = [];
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), mapStyle);
    this.forceUpdate()
  }

  render() {
    return(
      <div>
        <Leftbar map={this.map} markers={this.markers} deletedMarkers={this.deletedMarkers} displayedDirections={this.displayedDirections}/>
        <Rightbar map={this.map} markers={this.markers} deletedMarkers={this.deletedMarkers} displayedDirections={this.displayedDirections}/>
        <div id="map"></div>
      </div>
    )
  }
}

export default Root;

// zoom: 12,
// center: {lat: 40.6959498, lng: -73.963771},
