import React from 'react';

class MostConvenient extends React.Component {
  constructor(props) {
    super(props)

    this.getMostConvenient = this.getMostConvenient.bind(this);
    this.assessAllTrips = this.assessAllTrips.bind(this);
  }

  getMostConvenient() {
    const allTrips = this.assessAllTrips();


  }

  assessAllTrips() {
    const directionsService = new google.maps.DirectionsService;
    const travelTimesArray = [];
    let markers = this.props.markers;
    for (let i = 0; i < markers.length; i++) {
      let trips = [];
      for (let j = 0; j < markers.length; j++) {
        if (i === j) continue;
        directionsService.route({
          origin: {lat: markers[j].lat, lng: markers[j].lng},
          destination: {lat: markers[i].lat, lng: markers[i].lng},
          travelMode: 'TRANSIT'
        }, function(response, status) {
          if (status === "OK") {
            let route = response.routes[0].legs[0];
            trips.push({origin: markers[j].title, destination: markers[i].title, timeValue: route.duration.value, steps: route.steps});
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        })
      }
      travelTimesArray.push({destination: markers[i].title, trips});
    }

    return travelTimesArray;
  }

  render() {
    return(
      <div onClick={this.getMostConvenient}></div>
    )
  }
}

export default MostConvenient;
