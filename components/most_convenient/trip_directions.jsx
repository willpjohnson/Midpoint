import React from 'react';

class TripDirections extends React.Component {
  constructor(props) {
    super(props)

    this.parseInstructions = this.parseInstructions.bind(this);
  }

  parseInstructions(step, idx) {
    switch (step.travel_mode) {
      case "TRANSIT":
        return (<div>
          <li className="trip-directions-step" key={idx}>{`${step.instructions} for ${step.transit.num_stops} stops on the ${step.transit.line.short_name}`}</li>
          <li className="trip-directions-step" key={`${idx}b`}>{`Get off at ${step.transit.arrival_stop.name}`}</li>
        </div>)
      default:
        return (<li className="trip-directions-step" key={idx}>{step.instructions}</li>)
    }
  }

  render() {
    const directionLIs = this.props.directions.map( (step, idx) => {
      return this.parseInstructions(step, idx)
    })
    return(
      <div className="trip-directions">
        <p className="trip-directions-step-primary">Leave from {this.props.origin}</p>
        <ul>{directionLIs}</ul>
        <p className="trip-directions-step-primary">Arrive at {this.props.destination}</p>
      </div>
    )
  }
}

export default TripDirections;
