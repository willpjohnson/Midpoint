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
  }

  updateField(field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  addAddress() {
    const addInfoWindow = this.addInfoWindow;
    const info = {map: this.props.map, markers: this.props.markers, address: this.state.address, city: this.state.city, title: this.state.title};
    this.geocoder.geocode({'address': info.address + " " + info.city}, function(results, status) {
      if (status === 'OK') {
        let position = results[0].geometry.location;
        let marker = new google.maps.Marker({
          map: info.map,
          position: position
        });
        addInfoWindow(marker, map, info.title, info.address);
        info.markers.push({marker, address: info.address, city: info.city, title: info.title, lat: position.lat(), lng: position.lng()});
      } else {
        alert('Midpoint could not add location for the following reason: ' + status);
      }
    });
  }

  addThreeTestAddresses() {
    const locations = threeRandomLocations();
    const addInfoWindow = this.addInfoWindow;
    const info = {map: this.props.map, markers: this.props.markers};
    locations.forEach( (testLocation) => {
      this.geocoder.geocode({'address': testLocation.address + " " + testLocation.city}, function(results, status) {
        if (status === 'OK') {
          let position = results[0].geometry.location;
          let marker = new google.maps.Marker({
            map: info.map,
            position: position
          });
          addInfoWindow(marker, map, testLocation.title, testLocation.address);
          info.markers.push({marker, address: testLocation.address, city: testLocation.city, title: testLocation.title, lat: position.lat(), lng: position.lng()});
        } else {
          alert('Midpoint could not add location for the following reason: ' + status);
        }
      })
    })
  }

  addInfoWindow(marker, map, title, address) {
    let infoWindow = new google.maps.InfoWindow({
      content: '<h1 class="marker-headline">' + title + '</h1><h2 class="marker-info">' + address + '</h2>'
    })
    marker.addListener('mouseover', () => infoWindow.open(map, marker));
    marker.addListener('mouseout', () => infoWindow.close(map, marker));
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
