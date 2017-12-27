import React from 'react';

class Midpoint extends React.Component {
  constructor(props) {
    super(props)

    this.state = {midpoint: null, address: null}

    this.getMidpoint = this.getMidpoint.bind(this);
    this.getMidpointAddress = this.getMidpointAddress.bind(this);
  }

  getMidpoint() {
    if (this.state.midpoint) this.state.midpoint.setMap(null);
    const map = this.props.map;
    const lats = [];
    const longs = [];
    this.props.markers.forEach( (marker) => {
      lats.push(marker.marker.position.lat());
      longs.push(marker.marker.position.lng());
    })
    const avgLat = (lats.reduce((a,b) => a + b, 0)) / lats.length;
    const avgLong = (longs.reduce((a,b) => a + b, 0)) / longs.length;
    const midpoint = new google.maps.Marker({
      map: map,
      position: {lat: avgLat, lng: avgLong},
      icon: 'markers/blue_MarkerM.png'
    });

    this.setState({midpoint})
    this.getMidpointAddress(midpoint.position.lat(), midpoint.position.lng());
  }

  getMidpointAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder;
    const that = this;
    geocoder.geocode({'location': {lat, lng}}, function(results, status) {
      if (status === 'OK') {
        const result = results[0].address_components;
        const street = result[0].long_name + " " + result[1].long_name;
        const area = result[2].long_name;
        that.setState({address: {street, area}})
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  render() {
    let description;
    if (this.state.address !== null) {
      description = (
        <div>
          <h3 className="midpoint-address-header">Nearest Address</h3>
          <h4 className="midpoint-address-street">{this.state.address.street}</h4>
          <h4 className="midpoint-address-area">{this.state.address.area}</h4>
        </div>
      )
    }
    return(
      <div id="midpoint-div">
        <input className="button" id="midpoint-button" type="button" value="Find" onClick={this.getMidpoint}></input>
        <div id="midpoint-description-div">
          {description}
        </div>
      </div>
    )
  }
}

export default Midpoint;
