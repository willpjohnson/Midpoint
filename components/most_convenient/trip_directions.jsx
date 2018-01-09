import React from 'react';

class TripDirections extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const directionLIs = this.props.directions.map( (step, idx) => {
      return(<li className="trip-directions-step" key={idx}>{step.instructions}</li>)
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
