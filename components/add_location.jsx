import React from 'react';
import { threeRandomLocations } from '../javascripts/test_locations';

class AddLocation extends React.Component {
  constructor(props) {
    super(props)
    this.geocoder = new google.maps.Geocoder();
    this.state = {address: undefined, city: "Brooklyn, NY", title: undefined}

    this.midpoint = null;
    this.addAddress = this.addAddress.bind(this);
    this.updateField = this.updateField.bind(this);
    this.getMidpoint = this.getMidpoint.bind(this);
    this.addThreeTestAddresses = this.addThreeTestAddresses.bind(this);
    this.createMarker = this.createMarker.bind(this);
  }

  updateField(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  addAddress() {
    const createMarker = this.createMarker;
    const info = {map: this.props.map, markers: this.props.markers, address: this.state.address, city: this.state.city, title: this.state.title};
    this.geocoder.geocode({'address': info.address + " " + info.city}, function(results, status) {
      if (status === 'OK') {
        let position = results[0].geometry.location;
        createMarker(position, info.map, info.title, info.address, info.city);
      } else {
        alert('Midpoint could not add location for the following reason: ' + status);
      }
    });
  }

  addThreeTestAddresses() {
    const locations = threeRandomLocations();
    const createMarker = this.createMarker;
    const info = {map: this.props.map, markers: this.props.markers};
    locations.forEach( (testLocation) => {
      this.geocoder.geocode({'address': testLocation.address + " " + testLocation.city}, function(results, status) {
        if (status === 'OK') {
          let position = results[0].geometry.location;
          createMarker(position, info.map, testLocation.title, testLocation.address, testLocation.city);
        } else {
          alert('Midpoint could not add location for the following reason: ' + status);
        }
      })
    })
  }

  createMarker(position, map, title, address, city) {
    const markers = this.props.markers;
    const deletedMarkers = this.props.deletedMarkers;
    let marker = new google.maps.Marker({map, position});
    const id = markers.length + deletedMarkers.length;
    marker.metadata = {id}
    markers.push({marker, address, city, title, lat: position.lat(), lng: position.lng()});
    let infoWindow = new google.maps.InfoWindow({
      content: '<h1 class="marker-headline">' + title + '</h1><h2 class="marker-info">' + address + '</h2>'
    })
    marker.addListener('mouseover', () => infoWindow.open(map, marker));
    marker.addListener('mouseout', () => infoWindow.close(map, marker));
    marker.addListener('click', () => {
      markers.forEach( (listedMarker, idx) => {
        if (listedMarker.marker.metadata.id === marker.metadata.id) {
          deletedMarkers.push(listedMarker);
          markers.splice(idx, 1);
          marker.setMap(null);
        }
      });
    })
    this.resizeMap(markers, map);
  }

  resizeMap(markers, map) {
    const lats = [];
    const lngs = [];
    markers.forEach( (marker) => {
      lats.push(marker.lat);
      lngs.push(marker.lng);
    })
    const sw = new google.maps.LatLng(Math.min(...lats), Math.min(...lngs));
    const ne = new google.maps.LatLng(Math.max(...lats), Math.max(...lngs));
    const bounds = new google.maps.LatLngBounds(sw, ne);
    map.fitBounds(bounds, 30);
    if (map.zoom > 15) map.setZoom(15);
  }

  getMidpoint() {
    if (this.midpoint) this.midpoint.setMap(null);
    const map = this.props.map;
    const lats = [];
    const longs = [];
    this.props.markers.forEach( (marker) => {
      lats.push(marker.marker.position.lat());
      longs.push(marker.marker.position.lng());
    })
    const avgLat = (lats.reduce((a,b) => a + b, 0)) / lats.length;
    const avgLong = (longs.reduce((a,b) => a + b, 0)) / longs.length;
    this.midpoint = new google.maps.Marker({
      map: map,
      position: {lat: avgLat, lng: avgLong},
      icon: 'markers/blue_MarkerM.png'
    });
  }

  render() {
    return(
      <div id="add-location-form">
        <h2 style={{fontWeight: 400, fontSize: 20}}>Add Location</h2>
        <input onChange={this.updateField("address")} className="add-location-input" id="address" type="textbox" value={this.state.address} placeholder="Street Address"></input><br />
        <input onChange={this.updateField("city")} className="add-location-input" id="city" type="textbox" value={this.state.city} placeholder="City"></input><br />
        <input onChange={this.updateField("title")} className="add-location-input" id="title" type="textbox" value={this.state.title} placeholder="Location Name"></input><br />
        <input className="button" id="submit" type="button" value="Add Location" onClick={this.addAddress}></input><br />
        <input className="button" id="midpoint" type="button" value="Get Midpoint" onClick={this.getMidpoint}></input><br /><br />
        <input className="button" id="submit" type="button" value="Add 3 Random Locations" onClick={this.addThreeTestAddresses}></input>
      </div>
    )
  }
}

export default AddLocation;
