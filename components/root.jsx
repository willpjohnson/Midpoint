import React from 'react';

import Leftbar from './leftbar';
import Rightbar from './rightbar';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.markers = [];
    this.deletedMarkers = [];
  }

  componentDidMount() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 40.6959498, lng: -73.963771}
    });
    this.forceUpdate()
  }

  render() {
    return(
      <div>
        <Leftbar map={this.map} markers={this.markers} deletedMarkers={this.deletedMarkers} />
        <Rightbar map={this.map} markers={this.markers} />
        <div id="map"></div>
      </div>
    )
  }
}

export default Root;
