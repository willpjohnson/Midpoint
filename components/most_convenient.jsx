import React from 'react';
import Loader from './loader';

class MostConvenient extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tripSummaries: [],
      totalTimes: [],
      loaded: true
    };

    this.getMostConvenient = this.getMostConvenient.bind(this);
    this.assessAllTrips = this.assessAllTrips.bind(this);
    this.routeLocation = this.routeLocation.bind(this);

    this.allRoutes = [];
  }

  timeConversion(value) {
    let minutes = Math.round(value / 60);
    let seconds = value % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  }

  getMostConvenient() {
    this.setState({loaded: false});
    const directionsService = new google.maps.DirectionsService;
    let markers = this.props.markers;
    const size = markers.length * (markers.length - 1);
    for (let i = 0; i < markers.length; i++) {
      for (let j = 0; j < markers.length; j++) {
        if (i === j) continue;
        this.routeLocation(directionsService, markers[j], markers[i], size)
      }
    }
  }

  routeLocation(directionsService, origin, destination, size) {
    const routeLocation = this.routeLocation;
    const assessAllTrips = this.assessAllTrips;
    const allRoutes = this.allRoutes;
    directionsService.route({
      origin: {lat: origin.lat, lng: origin.lng},
      destination: {lat: destination.lat, lng: destination.lng},
      travelMode: 'TRANSIT'
    }, function(response, status) {
      if (status === "OK") {
        let route = response.routes[0].legs[0];
        allRoutes.push({origin: origin.title, destination: destination.title, timeValue: route.duration.value, steps: route.steps});
        if (allRoutes.length === size) assessAllTrips(allRoutes);
      } else if (status === "OVER_QUERY_LIMIT") {
        setTimeout( () => {
          routeLocation(directionsService, origin, destination, size)
        }, 200)
      }
    })
  }

  assessAllTrips(allRoutes) {
    const tripSummaries = [];
    allRoutes.forEach( (route) => {
      let notIncluded = true;
      tripSummaries.forEach( (trip) => {
        if (trip.destination === route.destination) {
          notIncluded = false;
          trip.trips.push(route);
        }
      });
      if (notIncluded) {
        tripSummaries.push({destination: route.destination, trips: [route]});
      }
    });

    const totalTimes = [];
    tripSummaries.forEach( (tripCollection) => {
      let trips = tripCollection.trips;
      let totalTime = 0;
      trips.forEach( (trip) => {
        totalTime += trip.timeValue;
      })
      totalTimes.push({destination: tripCollection.destination, totalTime})
    })

    totalTimes.sort( (a, b) => {
      return a.totalTime - b.totalTime;
    })

    this.setState({tripSummaries, totalTimes, loaded: true});
  }

  render() {
    const totalTimesLis = this.state.totalTimes.map( (totalTime, idx) => {
      return(
        <li key={idx}>
          <h3>{totalTime.destination}</h3>
          <h4>{this.timeConversion(totalTime.totalTime)}</h4>
        </li>
      )
    })
    const body = this.state.loaded ? (<ul>{totalTimesLis}</ul>) : (<Loader />)
    return(
      <div id="most-convenient-div">
        <h2 style={{fontWeight: 400, fontSize: 20}}>Most Convenient</h2>
        <input className="button" id="submit" type="button" value="Find" onClick={this.getMostConvenient}></input>
        <div id="most-convenient-directions">
          {body}
        </div>
      </div>
    )
  }
}

export default MostConvenient;
