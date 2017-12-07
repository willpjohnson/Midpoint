import React from 'react';

class MostConvenient extends React.Component {
  constructor(props) {
    super(props)

    this.getMostConvenient = this.getMostConvenient.bind(this);
    this.assessAllTrips = this.assessAllTrips.bind(this);
  }

  timeConversion(value) {
    let minutes = Math.round(value / 60);
    let seconds = value % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  }

  getMostConvenient() {
    const assessAllTrips = this.assessAllTrips;
    const directionsService = new google.maps.DirectionsService;
    const travelTimesArray = [];
    let markers = this.props.markers;
    let destinationCounter = markers.length;
    for (let i = 0; i < markers.length; i++) {
      let trips = [];
      let originCounter = markers.length - 1;
      for (let j = 0; j < markers.length; j++) {
        if (i === j) continue;
        directionsService.route({
          origin: {lat: markers[j].lat, lng: markers[j].lng},
          destination: {lat: markers[i].lat, lng: markers[i].lng},
          travelMode: 'TRANSIT'
        }, function(response, status) {
          if (status === "OK") {
            let route = response.routes[0].legs[0];
            trips.push({origin: markers[j].title, destination: markers[i].title, timeText: route.duration.text, timeValue: route.duration.value, steps: route.steps});
            originCounter -= 1;
            if (originCounter === 0) {
              destinationCounter -= 1;
              travelTimesArray.push({destination: markers[i].title, trips: trips});
            }
            if (destinationCounter === 0) {
              assessAllTrips(travelTimesArray);
            }
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        })
      }
    }
  }

  assessAllTrips(allTrips) {
    const totalTimes = [];
    allTrips.forEach( (tripCollection) => {
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
    let closest = "";
    let time = null;
    let div = document.getElementById("most-convenient-directions");
    totalTimes.forEach( (destination) => {
      let title = document.createElement("h3");
      let time = document.createElement("h4");
      title.innerHTML = destination.destination;
      time.innerHTML = this.timeConversion(destination.totalTime);
      div.appendChild(title);
      div.appendChild(time);
    })
    return totalTimes;
  }

  render() {
    return(
      <div id="most-convenient-div">
        <h2 style={{fontWeight: 400, fontSize: 20}}>Most Convenient</h2>
        <input className="button" id="submit" type="button" value="Find" onClick={this.getMostConvenient}></input>
        <div id="most-convenient-directions"></div>
      </div>
    )
  }
}

export default MostConvenient;
