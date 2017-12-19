import React from 'react';

class TripSummary extends React.Component {
  constructor(props) {
    super(props)

    this.renderDirections = this.renderDirections.bind(this);
    this.removeDirections = this.removeDirections.bind(this);
  }

  renderDirections(idx) {
    const directions = document.getElementById(`${this.props.id}-directions-${idx}`);
    directions.classList.remove("hidden");
  }

  removeDirections(idx) {
    const directions = document.getElementById(`${this.props.id}-directions-${idx}`);
    directions.classList.add("hidden");
  }

  render() {
    const originLIs = this.props.summary.trips.map( (trip, idx) => {
      const stepsLIs = trip.steps.map( (step, jdx) => {
        return(<li key={jdx} className="trip-summary-directions-steps">{step.instructions}</li>)
      })
      return(
        <li onMouseOver={() => {this.renderDirections(idx)}} onMouseOut={() => {this.removeDirections(idx)}} key={idx} className="trip-summary-origin">
          {trip.origin}
          <div className="trip-summary-directions hidden" id={`${this.props.id}-directions-${idx}`}>
            <ul style={{margin: "5px"}}>{stepsLIs}</ul>
          </div>
        </li>
      )
    })

    return(
      <div id={this.props.id} className="trip-summary hidden">
        <h1 style={{textSize: "14px", margin: "6px"}}>Coming from...</h1>
        <ul>{originLIs}</ul>
      </div>
    )
  }
}

export default TripSummary;
