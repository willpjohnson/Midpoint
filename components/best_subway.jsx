import React from 'react';
import { brooklyn } from '../javascripts/subway_stops';

class BestSubway extends React.Component {
  constructor(props) {
    super(props);

    this.calculateBestSubway = this.calculateBestSubway.bind(this);
  }

  calculateBestSubway() {
    // const directionsDisplay = new google.maps.DirectionsRenderer;
    // const directionsService = new google.maps.DirectionsService;
    // directionsDisplay.setMap(this.props.map);
    //
    // brooklyn.forEach( (stop) => {
    //   let transitTimes = [];
    //   this.props.markers.forEach( (marker) => {
    //     directionsService.route({
    //       origin: {lat: marker.lat, lng: marker.lng},
    //       destination: {lat: stop.lat, lng: stop.lng},
    //       travelMode: 'TRANSIT'
    //     }, function(response, status) {
    //       if (status === 'OK') {
    //         let bestRoute = response.routes[0].legs[0];
    //         let timeValue = bestRoute.duration.value;
    //         console.log(stop.name);
    //         console.log(marker.title);
    //         console.log(timeValue);
    //         transitTimes.push({origin: marker.title, destination: stop.name, timeValue: timeValue})
    //       } else {
    //         // window.alert('Directions request failed due to ' + status);
    //       }
    //     })
    //   })
    //   console.log(transitTimes);
    // })
  }

  render() {
    return(
      <div onClick={this.calculateBestSubway}></div>
    )
  }
}

export default BestSubway;
