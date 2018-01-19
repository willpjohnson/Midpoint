import React from 'react';

import { timeConversion } from '../../javascripts/time_conversion';

class TripSummary extends React.Component {
  constructor(props) {
    super(props)

    this.displayDirections = this.displayDirections.bind(this);
  }

  displayDirections(trip) {
    const directionsDisplay = new google.maps.DirectionsRenderer;
    if (this.props.displayedDirections.length > 0) this.props.displayedDirections[0].setMap(null);
    this.props.displayedDirections.unshift(directionsDisplay);
    directionsDisplay.setMap(this.props.map);
    directionsDisplay.setDirections(trip.displayInfo);
  }

  render() {
    const originLIs = this.props.summary.trips.map( (trip, idx) => {
      return(
        <li onClick={() => {this.props.selectDirections(trip)}} onClick={() => this.displayDirections(trip)} key={idx} className="trip-summary-origin">
          <h3 className="trip-summary-origin-header">{trip.origin}</h3>
          <h4 className="trip-summary-origin-time">{timeConversion(trip.timeValue)}</h4>
        </li>
      )
    })

    return(
      <div id={this.props.id} className="trip-summary hidden">
        <h1 style={{fontSize: "18px", marginTop: "6px", marginBottom: "3px"}}>{timeConversion(this.props.summary.totalTime)} in transit</h1>
        <h1 style={{fontSize: "16px", marginBottom: "6px", marginTop: "3px"}}>Click to get directions from...</h1>
        <ul>{originLIs}</ul>
      </div>
    )
  }
}

export default TripSummary;
