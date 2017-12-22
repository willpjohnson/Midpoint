import React from 'react';

class Midpoint extends React.Component {
  constructor(props) {
    super(props)

    this.midpoint = null;

    this.getMidpoint = this.getMidpoint.bind(this);
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
      <input className="button" id="midpoint" type="button" value="Get Midpoint" onClick={this.getMidpoint}></input>
    )
  }
}

export default Midpoint;
