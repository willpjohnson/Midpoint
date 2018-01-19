import React from 'react';
import { trainL, trainG } from '../javascripts/subway_stops';

class BestSubway extends React.Component {
  constructor(props) {
    super(props);

    this.allRoutes = [];

    this.calculateBestSubway = this.calculateBestSubway.bind(this);
    this.routeLocation = this.routeLocation.bind(this);
  }

  calculateBestSubway() {
    const directionsService = new google.maps.DirectionsService;
    const stops = trainL.concat(trainG);
    const size = this.props.markers.length * stops.length;
    this.props.markers.forEach( (marker) => {
      stops.forEach( (stop) => {
        this.routeLocation(directionsService, marker, stop, size);
      })
    })
  }

  routeLocation(directionsService, origin, destination, size) {
    const routeLocation = this.routeLocation;
    const allRoutes = this.allRoutes;
    directionsService.route({
      origin: {lat: origin.lat, lng: origin.lng},
      destination: {lat: destination.lat, lng: destination.lng},
      travelMode: 'TRANSIT',
      avoidFerries: true
    }, function(response, status) {
      if (status === "OK") {
        // let route = response.routes[0].legs[0];
        allRoutes.push(response);
        // allRoutes.push({displayInfo: response, origin: origin.title, destination: destination.title, destinationID: destination.marker.metadata.id, timeValue: route.duration.value, steps: route.steps});
      } else if (status === "OVER_QUERY_LIMIT") {
        setTimeout( () => {
          routeLocation(directionsService, origin, destination, size)
        }, 200)
      }
    })
  }

  render() {
    return(
      <div id="best-subway-div">
        <input className="button" id="submit" type="button" value="Find" onClick={this.calculateBestSubway}></input>
        <div id="best-subway-results">

        </div>
      </div>
    )
  }
}

export default BestSubway;
