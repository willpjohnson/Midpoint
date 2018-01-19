import React from 'react';

import { timeConversion } from '../../javascripts/time_conversion';

import Loader from '../loader';
import ProgressBar from './progress_bar'
import TripSummary from './trip_summary';
import TripDirections from './trip_directions';

class MostConvenient extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tripSummaries: [],
      loaded: true,
      selectedDirections: null
    };

    this.getMostConvenient = this.getMostConvenient.bind(this);
    this.assessAllTrips = this.assessAllTrips.bind(this);
    this.routeLocation = this.routeLocation.bind(this);
    this.renderTripSummary = this.renderTripSummary.bind(this);
    this.removeTripSummary = this.removeTripSummary.bind(this);
    this.selectDirections = this.selectDirections.bind(this);

    this.allRoutes = [];
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
      travelMode: 'TRANSIT',
      avoidFerries: true
    }, function(response, status) {
      if (status === "OK") {
        let route = response.routes[0].legs[0];
        allRoutes.push({displayInfo: response, origin: origin.title, destination: destination.title, destinationID: destination.marker.metadata.id, timeValue: route.duration.value, steps: route.steps});
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
        tripSummaries.push({destination: route.destination, destinationID: route.destinationID, trips: [route]});
      }
    });

    tripSummaries.forEach( (tripCollection) => {
      let trips = tripCollection.trips;
      let totalTime = 0;
      trips.forEach( (trip) => {
        totalTime += trip.timeValue;
      })
      tripCollection.totalTime = totalTime;
    })

    tripSummaries.sort( (a, b) => {
      return a.totalTime - b.totalTime;
    })

    this.setState({tripSummaries, loaded: true});
  }

  renderTripSummary(idx) {
    const tripSummary = document.getElementById(`trip-summary-${idx}`);
    tripSummary.classList.remove("hidden");
  }

  removeTripSummary(idx) {
    const tripSummary = document.getElementById(`trip-summary-${idx}`);
    tripSummary.classList.add("hidden");
  }

  selectDirections(trip) {
    this.setState({selectedDirections: trip})
  }

  render() {
    const longestTrip = this.state.tripSummaries[this.state.tripSummaries.length - 1];
    const totalTimesLIs = this.state.tripSummaries.map( (tripSummary, idx) => {
      return(
        <li onMouseOver={() => {this.renderTripSummary(idx)}} onMouseOut={() => {this.removeTripSummary(idx)}} className="most-convenient-location" key={idx}>
          <h3 className="most-convenient-location-header">{tripSummary.destination}</h3>
          <ProgressBar totalTime={tripSummary.totalTime} longestTime={longestTrip.totalTime}/>
          <TripSummary id={`trip-summary-${idx}`} summary={tripSummary} displayedDirections={this.props.displayedDirections} map={this.props.map} selectedDirections={this.props.selectedDirections}/>
        </li>
      )
    })
    const body = this.state.loaded ? (<ul>{totalTimesLIs}</ul>) : (<Loader />)
    const tripDirections = this.state.selectedDirections ? <TripDirections directions={this.state.selectedDirections.steps} origin={this.state.selectedDirections.origin} destination={this.state.selectedDirections.destination}/> : null

    return(
      <div id="most-convenient-div">
        <input className="button" id="submit" type="button" value="Find" onClick={this.getMostConvenient}></input>
        <div id="most-convenient-directions">
          {totalTimesLIs.length > 0 ? <h1 className="most-convenient-locations-header">Relative Total Times</h1> : null}
          {body}
        </div>
        {tripDirections}
      </div>
    )
  }
}


export default MostConvenient;
