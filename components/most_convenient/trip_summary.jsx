import React from 'react';

import { timeConversion } from '../../javascripts/time_conversion';

class TripSummary extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const originLIs = this.props.summary.trips.map( (trip, idx) => {
      return(
        <li onClick={() => {this.props.selectDirections(trip)}} key={idx} className="trip-summary-origin">
          <h3 className="trip-summary-origin-header">{trip.origin}</h3>
          <h4 className="trip-summary-origin-time">{timeConversion(trip.timeValue)}</h4>
        </li>
      )
    })

    return(
      <div id={this.props.id} className="trip-summary hidden">
        <h1 style={{textSize: "14px", margin: "6px"}}>Click to get directions from...</h1>
        <ul>{originLIs}</ul>
      </div>
    )
  }
}

export default TripSummary;
