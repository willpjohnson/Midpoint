import React from 'react';
import AddLocation from './add_location';

class Leftbar extends React.Component {
  constructor(props) {
    super(props)

    this.recenterMap = this.recenterMap.bind(this);
    this.clearMap = this.clearMap.bind(this);
  }

  recenterMap() {
    if (this.props.markers.length < 1) return;
    const lats = [];
    const lngs = [];
    this.props.markers.forEach( (marker) => {
      lats.push(marker.lat);
      lngs.push(marker.lng);
    })
    const sw = new google.maps.LatLng(Math.min(...lats), Math.min(...lngs));
    const ne = new google.maps.LatLng(Math.max(...lats), Math.max(...lngs));
    const bounds = new google.maps.LatLngBounds(sw, ne);
    this.props.map.fitBounds(bounds, 30);
    if (this.props.map.zoom > 15) this.props.map.setZoom(15);
  }

  clearMap() {
    // Clear Directions
    if (this.props.displayedDirections[0]) this.props.displayedDirections[0].setMap(null)
    this.props.displayedDirections.length = 0;
    // Clear Markers
    this.props.markers.forEach( (marker) => {
      marker.marker.setMap(null);
    })
    this.props.markers.length = 0;
    // Clear DeletedMarkers
    this.props.deletedMarkers.length = 0;
  }

  render() {
    return(
      <div id="leftbar">
        <AddLocation map={this.props.map} markers={this.props.markers} deletedMarkers={this.props.deletedMarkers} />
        <input className="button" type="button" value="Recenter Map" onClick={this.recenterMap}></input><br />
        <input className="button" type="button" value="Clear Map" onClick={this.clearMap}></input>
      </div>
    )
  }
}

export default Leftbar;
